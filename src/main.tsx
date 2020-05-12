import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import Quill from './lib/Quill'

const Main = () => {

  React.useEffect(() => {
    new Quill('#editor-container')
  }, [])

  return (
    <React.Fragment>
      <GlobalStyle />
      <div id="tooltip-controls">
        <button id="bold-button"><i className="fa fa-bold"></i></button>
        <button id="italic-button"><i className="fa fa-italic"></i></button>
        <button id="link-button"><i className="fa fa-link"></i></button>
        <button id="blockquote-button"><i className="fa fa-quote-right"></i></button>
        <button id="header-1-button"><i className="fa fa-header"><sub>1</sub></i></button>
        <button id="header-2-button"><i className="fa fa-header"><sub>2</sub></i></button>
      </div>
      <div id="sidebar-controls">
        <button id="image-button"><i className="fa fa-camera"></i></button>
        <button id="video-button"><i className="fa fa-play"></i></button>
        <button id="tweet-button"><i className="fa fa-twitter"></i></button>
        <button id="divider-button"><i className="fa fa-minus"></i></button>
      </div>
      <textarea id="editor-container" defaultValue="Tell your story..."></textarea>
    </React.Fragment>
  )
}

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
  width: 100%;
}
body {
  padding: 25px;
}

#editor-container {
  display: block;
  font-family: 'Open Sans', Helvetica, sans-serif;
  font-size: 1.2em;
  height: 200px;
  margin: 0 auto;
  width: 450px;
}

#tooltip-controls, #sidebar-controls {
  text-align: center;
}

button {
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  padding: 0;
  height: 32px;
  width: 32px;
  text-align: center;

  &:active, &:foxus {
    outline: none;
  }
}
`

ReactDOM.render(<Main />, document.getElementById('root'))

