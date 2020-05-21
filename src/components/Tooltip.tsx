import { h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import styled from 'styled-components'
import Quill, { Block } from '../lib/Quill'

type Props = {
  quill: Quill
}

export const Tooltip = (props: Props) => {
  const { quill } = props
  const tooltipControls = useRef<HTMLDivElement>(null)

  useEffect(() => {
    quill.addContainer(tooltipControls.current)

    quill.on((Quill as any).events.EDITOR_CHANGE, (eventType, range) => {
      if (eventType !== (Quill as any).events.SELECTION_CHANGE) {
        return
      }

      if (range === null) {
        return
      }

      if ((range as any).length === 0) {
        tooltipControls.current.setAttribute('style', 'display: none;')
        const [block, _offset] = (quill.scroll as any).descendant(Block, (range as any).index)
        if (block === null && block.domNode.firstChild instanceof HTMLBRElement !== false) {
          tooltipControls.current.style.display = 'none'
        }
      } else {
        tooltipControls.current.style.display = 'none'

        const rangeBounds = quill.getBounds(range as any)
        tooltipControls.current.style.display = 'block'
        tooltipControls.current.style.top = `${rangeBounds.bottom + 10}px`
        tooltipControls.current.style.left = `${rangeBounds.left + rangeBounds.width/2 - tooltipControls.current.offsetWidth/2}px`
      }
    })
  }, [])

  return (
    <TooltipControls ref={tooltipControls}>
      <button id="bold-button" onClick={() => quill.format('bold', true)}><i className="fa fa-bold"></i></button>
      <button id="italic-button" onClick={() => quill.format('italic', true)}><i className="fa fa-italic"></i></button>
      <button id="link-button" onClick={() => quill.format('link', prompt('Enter link URL'))}><i className="fa fa-link"></i></button>
      <button id="blockquote-button" onClick={() => quill.format('blockquote', true)}><i className="fa fa-quote-right"></i></button>
      <button id="header-1-button" onClick={() => quill.format('header', 1)}><i className="fa fa-header"><sub>1</sub></i></button>
      <button id="header-2-button" onClick={() => quill.format('header', 2)}><i className="fa fa-header"><sub>2</sub></i></button>
    </TooltipControls>
  )
}

const TooltipControls = styled.div`
  background-color: #111;
  border-radius: 4px;
  display: none;
  padding: 5px 10px;
  position: absolute;

  &::before {
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
  & button {
    background-color: transparent;
    color: #fff;
    border: none;
  }
  & button.active {
    color: #21b384;
  }
`
