<template>
  <div class="w-full h-full p-0 flex flex-col items-center justify-center custom-scroll overflow-y-auto ">

      <slot v-if="!!$slots.view" name="view" />
      <router-view v-slot="{ Component, route }">

          <component :is="Component" :key="route.fullPath" />

      </router-view>
    </div>

</template>


<script lang="ts" setup>


</script>

<style lang="scss" scoped>

</style>
