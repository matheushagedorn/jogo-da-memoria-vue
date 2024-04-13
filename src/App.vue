<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <router-view/>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>