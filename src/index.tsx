import { h, render, Fragment } from 'preact'
import { createGlobalStyle } from 'styled-components'
import { Editor } from './components/Editor'

const Main = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Editor />
    </Fragment>
  )
}

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  outline: none;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

#sidebar-controls {
  display: none;
  position: absolute;
}
#sidebar-controls button {
  background-color: transparent;
  border: none;
  padding: 0;
}
#sidebar-controls i.fa {
  background-color: #fff;
  border: 1px solid #111;
  border-radius: 50%;
  color: #111;
  width: 32px;
  height: 32px;
  line-height: 32px;
}
#sidebar-controls .controls {
  display: none;
  margin-left: 15px;
}
#sidebar-controls #show-controls i.fa::before {
  content: "\f067";
}
#sidebar-controls.active .controls {
  display: inline-block;
}
#sidebar-controls.active #show-controls i.fa::before {
  content: "\f00d";
}

button {
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  padding: 0;
  height: 32px;
  width: 32px;
  text-align: center;
}
button:active, button:focus {
  outline: none;
}
`

const root = document.getElementById('root')

if (root) {
  render(<Main />, root)
}
