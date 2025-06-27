<script setup lang="ts">
definePageMeta({
  auth: {
    only: 'guest',
    redirectUserTo: '/',
  },
})
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center px-4">
    <SignupForm />
  </div>
</template>
