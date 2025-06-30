<script setup lang="ts">
interface Business {
  id: string
  name: string
  address: string
  status: 'active' | 'pending' | 'inactive'
  cryptoTypes: string[]
  views: number
  createdAt: string
}

interface Props {
  businesses: Business[]
  onRefresh: () => void
}

const props = defineProps<Props>()

const statusColors = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  inactive: 'bg-red-100 text-red-800',
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Business
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Crypto Types
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Views
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Added
          </th>
          <th class="relative px-6 py-3">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="business in businesses" :key="business.id" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div>
              <div class="text-sm font-medium text-gray-900">
                {{ business.name }}
              </div>
              <div class="text-sm text-gray-500">
                {{ business.address }}
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span :class="[statusColors[business.status], 'inline-flex px-2 py-1 text-xs font-semibold rounded-full']">
              {{ business.status }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex flex-wrap gap-1">
              <span
                v-for="crypto in business.cryptoTypes"
                :key="crypto"
                class="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
              >
                {{ crypto }}
              </span>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ business.views }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ formatDate(business.createdAt) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <UiButton variant="ghost" size="sm">
              <Icon name="mdi:pencil" class="h-4 w-4" />
            </UiButton>
            <UiButton variant="ghost" size="sm">
              <Icon name="mdi:eye" class="h-4 w-4" />
            </UiButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>