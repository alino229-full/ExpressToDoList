<template>
  <div  class="fixed bottom-4 right-4 md:right-8 p-4 bg-green-500 text-white rounded-lg shadow-lg transition-all">
    <p>{{ message }} </p>
  </div>
</template>

<script >

export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  }
};



</script>

<style>
/* Ajoute des styles supplémentaires si nécessaire */
</style>
