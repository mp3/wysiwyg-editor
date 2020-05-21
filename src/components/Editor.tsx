import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import Quill from '../lib/Quill'
import { Block } from '../lib/Quill'

const Editor = () => {
  const [quill, setQuill] = useState<Quill | null>(null)
  const [tooltipControls, setTooltipControls] = useState<HTMLElement | null>(null)
  const [sidebarControls, setSidebarControls] = useState<HTMLElement | null>(null)

  const setUserInterface = () => {
    setTooltipControls(document.querySelector("#tooltip-controls") as HTMLElement | null)
    setSidebarControls(document.querySelector("#sidebar-controls") as HTMLElement | null)
  }

  const initQuill = () => {
    if (!quill) {
      return
    }

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
          const lineBounds = quill.getBounds(range as any)
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

        const rangeBounds = quill.getBounds(range as any)
        tooltipControls.style.display = 'block'
        tooltipControls.style.top = `${rangeBounds.bottom + 10}px`
        tooltipControls.style.left = `${rangeBounds.left + rangeBounds.width/2 - tooltipControls.offsetWidth/2}px`
      }
    })
  }

  useEffect(() => {
    if (quill) {
      if (tooltipControls && sidebarControls) {
        initQuill()
      } else {
        setUserInterface()
      }
    } else {
      setQuill(new Quill('#editor-container'))
    }
  }, [quill, tooltipControls, sidebarControls])

  return (
    <Fragment>
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

export default Editor
