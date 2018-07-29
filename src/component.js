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
    'directives', 'ref']
      .filter(key => key in context.data)
      .forEach(key => {
        child.data[key] = Object.assign({}, child.data[key], context.data[key])
      })


    ;['on', 'nativeOn']
      .filter(key => key in context.data)
      .forEach(handler => {
        Object
          .keys(context.data[handler])
          .forEach(event => {
            if (!(event in child.data[handler]))
              return child.data[handler][event] = context.data[handler][event];

            child.data[handler][event] = [child, context]
              .map(o => {
                return Array.isArray(o.data[handler][event])
                      ?  o.data[handler][event]
                      : [o.data[handler][event]]
              })
              .reduce((arr, sub) => arr.concat(sub), [])
          })
      })

    return child
  }
}
