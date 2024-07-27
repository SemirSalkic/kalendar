<script setup lang="ts">
import { storeToRefs } from 'pinia'

const isDark = useDark()
const isDialogOpen = ref(false)
const tabGroupList = Object.values(TabGroupType)
const RegisterCategoriesList = Object.values(Categories)
const authStore = useAuthStore()
const { user, isAdmin } = storeToRefs(authStore)
</script>

<template>
  <main
    class="flex h-full flex-col bg-white p-2 text-black dark:bg-black dark:text-white md:p-8"
  >
    <div class="flex items-center gap-2 self-end p-2">
      <label class="mr-2">Ime:</label>
      <VInput v-model="user.name" class="w-40" placeholder="Ime"></VInput>
      <label class="mr-2">Prezime:</label>
      <VInput
        v-model="user.lastName"
        class="w-40"
        placeholder="Prezime"
      ></VInput>
      <span class="mr-2">Is admin:</span>
      <VSwitch v-model="isAdmin"></VSwitch>
      <span class="mr-2">Dark mode:</span>
      <VSwitch v-model="isDark"></VSwitch>
    </div>
    <div class="flex h-full overflow-auto md:justify-center">
      <VTabGroup :list="tabGroupList" class="min-w-[720px] max-w-[1400px]">
        <template v-slot:[TabGroupType.CALENDAR]>
          <div class="self-center rounded-xl border-2 p-4">
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
        </template>
        <template v-slot:[TabGroupType.REQUESTS]>
          <div class="min-w-[720px] self-center rounded-xl border-2 p-4">
            <LeaveRequestCollection></LeaveRequestCollection>
          </div>
        </template>
      </VTabGroup>
    </div>
    <VDialog v-model="isDialogOpen" class="min-w-[720px] px-4 py-6">
      <div class="w-full pt-2">
        <VTabGroup :list="RegisterCategoriesList">
          <template v-slot:[Categories.LEAVE]>
            <RegisterLeave @cancel="isDialogOpen = false"></RegisterLeave>
          </template>
          <template v-slot:[Categories.TRAVEL]>
            <TravelLeave @cancel="isDialogOpen = false"></TravelLeave>
          </template>
        </VTabGroup>
      </div>
    </VDialog>
  </main>
</template>

<style scoped></style>
