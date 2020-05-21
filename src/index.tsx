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
