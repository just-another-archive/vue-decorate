export default {
  abstract: true,
  functional: true,
  render(h, context) {
    const child = context.children[0];

    if (!child)
      return null

    // static class exception
    if ('staticClass' in context.data)
      child.data.staticClass = [child, context]
        .map(o => o.data.staticClass)
        .filter(s => !!s)
        .join(' ')


    ;['class', 'style',
      'attrs', 'props', 'domProps',
      'on', 'nativeOn',
      'directives', 'ref']
      .filter(key => key in context.data)
      .forEach(key => {
        child.data[key] = Object.assign({}, child.data[key], context.data[key])
      })

    return child
  }
}
