<script setup lang="ts">
const isDark = useDark()
const isDialogOpen = ref(false)
</script>

<template>
  <main class="relative bg-white text-black dark:bg-black dark:text-white p-10 h-full">
    <div class="absolute top-0 right-0 p-4">
      <VSwitch v-model="isDark"></VSwitch>
    </div>
    <div class="flex flex-col items-center justify-center h-full">
      <div class="border-2 p-4 flex flex-col items-center rounded-xl">
        <div class="flex justify-between w-full mb-4">
          <TitleComponent title="Kalendar"></TitleComponent>
          <VButton
            class="self-center rounded-md"
            color="neutral"
            label="Registruj odsustvo"
            @click="isDialogOpen = true"
          ></VButton>
        </div>
        <CalendarView></CalendarView>
      </div>
    </div>
    <VDialog v-model="isDialogOpen" class="max-w-5xl gap-4 px-4 py-6">
      <RegisterLeave @cancel="isDialogOpen = false"></RegisterLeave>
    </VDialog>
  </main>
</template>

<style scoped></style>
