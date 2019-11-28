<template>
<div class="modal-wrapper" v-if="visible">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hide()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        {{text}}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hide()">Cancel</button>
        <button type="button" class="btn btn-dark" @click="confirm()">Confirm</button>
      </div>
    </div>
</div>
</template>


<script>
import Dialogue from '../dialogue.js';

export default {
  data() {
    return {
      visible: false, 
      title: '',
      text: '',
      onConfirm: {}
    }
  },
  methods: {
    hide() {
      this.visible = false;
    },
    confirm() {
      if(typeof this.onConfirm === 'function') {
        this.onConfirm();
        this.hide();
      } else {
        this.hide();
      }
    },
    show(params) {
      this.visible = true;
      this.title = params.title;
      this.text = params.text;
      this.onConfirm = params.onConfirm;
    }
  },
  beforeMount() {
    Dialogue.EventBus.$on('show', (params) => {
      this.show(params)
    })
  }
}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  z-index: 1000;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>