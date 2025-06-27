export default defineNuxtPlugin(async () => {
  const { fetchSession } = useAuth()
  
  // Initialize session on client-side
  await fetchSession()
})
