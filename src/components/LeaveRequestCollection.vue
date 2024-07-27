<script setup lang="ts">
const travelEntryStatusList = Object.values(TravelEntryStatus)
</script>

<template>
  <div class="flex items-center justify-between">
    <TitleComponent title="Zahtevi za putovanje"></TitleComponent>
  </div>
  <div class="flex flex-col">
    <VTabGroup :list="travelEntryStatusList">
      <template v-slot:[TravelEntryStatus.Pending]>
        <LeaveRequestList
          :leave-request-status="TravelEntryStatus.Pending"
        ></LeaveRequestList>
      </template>
      <template v-slot:[TravelEntryStatus.Approved]>
        <LeaveRequestList
          :leave-request-status="TravelEntryStatus.Approved"
        ></LeaveRequestList>
      </template>
      <template v-slot:[TravelEntryStatus.Rejected]>
        <LeaveRequestList
          :leave-request-status="TravelEntryStatus.Rejected"
        ></LeaveRequestList>
      </template>
      <template v-slot:[TravelEntryStatus.SentToBeCorrected]>
        <LeaveRequestList
          :leave-request-status="TravelEntryStatus.SentToBeCorrected"
        ></LeaveRequestList>
      </template>
    </VTabGroup>
  </div>
</template>
