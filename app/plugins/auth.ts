export default defineNuxtPlugin(async () => {
  const { fetchSession } = useAuth()
  
  // Initialize session
  await fetchSession()
})
