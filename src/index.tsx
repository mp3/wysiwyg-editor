import { h, render, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { createGlobalStyle } from 'styled-components'
import Quill from './lib/Quill'

const Block = Quill.import('blots/block')

const Main = () => {
  const [quill, setQuill] = useState<Quill | null>(null)

  useEffect(() => {
    if (quill) {
      const tooltipControls = document.querySelector("#tooltip-controls") as HTMLElement | null
      const sidebarControls = document.querySelector("#sidebar-controls") as HTMLElement | null
      if (!(tooltipControls && sidebarControls)) {
        return
      }

      quill.addContainer(tooltipControls)
      quill.addContainer(sidebarControls)
  
      quill.on((Quill as any).events.EDITOR_CHANGE, (eventType, range) => {
        if (eventType !== (Quill as any).events.SELECTION_CHANGE) {
          return
        }
        if (range === null) {
          return
        }

        if ((range as any).length === 0) {
          tooltipControls.setAttribute('style', 'display: none;')
          const [block, _offset] = (quill.scroll as any).descendant(Block, (range as any).index)
          if (block != null && block.domNode.firstChild instanceof HTMLBRElement) {
            let lineBounds = quill.getBounds(range as any)
            sidebarControls.classList.remove('active')
            sidebarControls.style.display = 'block'
            sidebarControls.style.top = `${lineBounds.top - 2}px`
            sidebarControls.style.left = `${lineBounds.left - 50}px`
          } else {
            tooltipControls.style.display = 'none'
            sidebarControls.style.display = 'none'
            sidebarControls.classList.remove('active')
          }
        } else {
          tooltipControls.style.display = 'none'
          sidebarControls.style.display = 'none'
          sidebarControls.classList.remove('active')

          let rangeBounds = quill.getBounds(range as any)
          tooltipControls.style.display = 'block'
          tooltipControls.style.top = `${rangeBounds.bottom + 10}px`
          tooltipControls.style.left = `${rangeBounds.left + rangeBounds.width/2 - tooltipControls.offsetWidth/2}px`
        }
      })
    } else {
      setQuill(new Quill('#editor-container'))
    }
  }, [quill])

  return (
    <Fragment>
      <GlobalStyle />
      <div id="tooltip-controls">
        <button id="bold-button" onClick={() => quill?.format('bold', true)}><i className="fa fa-bold"></i></button>
        <button id="italic-button" onClick={() => quill?.format('italic', true)}><i className="fa fa-italic"></i></button>
        <button id="link-button" onClick={() => quill?.format('link', prompt('Enter link URL'))}><i className="fa fa-link"></i></button>
        <button id="blockquote-button" onClick={() => quill?.format('blockquote', true)}><i className="fa fa-quote-right"></i></button>
        <button id="header-1-button" onClick={() => quill?.format('header', 1)}><i className="fa fa-header"><sub>1</sub></i></button>
        <button id="header-2-button" onClick={() => quill?.format('header', 2)}><i className="fa fa-header"><sub>2</sub></i></button>
      </div>
      <div id="sidebar-controls">
        <button id="show-controls" onClick={() => {
          const sidebarControls = document.querySelector("#sidebar-controls") as HTMLElement | null
          if (sidebarControls) {
            sidebarControls.classList.toggle('active')
            quill?.focus()
          }
        }}>
          <i className="fa fa-plus"></i>
        </button>
        <span className="controls">
          <button id="image-button" onClick={() => {
            const range = quill?.getSelection(true)
            if (!range) {
              return
            }
            quill?.insertText(range.index, '\n', (Quill as any).sources.USER)
            quill?.insertEmbed(range.index + 1, 'image', {
              alt: 'Quill Cloud',
              url: 'https://quilljs.com/0.20/assets/images/cloud.png'
            }, (Quill as any).sources.USER)
            quill?.setSelection(range.index + 2, (Quill as any).sources.SILENT)
          }}><i className="fa fa-camera"></i></button>
          <button id="video-button" onClick={() => {
            const range = quill?.getSelection(true)
            if (!range) {
              return
            }
            quill?.insertText(range.index, '\n', (Quill as any).sources.USER)
            const url = 'https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0'
            quill?.insertEmbed(range.index + 1, 'video', url, (Quill as any).sources.USER)
            quill?.formatText(range.index + 1, 1, { height: '170', width: '400' })
            quill?.setSelection(range.index + 2, (Quill as any).sources.SILENT)
          }}><i className="fa fa-play"></i></button>
          <button id="tweet-button" onClick={() => {
            const range = quill?.getSelection(true)
            const id = '464454167226904576'
            if (!range) {
              return
            }
            quill?.insertText(range.index, '\n', (Quill as any).sources.USER)
            quill?.insertEmbed(range.index + 1, 'tweet', id, (Quill as any).sources.USER)
            quill?.setSelection(range.index + 2, (Quill as any).sources.SILENT)
          }}><i className="fa fa-twitter"></i></button>
          <button id="divider-button" onClick={() => {
            const range = quill?.getSelection(true)
            if (!range) {
              return
            }
            quill?.insertText(range.index, '\n', (Quill as any).sources.USER)
            quill?.insertEmbed(range.index + 1, 'divider', 'true', (Quill as any).sources.USER)
            quill?.setSelection(range.index + 2, (Quill as any).sources.SILENT)
          }}><i className="fa fa-minus"></i></button>
        </span>
      </div>
      <div id="editor-container"></div>
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

#editor-container {
  font-family: 'Open Sans', Helvetica, sans-serif;
  font-size: 1.2em;
  height: 100%;
  margin: 0 auto;
  width: 450px;
  border: 1px solid #ccc;
}
#editor-container .ql-editor {
  min-height: 100%;
  height: inherit;
  overflow-y: inherit;
  padding-bottom: 75px;
}
#editor-container .ql-editor > * {
  margin-top: 1.5em;
}
#editor-container .ql-editor > *:last-child {
  margin-bottom: 50px;
}
#editor-container h1 + p,
#editor-container h2 + p {
  margin-top: 0.5em; 
}
#editor-container blockquote {
  border-left: 4px solid #111;
  padding-left: 1em;
}
#editor-container hr {
  border: none;
  color: #111;
  letter-spacing: 1em;
  text-align: center;
}
#editor-container hr:before {
  content: '...';
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
