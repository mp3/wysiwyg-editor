import Quill from 'quill'

const Inline = Quill.import('blots/inline')
const Block = Quill.import('blots/block')
const BlockEmbed = Quill.import('blots/block/embed')

class BoldBlot extends Inline {}
BoldBlot.blotName = 'bold'
BoldBlot.tagName = 'strong'

class ItalibBlot extends Inline {}
ItalibBlot.blotName = 'italic'
ItalibBlot.tagName = 'em'

class LinkBlot extends Inline {
  static create(value: string) {
    const node = super.create()
    node.setAttribute('href', value)
    node.setAttribute('target', '_blank')
    return node
  }

  static formats(node: Element) {
    return node.getAttribute('href')
  }
}
LinkBlot.blotName = 'link'
LinkBlot.tagName = 'a'

class BlockquotesBlot extends Block {}
BlockquotesBlot.blotName = 'blockquote'
BlockquotesBlot.tagName = 'blockquote'

class HeaderBlot extends Block {
  static formats(node: Element) {
    return HeaderBlot.tagName.indexOf(node.tagName) + 1
  }
}
HeaderBlot.blotName = 'header'
HeaderBlot.tagName = ['H1', 'H2']

class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = 'divider'
DividerBlot.tagName = 'hr'

class ImageBlot extends BlockEmbed {
  static create(value: { alt: string, url: string }) {
    const node = super.create()
    node.setAttribute('alt', value.alt)
    node.setAttribute('src', value.url)
    return node
  }

  static value(node: Element) {
    return {
      alt: node.getAttribute('alt'),
      src: node.getAttribute('src')
    }
  }
}
ImageBlot.blotName = 'image'
ImageBlot.tagName = 'img'

Quill.register(BoldBlot)
Quill.register(ItalibBlot)
Quill.register(LinkBlot)
Quill.register(BlockquotesBlot)
Quill.register(HeaderBlot)
Quill.register(DividerBlot)
Quill.register(ImageBlot)

export default Quill
