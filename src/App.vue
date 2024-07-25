<script setup lang="ts">
const isDark = useDark()
const isDialogOpen = ref(false)
</script>

<template>
  <main
    class="flex h-full flex-col bg-white p-2 text-black dark:bg-black dark:text-white md:p-8"
  >
    <div class="p-2 text-end">
      <VSwitch v-model="isDark"></VSwitch>
    </div>
    <div class="h-full place-content-center overflow-auto md:self-center">
      <div class="min-w-[600px] self-center rounded-xl border-2 p-4">
        <div class="mb-4 flex w-full items-center justify-between">
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
    <VDialog v-model="isDialogOpen" class="max-w-5xl px-4 py-6">
      <RegisterLeave @cancel="isDialogOpen = false"></RegisterLeave>
    </VDialog>
  </main>
</template>

<style scoped></style>
