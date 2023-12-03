<template>
  <div
      class="w-full h-full  p-4 flex flex-col items-center justify-center custom-scroll overflow-y-auto fxt-template-guess"
  >

    <!---->
    <div class="block view-inside auth-page">
      <slot v-if="!!$slots.view" name="view" />
      <!---->
      <router-view v-slot="{ Component }">
        <transition name="component-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>

</style>
