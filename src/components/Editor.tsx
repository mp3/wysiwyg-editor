import { h, Fragment } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import styled from 'styled-components'
import Quill from '../lib/Quill'
import { Tooltip } from './Tooltip'
import { Sidebar } from './Sidebar'

export const Editor = () => {
  const [quill, setQuill] = useState<Quill | null>(null)
  const editorContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuill(new Quill(editorContainer.current))
  }, [])

  return (
    <Fragment>
      {quill ? <Tooltip quill={quill} /> : null}
      {quill ? <Sidebar quill={quill} /> : null}
      <EditorContainer ref={editorContainer}></EditorContainer>
    </Fragment>
  ) 
}

const EditorContainer = styled.div`
  font-family: 'Open Sans', Helvetica, sans-serif;
  font-size: 1.2em;
  height: 100%;
  margin: 0 auto;
  width: 450px;
  border: 1px solid #ccc;

  & .ql-editor {
    min-height: 100%;
    height: inherit;
    overflow-y: inherit;
    padding-bottom: 75px;
  }

  & .ql-editor > * {
    margin-top: 1.5em;
  }

  & .ql-editor > *:last-child {
    margin-bottom: 50px;
  }

  & h1 + p,
  & h2 + p {
    margin-top: 0.5em; 
  }

  & blockquote {
    border-left: 4px solid #111;
    padding-left: 1em;
  }

  & hr {
    border: none;
    color: #111;
    letter-spacing: 1em;
    text-align: center;
  }

  & hr:before {
    content: '...';
  }
`
