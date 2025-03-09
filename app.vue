<script setup>
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()
</script>
<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">Counter: {{ store.count }}</h1>
        <h1 class="text-4xl font-bold mb-4">Double Count: {{ store.doubleCount }}</h1>
        <button @click="store.increment" class="mt-4 px-4 py-2 bg-blue-500 rounded-lg">Increment</button>
        <button @click="store.decrement" class="mt-4 px-4 py-2 bg-red-500 rounded-lg">Decrement</button>
      </div>
    </div>
  </div>
</template>
