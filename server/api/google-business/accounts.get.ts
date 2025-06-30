import { getServerSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  // For now, return mock data - you can replace this with actual Google Business API integration
  return {
    accounts: [
      {
        name: 'My Business Account',
        type: 'PERSONAL',
        role: 'OWNER',
      }
    ]
  }
})