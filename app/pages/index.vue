<script setup lang="ts">
import type { RefuelEntry, Car } from '~~/server/utils/drizzle'

interface RefuelTableEntry extends RefuelEntry {
  carName: string
}

const { data: refuelsRaw, refresh: refreshRefuels } = useFetch<RefuelEntry[]>('/api/garage/refuel', { lazy: true })
const { data: cars, refresh: refreshCars } = useFetch<Car[]>('/api/garage/car', { lazy: true })

const showSheet = ref(false)

const refuels = computed<RefuelTableEntry[]>(() => {
  if (!refuelsRaw.value || !cars.value) return []
  const carMap = new Map(cars.value.map(car => [car.id, car.name]))
  return refuelsRaw.value.map(r => ({ ...r, carName: carMap.get(r.carId) || '' }))
})

const postBody = ref<Omit<RefuelEntry, 'id' | 'createdAt' | 'updatedAt'> | null>(null)
const { execute: postRefuel } = useFetch('/api/garage/refuel', {
  method: 'POST',
  body: postBody,
  immediate: false,
  lazy: true,
})

function handleAddRefuel(entry: Omit<RefuelEntry, 'id' | 'createdAt' | 'updatedAt'>) {
  postBody.value = entry
  postRefuel().then(() => { refreshRefuels(); showSheet.value = false })
}

function handleAddCar() {
  // Implement add car logic or open a car sheet/modal
}
function handleEditCar(carId: number) {
  // Implement edit car logic or open a car sheet/modal
}
</script>

<template>
  <div class="max-w-2xl mx-auto py-8">
    <RefuelTable :refuels :onAdd="() => (showSheet = true)">
      <template #sheet="{ close }">
        <RefuelSheet
          v-if="cars"
          :cars="cars"
          @onSave="handleAddRefuel"
          @onAddCar="handleAddCar"
          @onEditCar="handleEditCar"
          @close="close"
        />
      </template>
    </RefuelTable>
  </div>
</template>
