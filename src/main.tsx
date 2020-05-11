import React from 'react'
import ReactDOM from 'react-dom'
import Quill from './lib/Quill'

const Main = () => {

  React.useEffect(() => {
    new Quill('#editor')
  }, [])

  return (
    <React.Fragment>
      <div id="editor">
        <p>Hello World!</p>
      </div>
    </React.Fragment>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
