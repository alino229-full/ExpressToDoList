<template>
<textarea
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-full h-32 px-4 py-3 text-base my-2 text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-300 ease-in-out shadow-sm"
    placeholder="Votre texte ici..."
></textarea>
</template>
<script setup>

const props = defineProps({
  modelValue: String,
  type: {
    type: String,
    default: 'text'
  }
});
</script>

