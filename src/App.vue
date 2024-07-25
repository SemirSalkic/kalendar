<script setup lang="ts">
const isDark = useDark()
const isDialogOpen = ref(false)
</script>

<template>
  <main
    class="relative h-full bg-white p-2 text-black dark:bg-black dark:text-white md:p-8"
  >
    <div class="absolute right-0 top-0 p-4">
      <VSwitch v-model="isDark"></VSwitch>
    </div>
    <div class="flex h-full flex-col items-center justify-center">
      <div class="flex flex-col items-center rounded-xl border-2 p-4">
        <div class="mb-4 flex w-full justify-between">
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
