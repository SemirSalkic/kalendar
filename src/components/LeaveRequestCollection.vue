<script setup lang="ts">
const travelEntryStatusList = Object.values(TravelEntryStatus)
</script>

<template>
  <div class="flex items-center justify-between">
    <TitleComponent title="Zahtevi za službeno putovanje"></TitleComponent>
  </div>
  <div class="flex flex-col">
    <VTabGroup :list="travelEntryStatusList">
      <template v-slot:[TravelEntryStatus.PENDING]>
        <LeaveRequestList
          :leave-request-status="TravelEntryStatus.PENDING"
        ></LeaveRequestList>
      </template>
      <template v-slot:[TravelEntryStatus.APPROVED]>
        <LeaveRequestList
          :leave-request-status="TravelEntryStatus.APPROVED"
        ></LeaveRequestList>
      </template>
      <template v-slot:[TravelEntryStatus.REJECTED]>
        <LeaveRequestList
          :leave-request-status="TravelEntryStatus.REJECTED"
        ></LeaveRequestList>
      </template>
      <template v-slot:[TravelEntryStatus.SENT_TO_BE_CORRECTED]>
        <LeaveRequestList
          :leave-request-status="TravelEntryStatus.SENT_TO_BE_CORRECTED"
        ></LeaveRequestList>
      </template>
    </VTabGroup>
  </div>
</template>
