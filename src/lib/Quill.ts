import Quill from 'quill'

declare global {
  interface Window {
    twttr: any
  }
}

export const Inline = Quill.import('blots/inline')
export const Block = Quill.import('blots/block')
export const BlockEmbed = Quill.import('blots/block/embed')

class BoldBlot extends Inline {
  static blotName = 'bold'
  static tagName = 'strong'
}

class ItalibBlot extends Inline {
  static blotName = 'italic'
  static tagName = 'em'
}

class LinkBlot extends Inline {
  static blotName = 'link'
  static tagName = 'a'

  static create(value: string) {
    const node = super.create(null) as HTMLElement
    node.setAttribute('href', value)
    node.setAttribute('target', '_blank')
    return node
  }

  static formats(node: Element) {
    return node.getAttribute('href')
  }
}

class BlockquotesBlot extends Block {
  static blotName = 'blockquote'
  static tagName = 'blockquote'
}

class HeaderBlot extends Block {
  static blotName = 'header'
  static tagName: string | string[] | any = ['H1', 'H2']

  static formats(node: Element) {
    return HeaderBlot.tagName.indexOf(node.tagName) + 1
  }
}

class DividerBlot extends BlockEmbed {
  static blotName = 'divider'
  static tagName = 'hr'
}

class ImageBlot extends BlockEmbed {
  static blotName = 'image'
  static tagName = 'img'

  static create(value: { alt: string, url: string }) {
    const node = super.create(null) as HTMLElement
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

class VideoBlot extends BlockEmbed {
  static blotName = 'video'
  static tagName = 'iframe'

  static create(url: string) {
    const node = super.create(null) as HTMLElement
    node.setAttribute('src', url)
    node.setAttribute('frameborder', '0')
    node.setAttribute('allowfullscreen', 'true')
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
        (this.domNode as HTMLElement).setAttribute(name, value)
      } else {
        (this.domNode as HTMLElement).removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }
}

class TweetBlot extends BlockEmbed {
  static blotName = 'tweet'
  static tagName = 'div'
  static className = 'tweet'

  static create(id: string) {
    const node = super.create(null) as HTMLElement
    node.dataset.id = id;
    window.twttr.widgets.createTweet(id, node);
    return node
  }

  static value(domNode: HTMLElement) {
    return domNode.dataset.id
  }
}

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
