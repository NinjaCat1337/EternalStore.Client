import DialogueBox from './components/Dialogue.vue';

const Dialogue = {
  install(Vue) {
    this.EventBus = new Vue()
    Vue.component('component-dialogue', DialogueBox)
    Vue.prototype.$dialogue = {
      show(params) {
        Dialogue.EventBus.$emit('show', params)
      }
    }
  }
}

export default Dialogue