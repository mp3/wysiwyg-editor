import Quill from 'quill'

declare global {
  interface Window {
    twttr: any
  }
}

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

class VideoBlot extends BlockEmbed {
  static create(url: string) {
    const node = super.create()
    node.setAttribute('src', url)
    node.setAttribute('frameborder', '0')
    node.setAttribute('allowfullscreen', true)
    return node
  }

  static formats(node: Element) {
    return {
      height: node.getAttribute('height') ?? undefined,
      width: node.getAttribute('width') ?? undefined
    }
  }

  static value(node: Element) {
    return node.getAttribute('src')
  }

  format(name: string, value: string) {
    if (name === 'height' || name === 'width') {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name, value)
      }
    } else {
      super.format(name, value)
    }
  }
}
VideoBlot.blotName = 'video'
VideoBlot.tagName = 'iframe'

class TweetBlot extends BlockEmbed {
  static create(id: string) {
    const node = super.create()
    node.dataset.id = id;
    window.twttr.widgets.createTweet(id, node);
    return node
  }

  static value(domNode: HTMLElement) {
    return domNode.dataset.id
  }
}
TweetBlot.blotName = 'tweet'
TweetBlot.tagName = 'div'
TweetBlot.className = 'tweet'

Quill.register(BoldBlot)
Quill.register(ItalibBlot)
Quill.register(LinkBlot)
Quill.register(BlockquotesBlot)
Quill.register(HeaderBlot)
Quill.register(DividerBlot)
Quill.register(ImageBlot)
Quill.register(VideoBlot)
Quill.register(TweetBlot)

export default Quill
