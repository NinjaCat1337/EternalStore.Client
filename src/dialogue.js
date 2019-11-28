import ConfirmDialogue from './components/ConfirmDialogue.vue';

const Dialogue = {
  install(Vue) {
    this.EventBus = new Vue()
    Vue.component('component-dialogue', ConfirmDialogue)
    Vue.prototype.$dialogue = {
      show(params) {
        Dialogue.EventBus.$emit('show', params)
      }
    }
  }
}

export default Dialogue