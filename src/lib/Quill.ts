import Quill from 'quill'

const Inline = Quill.import('blots/inline')

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

Quill.register(BoldBlot)
Quill.register(ItalibBlot)
Quill.register(LinkBlot)

export default Quill
