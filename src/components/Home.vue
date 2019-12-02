<template>
  <div class="field">
    <button class="example_c" @click="showModal">test modal</button>  
  </div>
</template>

<script>
export default {
  methods: {
    showModal() {
      const params = {
        title: "Attention!",
        text: "Are you sure to delete this item?",
        onConfirm: () => {
          return this.alertFunc();
        }
      };
      this.$dialogue.show(params)
    },
    alertFunc() {
      alert('dadada')
    }
  }
}
</script>

<style scoped>
.field {
  padding-top: 1%;
  padding-left: 15%;
  padding-right: 15%;
}

.example_c {
color: #494949 !important;
text-transform: uppercase;
text-decoration: none;
background: #ffffff;
padding: 20px;
border: 4px solid #494949 !important;
display: inline-block;
transition: all 0.4s ease 0s;
}

.example_c:hover {
color: #ffffff !important;
background: #f6b93b;
border-color: #f6b93b !important;
transition: all 0.4s ease 0s;
}
</style>