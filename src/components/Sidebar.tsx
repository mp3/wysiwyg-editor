import { h } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import styled from 'styled-components'
import Quill, { Block } from '../lib/Quill'

type Props = {
  quill: Quill
}

export const Sidebar = (props: Props) => {
  const { quill } = props
  const sidebarControls = useRef<HTMLDivElement>(null)
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [isControlsOpen, setIsControlsOpen] = useState(false)

  useEffect(() => {
    quill.addContainer(sidebarControls.current)
    
    quill.on((Quill as any).events.EDITOR_CHANGE, (eventType, range) => {
      if (eventType !== (Quill as any).events.SELECTION_CHANGE) {
        return
      }

      if (range === null) {
        return
      }

      if ((range as any).length === 0) {
        const [block, _offset] = (quill.scroll as any).descendant(Block, (range as any).index)
        if (block !== null && block.domNode.firstChild instanceof HTMLBRElement) {
          const lineBounds = quill.getBounds(range as any)
          setIsControlsOpen(false)
          setIsSidebarVisible(true)
          sidebarControls.current.style.top = `${lineBounds.top - 2}px`
          sidebarControls.current.style.left = `${lineBounds.left - 50}px`
        } else {
          setIsSidebarVisible(false)
          setIsControlsOpen(false)
        }
      } else {
        setIsSidebarVisible(false)
        setIsControlsOpen(false)
      }
    })
  }, [])

  return (
    <SidebarControls
      ref={sidebarControls}
      data-is-sidebar-visible={isSidebarVisible}
      data-is-controls-open={isControlsOpen}
    >
      <ShowControls onClick={() => {
        setIsControlsOpen(!isControlsOpen)
        quill.focus()
      }}>
        <i className="fa fa-plus"></i>
      </ShowControls>
      <Controls>
        <Button onClick={() => {
          const range = quill.getSelection(true)
          if (!range) {
            return
          }
          quill.insertText(range.index, '\n', (Quill as any).sources.USER)
          quill.insertEmbed(range.index + 1, 'image', {
            alt: 'Quill Cloud',
            url: 'https://quilljs.com/0.20/assets/images/cloud.png'
          }, (Quill as any).sources.USER)
          quill.setSelection(range.index + 2, (Quill as any).sources.SILENT)
        }}>
          <i className="fa fa-camera"></i>
        </Button>
        <Button onClick={() => {
          const range = quill.getSelection(true)
          if (!range) {
            return
          }
          quill.insertText(range.index, '\n', (Quill as any).sources.USER)
          const url = 'https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0'
          quill.insertEmbed(range.index + 1, 'video', url, (Quill as any).sources.USER)
          quill.formatText(range.index + 1, 1, { height: '170', width: '400' })
          quill.setSelection(range.index + 2, (Quill as any).sources.SILENT)
        }}>
          <i className="fa fa-play"></i>
        </Button>
        <Button onClick={() => {
          const range = quill.getSelection(true)
          const id = '464454167226904576'
          if (!range) {
            return
          }
          quill.insertText(range.index, '\n', (Quill as any).sources.USER)
          quill.insertEmbed(range.index + 1, 'tweet', id, (Quill as any).sources.USER)
          quill.setSelection(range.index + 2, (Quill as any).sources.SILENT)
        }}>
          <i className="fa fa-twitter"></i>
        </Button>
        <Button onClick={() => {
          const range = quill.getSelection(true)
          if (!range) {
            return
          }
          quill.insertText(range.index, '\n', (Quill as any).sources.USER)
          quill.insertEmbed(range.index + 1, 'divider', 'true', (Quill as any).sources.USER)
          quill.setSelection(range.index + 2, (Quill as any).sources.SILENT)
        }}>
          <i className="fa fa-minus"></i>
        </Button>
      </Controls>
    </SidebarControls>
  )
}

const SidebarControls = styled.div`
  display: none;
  position: absolute;

  &[data-is-sidebar-visible="true"] {
    display: block;
  }

  & i.fa {
    background-color: #fff;
    border: 1px solid #111;
    border-radius: 50%;
    color: #111;
    width: 32px;
    height: 32px;
    line-height: 32px;
  }
`

const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
`

const ShowControls = styled(Button)`
  & i.fa::before {
    content: "\f067";
  }

  [data-is-controls-open="true"] & i.fa::before {
    content: "\f00d";
  }
`

const Controls = styled.span`
  display: none;
  margin-left: 15px;

  [data-is-controls-open="true"] & {
    display: inline-block;
  }
`
