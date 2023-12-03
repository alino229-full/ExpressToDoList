<template>
  <button v-bind="$attrs" class="base-button">
    <span class="inline-flex flex-shrink-0 ">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>

</script>

<style scoped>
.base-button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }
}
</style>
