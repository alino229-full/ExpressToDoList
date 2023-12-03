<template>
  <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="
         bg-white
         border
         w-full
         border-gray-300
         focus:border-blue-500
         focus:ring-1 focus:ring-blue-500
         rounded-lg
         shadow-sm
         px-4 py-3
         text-base
         focus:outline-none
         transition duration-300 ease-in-out"
  >


</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  modelValue: String,
  type: {
    type: String,
    default: 'text'
  }
});
</script>


