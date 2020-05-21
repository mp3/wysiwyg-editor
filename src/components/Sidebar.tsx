import { h } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import styled from 'styled-components'
import { RangeStatic } from 'quill'
import BlockBlot from 'parchment/src/blot/block'
import Quill, { Block } from '../lib/Quill'

type Props = {
  quill: Quill
}

export const Sidebar = (props: Props) => {
  const { quill } = props
  const sidebarControls = useRef<HTMLDivElement>(null)
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [isControlsOpen, setIsControlsOpen] = useState(false)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)

  useEffect(() => {
    quill.addContainer(sidebarControls.current)

    quill.on('editor-change', (eventType: 'text-change' | 'selection-change', range: RangeStatic) => {
      if (eventType !== 'selection-change') {
        return
      }

      if (range.length === 0) {
        const [block] = quill.scroll.scroll.descendant<BlockBlot>(Block, range.index)
        if (block !== null && block.domNode.firstChild instanceof HTMLBRElement) {
          const lineBounds = quill.getBounds(range.index)
          setIsSidebarVisible(true)
          setIsControlsOpen(false)
          setTop(lineBounds.top - 2)
          setLeft(lineBounds.left - 50)
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
      visible={isSidebarVisible}
      top={top}
      left={left}
    >
      <ShowControls isOpen={isControlsOpen} onClick={() => {
        setIsControlsOpen(!isControlsOpen)
        quill.focus()
      }}>
        <i className="fa fa-plus"></i>
      </ShowControls>
      <Controls isOpen={isControlsOpen}>
        <Button onClick={() => {
          const range = quill.getSelection(true)

          quill.insertText(range.index, '\n', 'user')
          quill.insertEmbed(range.index + 1, 'image', {
            alt: 'Quill Cloud',
            url: 'https://quilljs.com/0.20/assets/images/cloud.png'
          }, 'user')
          quill.setSelection(range.index + 2, 0, 'silent')
        }}>
          <i className="fa fa-camera"></i>
        </Button>
        <Button onClick={() => {
          const range = quill.getSelection(true)

          quill.insertText(range.index, '\n', 'user')
          const url = 'https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0'
          quill.insertEmbed(range.index + 1, 'video', url, 'user')
          quill.formatText(range.index + 1, 1, { height: '170', width: '400' })
          quill.setSelection(range.index + 2, 0, 'silent')
        }}>
          <i className="fa fa-play"></i>
        </Button>
        <Button onClick={() => {
          const range = quill.getSelection(true)
          const id = '464454167226904576'

          quill.insertText(range.index, '\n', 'user')
          quill.insertEmbed(range.index + 1, 'tweet', id, 'user')
          quill.setSelection(range.index + 2, 0, 'silent')
        }}>
          <i className="fa fa-twitter"></i>
        </Button>
        <Button onClick={() => {
          const range = quill.getSelection(true)

          quill.insertText(range.index, '\n', 'user')
          quill.insertEmbed(range.index + 1, 'divider', 'true', 'user')
          quill.setSelection(range.index + 2, 0, 'silent')
        }}>
          <i className="fa fa-minus"></i>
        </Button>
      </Controls>
    </SidebarControls>
  )
}

type SidebarControlsProps = {
  visible: boolean
  top: number
  left: number
}

type ControlsProps = {
  isOpen: boolean
}

const SidebarControls = styled.div<SidebarControlsProps>`
  display: ${props => props.visible ? 'block' : 'none'};
  position: absolute;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};

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

const ShowControls = styled(Button)<ControlsProps>`
  & i.fa::before {
    content: ${props => props.isOpen ? '"\f00d"' : '"\f067"'};
  }
`

const Controls = styled.span<ControlsProps>`
  display: ${props => props.isOpen ? 'inline-block' : 'none'};
  margin-left: 15px;
`
