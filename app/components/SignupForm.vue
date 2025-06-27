<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>Create a new account</UiCardTitle>
        <UiCardDescription>
          Enter your details below to create a new account
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <form @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-6">
            <div class="grid gap-3">
              <UiLabel for="email">Email</UiLabel>
              <UiInput 
                id="email" 
                v-model="form.email"
                type="email" 
                placeholder="m@example.com" 
                required 
                :disabled="isLoading"
              />
            </div>
            <div class="grid gap-3">
              <UiLabel for="password">Password</UiLabel>
              <UiInput 
                id="password" 
                v-model="form.password"
                type="password" 
                required 
                :disabled="isLoading"
              />
            </div>
            <div class="flex flex-col gap-3">
              <UiButton 
                type="submit" 
                class="w-full"
                :disabled="isLoading"
              >
                <Icon v-if="isLoading" name="mdi:loading" class="mr-2 h-4 w-4 animate-spin" />
                Sign up
              </UiButton>
            </div>
          </div>
          <div class="mt-4 text-center text-sm">
            Already have an account?
            <NuxtLink to="/login" class="underline underline-offset-4">
              Login
            </NuxtLink>
          </div>
        </form>
      </UiCardContent>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'
import { toast } from 'vue-sonner'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { signUp } = useAuth()

const form = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)

async function handleSubmit() {
  if (!form.value.email || !form.value.password) {
    toast.error('Please fill in all fields')
    return
  }

  isLoading.value = true
  try {
    const { error } = await signUp({
      email: form.value.email,
      password: form.value.password
    })

    if (error) {
      toast.error(error.message || 'Failed to sign up')
    } else {
      toast.success('Signed up successfully!')
      await navigateTo('/')
    }
  } catch (error) {
    toast.error('An unexpected error occurred')
  } finally {
    isLoading.value = false
  }
}
</script>

