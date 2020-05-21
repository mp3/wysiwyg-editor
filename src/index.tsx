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

#tooltip-controls {
  background-color: #111;
  border-radius: 4px;
  display: none;
  padding: 5px 10px;
  position: absolute;
}
#tooltip-controls::before {
  box-sizing: border-box;
  border-bottom: 6px solid #111;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  content: ' ';
  display: block;
  height: 6px;
  left: 50%;
  position: absolute;
  margin-left: -6px;
  margin-top: -6px;
  top: 0;
  width: 6px;
}
#tooltip-controls button {
  background-color: transparent;
  color: #fff;
  border: none;
}
#tooltip-controls button.active {
  color: #21b384;
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
