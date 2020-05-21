import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import Quill from '../lib/Quill'
import { Tooltip } from './Tooltip'
import { Sidebar } from './Sidebar'

const Editor = () => {
  const [quill, setQuill] = useState<Quill | null>(null)

  useEffect(() => {
    setQuill(new Quill('#editor-container'))
  }, [])

  return (
    <Fragment>
      {quill ? <Tooltip quill={quill} /> : null}
      {quill ? <Sidebar quill={quill} /> : null}
      <div id="editor-container"></div>
    </Fragment>
  ) 
}

export default Editor
