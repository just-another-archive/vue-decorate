import component from './component'

export default {
  component,
  Plugin: {
    install: function(Vue) {
      Vue.component('v-decorate', component)
    }
  }
}
