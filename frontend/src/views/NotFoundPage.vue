<template>
  <div class="flex flex-col justify-center items-center h-full notfound-404">
    <span class="text-center text-black font-bold text-opacity-50 text-9xl">
      {{ "404" }}
    </span>

    <!---->

  </div>
</template>
<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.notfound-404 {
  :deep(.return) {
    .label {
      color: rgb(0 0 0 /50%);
      font-weight: 500;
      font-size: 14px;
    }
  }
}
</style>
