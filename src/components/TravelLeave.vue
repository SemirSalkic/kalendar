<script setup lang="ts">
import {
  Country,
  Currency,
  PaymentMethod,
  TravelPurpose,
  type TravelEntry
} from '@/stores/types'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  travelEntryId?: string
}>()

const isDark = useDark()
const calendarStore = useCalendarStore()
const { firstDayOfMonth, lastDayOfMonth } = storeToRefs(calendarStore)

const state = ref<TravelEntry>({
  advancePayment: {
    amount: 0,
    currency: Currency.KM,
    paymentDate: undefined,
    paymentMethod: PaymentMethod.Card
  },
  travelDetails: {
    purpose: TravelPurpose.WorkMeeting,
    startingCountry: Country.BosniaAndHerzegovina,
    startingCity: '',
    destinationCountry: Country.BosniaAndHerzegovina,
    destinationCountryTwo: undefined,
    destinationCity: '',
    destinationCityTwo: '',
    startDateAndTIme: undefined,
    endDateAndTime: undefined,
    endDAteAndTimeTwo: undefined,
    travelPurpose: '',
    additionalInformation: ''
  },
  travelExpense: {
    transportCosts: [],
    ownCarUsage: {
      kilometersDriven: undefined,
      ratePerKilometer: undefined,
      totalAmount: undefined
    },
    accommodationCosts: [],
    otherCosts: [],
    isMealProvided: false
  }
})

function saveTravelEntry() {
  console.log(state.value)
}

const emit = defineEmits<{
  (e: 'cancel'): void
}>()
</script>

<template>
  <div
    class="flex flex-col justify-center gap-2 p-2 text-black dark:text-white"
  >
    <TitleComponent
      title="Zahtjev za službeno putovanje"
      class="self-center"
    ></TitleComponent>

    <VDisclosure title="Odredište putovanja">
      <div class="flex flex-col">
        <label for="purpose">Svrha</label>
        <VDropdown
          id="purpose"
          name="purpose"
          v-model="state.travelDetails.purpose"
          class="h-9 w-full"
          :list="Object.values(TravelPurpose)"
          :selected="state.travelDetails.purpose"
          @selected="
            (index) =>
              (state.travelDetails.purpose =
                Object.values(TravelPurpose)[index])
          "
        ></VDropdown>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex flex-col">
          <label for="startingCountry">Polazna država:</label>
          <VDropdown
            id="startingCountry"
            name="startingCountry"
            v-model="state.travelDetails.startingCountry"
            class="h-9 w-44"
            :list="Object.values(Country)"
            :selected="state.travelDetails.startingCountry"
            @selected="
              (index) =>
                (state.travelDetails.startingCountry =
                  Object.values(Country)[index])
            "
          ></VDropdown>
        </div>
        <div class="flex flex-col">
          <label for="startingCity">Grad polaska:</label>
          <VInput
            id="startingCity"
            name="startingCity"
            v-model="state.travelDetails.startingCity"
            class="h-9"
            placeholder="Unesite grad"
          ></VInput>
        </div>
        <div class="flex flex-col">
          <label for="startDate">Početak datum i vrijeme:</label>
          <VueDatePicker
            id="startDate"
            name="startDate"
            v-model="state.travelDetails.startDateAndTIme"
            :dark="isDark"
            disable-month-year-select
            :min-date="firstDayOfMonth"
            :max-date="lastDayOfMonth"
            @cleared="state.travelDetails.startDateAndTIme = undefined"
          ></VueDatePicker>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div class="flex flex-col">
          <label for="destinationCountry">Odredišna država:</label>
          <VDropdown
            id="destinationCountry"
            name="destinationCountry"
            v-model="state.travelDetails.destinationCountry"
            class="h-9 w-44"
            :list="Object.values(Country)"
            :selected="state.travelDetails.destinationCountry"
            @selected="
              (index) =>
                (state.travelDetails.destinationCountry =
                  Object.values(Country)[index])
            "
          ></VDropdown>
        </div>
        <div class="flex flex-col">
          <label for="destinationCity">Grad odredišta:</label>
          <VInput
            id="destinationCity"
            name="destinationCity"
            v-model="state.travelDetails.destinationCity"
            class="h-9"
            placeholder="Unesite grad"
          ></VInput>
        </div>
        <div class="flex flex-col">
          <label for="endDate">Krajnji datum i vrijeme:</label>
          <VueDatePicker
            id="endDate"
            name="endDate"
            v-model="state.travelDetails.endDateAndTime"
            :dark="isDark"
            disable-month-year-select
            :min-date="firstDayOfMonth"
            :max-date="lastDayOfMonth"
            @cleared="state.travelDetails.endDateAndTime = undefined"
          ></VueDatePicker>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div class="flex flex-col">
          <label for="destinationCountryTwo">Odredišna država dva:</label>
          <VDropdown
            id="destinationCountryTwo"
            name="destinationCountryTwo"
            v-model="state.travelDetails.destinationCountryTwo"
            class="h-9 w-44"
            :list="Object.values(Country)"
            :selected="state.travelDetails.destinationCountryTwo"
            @selected="
              (index) =>
                (state.travelDetails.destinationCountryTwo =
                  Object.values(Country)[index])
            "
          ></VDropdown>
        </div>
        <div class="flex flex-col">
          <label for="destinationCityTwo">Grad odredišta dva:</label>
          <VInput
            id="destinationCityTwo"
            name="destinationCityTwo"
            v-model="state.travelDetails.destinationCityTwo"
            class="h-9"
            placeholder="Unesite grad"
          ></VInput>
        </div>
        <div class="flex flex-col">
          <label for="endDateTwo">Krajnji datum i vrijeme dva:</label>
          <VueDatePicker
            id="endDateTwo"
            name="endDateTwo"
            v-model="state.travelDetails.endDAteAndTimeTwo"
            :dark="isDark"
            disable-month-year-select
            :min-date="firstDayOfMonth"
            :max-date="lastDayOfMonth"
            @cleared="state.travelDetails.endDAteAndTimeTwo = undefined"
          ></VueDatePicker>
        </div>
      </div>

      <div class="flex w-full gap-2">
        <div class="flex w-full flex-col">
          <label for="travelReason">Razlog putovanja:</label>
          <textarea
            id="travelReason"
            name="travelReason"
            v-model="state.travelDetails.travelPurpose"
            class="h-9 rounded-md border-2 bg-white px-2 text-black hover:ring-1 hover:ring-gray-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white"
            placeholder="Unesite razlog putovanja"
          ></textarea>
        </div>
        <div class="flex w-full flex-col">
          <label for="additionalInformation">Napomena:</label>
          <textarea
            id="additionalInformation"
            name="additionalInformation"
            v-model="state.travelDetails.additionalInformation"
            class="h-9 rounded-md border-2 bg-white px-2 text-black hover:ring-1 hover:ring-gray-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white"
            placeholder="Unesite napomenu"
          ></textarea>
        </div></div
    ></VDisclosure>

    <VDisclosure title="Dodavanje akontacije">
      <div class="flex items-center gap-2">
        <div class="flex flex-col">
          <label for="paymentAmount">Vrijednost:</label>
          <VInput
            id="paymentAmount"
            name="paymentAmount"
            v-model="state.advancePayment.amount"
            class="h-9 w-32"
            placeholder="Unesite iznos"
            type="number"
          ></VInput>
        </div>
        <div class="flex flex-col">
          <label for="currency">Valuta:</label>
          <VDropdown
            id="currency"
            name="currency"
            v-model="state.advancePayment.currency"
            class="h-9 w-28"
            :list="Object.values(Currency)"
            :selected="state.advancePayment.currency"
            @selected="
              (index) =>
                (state.advancePayment.currency = Object.values(Currency)[index])
            "
          ></VDropdown>
        </div>
        <div class="flex flex-col">
          <label for="paymentMethod">Način uplate:</label>
          <VDropdown
            id="paymentMethod"
            name="paymentMethod"
            v-model="state.advancePayment.paymentMethod"
            class="h-9 w-32"
            :list="Object.values(PaymentMethod)"
            :selected="state.advancePayment.paymentMethod"
            @selected="
              (index) =>
                (state.advancePayment.paymentMethod =
                  Object.values(PaymentMethod)[index])
            "
          ></VDropdown>
        </div>
        <div class="flex flex-col">
          <label for="paymentDate">Akontacija do datuma:</label>
          <VueDatePicker
            id="paymentDate"
            name="paymentDate"
            v-model="state.advancePayment.paymentDate"
            :dark="isDark"
            disable-month-year-select
            :min-date="firstDayOfMonth"
            :max-date="lastDayOfMonth"
            @cleared="state.advancePayment.paymentDate = undefined"
          ></VueDatePicker>
        </div>
      </div>

      <div class="flex w-full flex-col">
        <label for="paymentNotes">Napomena:</label>
        <textarea
          id="paymentNotes"
          name="paymentNotes"
          v-model="state.advancePayment.notes"
          class="h-9 rounded-md border-2 bg-white px-2 text-black hover:ring-1 hover:ring-gray-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white"
          placeholder="Unesite napomenu"
        ></textarea>
      </div>
    </VDisclosure>

    <div class="mt-6 flex gap-4 self-center">
      <VButton
        class="w-24 self-center rounded-md"
        color="success"
        label="Pošalji"
        @click="saveTravelEntry"
      ></VButton>
      <VButton
        class="w-24 self-center rounded-md"
        color="error"
        label="Zatvori"
        @click="emit('cancel')"
      ></VButton>
    </div>
  </div>
</template>
