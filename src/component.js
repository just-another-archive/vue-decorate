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


    ;['class', 'style', 'directives', 'ref']
      .filter(key => key in context.data)
      .forEach(key => {
        child.data[key] = Object.assign({}, child.data[key], context.data[key])
      })

    const glob = ['attrs', 'props', 'domProps']
      .reduce(
        (object, key) => Object.assign({}, object, context.data[key]),
        {}
      )

    ;Object
      .entries(glob)
      .forEach(([prop, value]) => {
        const which = ['attrs', 'props', 'domProps']
          .find(key => !!child.data[key] && (prop in child.data[key]))

        if (which) {
          child.data[which][prop] = value;
        }
      })

    ;['on', 'nativeOn']
      .filter(key => key in context.data)
      .forEach(handler => {
        Object
          .keys(context.data[handler])
          .forEach(event => {
            if (!(handler in child.data))
              child.data[handler] = {};

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
