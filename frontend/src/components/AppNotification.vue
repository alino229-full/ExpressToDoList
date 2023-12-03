<template>
  <div
      ref="popup"
      v-for="notification in notifications"
      :key="notification.id"
      data-widget-item="notification-modal"
      class="bg-white z-[9999] select-none cursor-pointer p-2 fixed text-left right-4 _sm:right-0 _sm:mx-4 top-28 flex flex-row items-center flex-nowrap max-w-[37.5rem] border rounded-md m-[auto]"
  >
    <span v-if="notification.icon" class="inline-flex flex-shrink-0 mr-2 w-[16px] h-[16px]">
      <svg
          v-if="notification.type === 'error'"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M8.00001 1.33337C4.33334 1.33337 1.33334 4.33337 1.33334 8.00004C1.33334 11.6667 4.33334 14.6667 8.00001 14.6667C11.6667 14.6667 14.6667 11.6667 14.6667 8.00004C14.6667 4.33337 11.6667 1.33337 8.00001 1.33337ZM10.8 9.80004C11.5333 10.5334 10.4 11.6 9.66668 10.8667C9.06668 10.2667 8.53334 9.66671 7.93334 9.13337L6.20001 10.8667C5.46668 11.6 4.40001 10.4667 5.06668 9.73337C5.66668 9.13337 6.26668 8.53337 6.86668 8.00004L5.13334 6.26671C4.40001 5.53337 5.53334 4.46671 6.20001 5.20004C6.80001 5.80004 7.40001 6.40004 7.93334 6.93337L9.66668 5.20004C10.4 4.46671 11.4667 5.60004 10.8 6.33337C10.2667 6.86671 9.66668 7.40004 9.06668 8.00004L10.8 9.80004Z"
            fill="#EB5757"
        />
      </svg>
      <!---->
      <svg
          v-if="notification.type === 'success'"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M8.00001 1.33337C4.33334 1.33337 1.33334 4.33337 1.33334 8.00004C1.33334 11.6667 4.33334 14.6667 8.00001 14.6667C11.6667 14.6667 14.6667 11.6667 14.6667 8.00004C14.6667 4.33337 11.6667 1.33337 8.00001 1.33337ZM11.8667 6.26671C10.3333 7.80004 8.80001 9.33337 7.20001 10.8667C6.86668 11.2 6.40001 11.2 6.13334 10.8667C5.46668 10.2 4.86668 9.60004 4.20001 9.00004C3.46668 8.26671 4.60001 7.20004 5.33334 7.86671C5.80001 8.33337 6.26668 8.80004 6.66668 9.20004C8.00001 7.86671 9.40001 6.53337 10.7333 5.20004C11.4667 4.46671 12.5333 5.53337 11.8667 6.26671Z"
            fill="#27AE60"
        />
      </svg>
    </span>
    <!-- message -->
    <span class="font-medium text-xs">
      {{ notification.message }}
    </span>

    <span
        class="ml-1 self-start cursor-pointer inline-flex hover:opacity-95 active:animate-ping w-[24px] h-[24px]"
        @click="removeNotification(notification.id)"
    >
          <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.21967 6.21967C6.51256 5.92678 6.98744 5.92678 7.28033 6.21967L17.7803 16.7197C18.0732 17.0126 18.0732 17.4874 17.7803 17.7803C17.4874 18.0732 17.0126 18.0732 16.7197 17.7803L6.21967 7.28033C5.92678 6.98744 5.92678 6.51256 6.21967 6.21967Z"
                :fill="notification.type === 'success' ? '#047FB7' : '#E11000'"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.7803 6.21967C18.0732 6.51256 18.0732 6.98744 17.7803 7.28033L7.28033 17.7803C6.98744 18.0732 6.51256 18.0732 6.21967 17.7803C5.92678 17.4874 5.92678 17.0126 6.21967 16.7197L16.7197 6.21967C17.0126 5.92678 17.4874 5.92678 17.7803 6.21967Z"
                :fill="notification.type === 'success' ? '#047FB7' : '#E11000'"
            />
          </svg>
        </span>
  </div>
</template>

<script setup>
import useNotification from "../composable/useNotification";

const { notifications, removeNotification } = useNotification();


</script>

<style lang="scss" scoped>
div[data-widget-item="notification-modal"] {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  width: fit-content;

  &.slideup {
    transition: 1s ease;
    transition: all 1s ease;
    transform: translateY(-100vh);
  }
}
.fixed{
  position: fixed;
  top: 30%;
  right: 10px;
}
</style>
