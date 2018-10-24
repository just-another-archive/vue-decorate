import component from './component'

export const Decorate = component

export const Plugin = {
  install: function(Vue) {
    Vue.component('v-decorate', component)
  }
}

export default {
  Decorate, Plugin,
}
