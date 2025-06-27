<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'
import { toast } from 'vue-sonner'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { signIn } = useAuth()

const form = ref({ email: '', password: '' })
const isLoading = ref(false)
const isGoogleLoading = ref(false)

async function handleSubmit() {
  if (!form.value.email || !form.value.password) {
    toast.error('Please fill in all fields')
    return
  }

  isLoading.value = true
  try {
    const { error } = await signIn.email({ email: form.value.email, password: form.value.password })

    if (error) {
      toast.error(error.message || 'Failed to sign in')
    } else {
      toast.success('Signed in successfully!')
      await navigateTo('/')
    }
  } catch (error) {
    toast.error('An unexpected error occurred')
  } finally {
    isLoading.value = false
  }
}

async function handleGoogleLogin() {
  isGoogleLoading.value = true
  try {
    // The callbackURL should match your OAuth app's callback URL
    await signIn.social({ 
      provider: 'google', 
      callbackURL: window.location.origin + '/' 
    })
    // Note: This function will redirect, so code after this won't execute
  } catch (error) {
    console.error('Google login error:', error)
    toast.error('Failed to sign in with Google')
    isGoogleLoading.value = false
  }
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>Login to your account</UiCardTitle>
        <UiCardDescription>
          Enter your email below to login to your account
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <form @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-6">
            <div class="grid gap-3">
              <UiLabel for="email">Email</UiLabel>
              <UiInput id="email" v-model="form.email" type="email" placeholder="pepe@example.com" required :disabled="isLoading || isGoogleLoading" />
            </div>
            <div class="grid gap-3">
              <div class="flex items-center">
                <UiLabel for="password">Password</UiLabel>
                <NuxtLink href="#" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </NuxtLink>
              </div>
              <UiInput id="password" v-model="form.password" type="password" required :disabled="isLoading || isGoogleLoading" />
            </div>
            <div class="flex flex-col gap-3">
              <UiButton type="submit" class="w-full" :disabled="isLoading || isGoogleLoading">
                <Icon v-if="isLoading" name="mdi:loading" class="mr-2 h-4 w-4 animate-spin" />
                Login
              </UiButton>
              <UiButton variant="outline" class="w-full" type="button" @click.capture="handleGoogleLogin" :disabled="isLoading || isGoogleLoading">
                <Icon v-if="isGoogleLoading" name="mdi:loading" class="mr-2 h-4 w-4 animate-spin" />
                <Icon v-else name="mdi:google" class="mr-2 h-4 w-4" />
                Login with Google
              </UiButton>
            </div>
          </div>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <NuxtLink to="/signup" class="underline underline-offset-4">
              Sign up
            </NuxtLink>
          </div>
        </form>
      </UiCardContent>
    </UiCard>
  </div>
</template>
