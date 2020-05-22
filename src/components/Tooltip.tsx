import { h } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import styled from 'styled-components'
import { RangeStatic } from 'quill'
import Quill from '../lib/Quill'

type Props = {
  quill: Quill
}

export const Tooltip = (props: Props) => {
  const { quill } = props
  const tooltipControls = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)

  useEffect(() => {
    quill.addContainer(tooltipControls.current)

    quill.on('editor-change', (eventType: 'text-change' | 'selection-change', range: RangeStatic | null) => {
      if (eventType !== 'selection-change') {
        return
      }
      if (range === null) {
        return
      }

      setIsOpen(false)

      if (range.length !== 0) {
        const rangeBounds = quill.getBounds(range.index, range.length)
        setIsOpen(true)
        setTop(rangeBounds.bottom + 10)
        setLeft(rangeBounds.left + rangeBounds.width/2 - tooltipControls.current.offsetWidth/2)
      }
    })
  }, [])

  return (
    <TooltipControls
      ref={tooltipControls}
      isOpen={isOpen}
      top={top}
      left={left}
    >
      <Button onClick={() => quill.format('bold', true)}>
        <i className="fa fa-bold"></i>
      </Button>
      <Button onClick={() => quill.format('italic', true)}>
        <i className="fa fa-italic"></i>
      </Button>
      <Button onClick={() => quill.format('link', prompt('Enter link URL'))}>
        <i className="fa fa-link"></i>
      </Button>
      <Button onClick={() => quill.format('blockquote', true)}>
        <i className="fa fa-quote-right"></i>
      </Button>
      <Button onClick={() => quill.format('header', 1)}>
        <i className="fa fa-header">
          <sub>1</sub>
        </i>
      </Button>
      <Button onClick={() => quill.format('header', 2)}>
        <i className="fa fa-header">
          <sub>2</sub>
        </i>
      </Button>
    </TooltipControls>
  )
}

type TooltipControlsProps = {
  isOpen: boolean
  top: number
  left: number
}

const TooltipControls = styled.div<TooltipControlsProps>`
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  background-color: #111;
  border-radius: 4px;
  padding: 5px 10px;
  position: absolute;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};

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
`

const Button = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;

  &.active {
    color: #21b384;
  }
`
