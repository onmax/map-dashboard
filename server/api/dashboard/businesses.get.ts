import { getServerSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  // For now, return mock data - you can replace this with actual database queries
  return [
    {
      id: '1',
      name: 'My Coffee Shop',
      address: '123 Main St, City',
      status: 'active',
      cryptoTypes: ['BTC', 'ETH'],
      views: 150,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2', 
      name: 'Tech Store',
      address: '456 Tech Ave, City',
      status: 'pending',
      cryptoTypes: ['BTC'],
      views: 75,
      createdAt: new Date().toISOString(),
    }
  ]
})