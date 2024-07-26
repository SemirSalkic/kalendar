<script setup lang="ts">
import {
  Country,
  Currency,
  PaymentMethod,
  TravelPurpose,
  type TravelEntry,
  type RatePerKilometer
} from '@/stores/types'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  travelEntryId?: string
  disabled?: boolean
}>()

const isDark = useDark()
const calendarStore = useCalendarStore()
const { firstDayOfMonth, lastDayOfMonth } = storeToRefs(calendarStore)

const rates: { label: string; value: RatePerKilometer }[] = [
  { label: '1.50 KM x 15%', value: 1.5 },
  { label: '1.75 KM x 15%', value: 1.75 },
  { label: '1.88 KM x 15%', value: 1.88 },
  { label: '2.25 KM x 15%', value: 2.25 },
  { label: '2.65 KM x 15%', value: 2.65 },
  { label: '2.88 KM x 15%', value: 2.88 }
]

const transportCostsDefault = {
  transportMeans: '',
  amount: 0,
  quantity: 0,
  totalAmount: 0
}

const accommodationCostsDefault = {
  accommodationType: '',
  amountPerNight: 0,
  numberOfNights: 0,
  totalAmount: 0
}

const otherCostsDefault = {
  costName: '',
  amount: 0,
  quantity: 0,
  totalAmount: 0
}

const state = ref<TravelEntry>({
  employeeNames: {
    registeredByFirstName: '',
    registeredByLastName: '',
    registeredEmployeeFirstName: '',
    registeredEmployeeLastName: ''
  },
  advancePayment: {
    amount: 0,
    currency: Currency.KM,
    paymentMethod: PaymentMethod.Card,
    paymentDate: undefined,
    notes: ''
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
    transportCosts: [{ ...transportCostsDefault }],
    ownCarUsage: {
      kilometersDriven: 0,
      ratePerKilometer: 1.88,
      totalAmount: 0
    },
    accommodationCosts: [
      {
        ...accommodationCostsDefault
      }
    ],
    otherCosts: [
      {
        ...otherCostsDefault
      }
    ],
    isMealProvided: false
  }
})

function addTransportCost() {
  state.value.travelExpense.transportCosts.push({ ...transportCostsDefault })
}

function removeTransportCost(index: number) {
  state.value.travelExpense.transportCosts.splice(index, 1)
}

function addAccommodationCost() {
  state.value.travelExpense.accommodationCosts.push({
    ...accommodationCostsDefault
  })
}

function removeAccommodationCost(index: number) {
  state.value.travelExpense.accommodationCosts.splice(index, 1)
}

function addOtherCost() {
  state.value.travelExpense.otherCosts.push({ ...otherCostsDefault })
}

function removeOtherCost(index: number) {
  state.value.travelExpense.otherCosts.splice(index, 1)
}

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
    <span v-if="travelEntryId" class="text-sm">
      Broj naloga: {{ travelEntryId }}
    </span>

    <VDisclosure title="Osobni podaci">
      <div class="flex gap-2">
        <div class="flex w-full flex-col">
          <label for="registeredByFirstName">Ime podnosioca:</label>
          <VInput
            id="registeredByFirstName"
            name="registeredByFirstName"
            v-model="state.employeeNames.registeredByFirstName"
            class="h-9"
            placeholder="Unesite ime"
            :disabled="props.disabled"
          ></VInput>
        </div>
        <div class="flex w-full flex-col">
          <label for="registeredByLastName">Prezime podnosioca:</label>
          <VInput
            id="registeredByLastName"
            name="registeredByLastName"
            v-model="state.employeeNames.registeredByLastName"
            class="h-9"
            placeholder="Unesite prezime"
            :disabled="props.disabled"
          ></VInput>
        </div>
      </div>
      <div class="flex gap-2">
        <div class="flex w-full flex-col">
          <label for="registeredEmployeeFirstName">Ime registrovanog:</label>
          <VInput
            id="registeredEmployeeFirstName"
            name="registeredEmployeeFirstName"
            v-model="state.employeeNames.registeredEmployeeFirstName"
            class="h-9"
            placeholder="Unesite ime"
            :disabled="props.disabled"
          ></VInput>
        </div>
        <div class="flex w-full flex-col">
          <label for="registeredEmployeeLastName">Prezime registrovanog:</label>
          <VInput
            id="registeredEmployeeLastName"
            name="registeredEmployeeLastName"
            v-model="state.employeeNames.registeredEmployeeLastName"
            class="h-9"
            placeholder="Unesite prezime"
            :disabled="props.disabled"
          ></VInput>
        </div>
      </div>
    </VDisclosure>

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
          :disabled="props.disabled"
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
            :disabled="props.disabled"
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
            :disabled="props.disabled"
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
            :disabled="props.disabled"
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
            :disabled="props.disabled"
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
            :disabled="props.disabled"
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
            :disabled="props.disabled"
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
            :disabled="props.disabled"
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
            :disabled="props.disabled"
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
            :disabled="props.disabled"
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
            :disabled="props.disabled"
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
            :disabled="props.disabled"
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
            :min-number="0"
            :disabled="props.disabled"
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
            :disabled="props.disabled"
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
            :disabled="props.disabled"
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
            :disabled="props.disabled"
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
          :disabled="props.disabled"
        ></textarea>
      </div>
    </VDisclosure>

    <VDisclosure title="Troškovi prevoza">
      <div class="flex flex-col gap-4">
        <div
          v-for="(cost, index) in state.travelExpense.transportCosts"
          :key="index"
          class="flex w-full items-center gap-2"
        >
          <div class="flex flex-col">
            <label for="transportMeans">Prevozno sredstvo:</label>
            <VInput
              id="transportMeans"
              name="transportMeans"
              v-model="cost.transportMeans"
              class="h-9 w-full"
              placeholder="Unesite naziv prevoza"
              type="text"
              :disabled="props.disabled"
            ></VInput>
          </div>
          <div class="flex flex-col">
            <label for="transportQuantity">Količina:</label>
            <VInput
              id="transportQuantity"
              name="transportQuantity"
              v-model="cost.quantity"
              class="h-9 w-24"
              placeholder="Unesite količinu"
              type="number"
              :min-number="0"
              :disabled="props.disabled"
              @update:model-value="
                cost.amount && cost.quantity
                  ? (cost.totalAmount = cost.amount * cost.quantity)
                  : (cost.totalAmount = 0)
              "
            ></VInput>
          </div>
          <div class="flex flex-col">
            <label for="transportAmount">Iznos KM:</label>
            <VInput
              id="transportAmount"
              name="transportAmount"
              v-model="cost.amount"
              class="h-9 w-24"
              placeholder="Unesite iznos"
              type="number"
              :min-number="0"
              :disabled="props.disabled"
              @update:model-value="
                cost.amount && cost.quantity
                  ? (cost.totalAmount = cost.amount * cost.quantity)
                  : (cost.totalAmount = 0)
              "
            ></VInput>
          </div>
          <div class="flex flex-col">
            <label for="transportTotalAmount">Ukupno KM:</label>
            <span
              id="transportTotalAmount"
              name="transportTotalAmount"
              class="h-9 w-24 place-content-center"
              disabled
              >{{ cost.totalAmount.toFixed(2) }}</span
            >
          </div>
          <VButton
            v-if="
              state.travelExpense.transportCosts.length > 1 || !props.disabled
            "
            class="h-9 w-24 rounded-md"
            color="error"
            label="Ukloni"
            @click="removeTransportCost(index)"
          ></VButton>
        </div>
        <VButton
          v-if="!props.disabled"
          class="w-32 rounded-md"
          color="success"
          label="Dodaj red"
          @click="addTransportCost"
        ></VButton>
      </div>
      <div class="flex flex-col gap-2">
        <span
          >U slučaju da ste koristili vlastiti automobil popunite pređene
          kilometre</span
        >
        <div class="flex gap-2">
          <VInput
            id="transportAmount"
            name="transportAmount"
            v-model="state.travelExpense.ownCarUsage.kilometersDriven"
            class="h-9 w-40"
            placeholder="Unesite kilometre"
            type="number"
            :min-number="0"
            :disabled="props.disabled"
            @update:model-value="
              state.travelExpense.ownCarUsage.kilometersDriven
                ? (state.travelExpense.ownCarUsage.totalAmount =
                    state.travelExpense.ownCarUsage.kilometersDriven *
                    (state.travelExpense.ownCarUsage.ratePerKilometer * 0.15))
                : (state.travelExpense.ownCarUsage.totalAmount = 0)
            "
          ></VInput>
          <VDropdown
            id="currency"
            name="currency"
            class="h-9 w-32"
            :list="rates.map((rate) => rate.label)"
            :selected="
              rates.find(
                (rate) =>
                  rate.value ===
                  state.travelExpense.ownCarUsage.ratePerKilometer
              )?.label
            "
            :disabled="props.disabled"
            @selected="
              (index) => {
                state.travelExpense.ownCarUsage.ratePerKilometer =
                  rates[index].value
                state.travelExpense.ownCarUsage.kilometersDriven
                  ? (state.travelExpense.ownCarUsage.totalAmount =
                      state.travelExpense.ownCarUsage.kilometersDriven *
                      (state.travelExpense.ownCarUsage.ratePerKilometer * 0.15))
                  : (state.travelExpense.ownCarUsage.totalAmount = 0)
              }
            "
          ></VDropdown>
          <span
            id="transportTotalAmount"
            name="transportTotalAmount"
            class="h-9 w-full place-content-center"
            disabled
            >Ukupno KM:
            {{ state.travelExpense.ownCarUsage.totalAmount.toFixed(2) }}</span
          >
        </div>
      </div>
    </VDisclosure>

    <VDisclosure title="Izdaci za noćenje">
      <div class="flex flex-col gap-4">
        <div
          v-for="(cost, index) in state.travelExpense.accommodationCosts"
          :key="index"
          class="flex w-full items-center gap-2"
        >
          <div class="flex flex-col">
            <label for="accommodationType">Vrsta smještaja:</label>
            <VInput
              id="accommodationType"
              name="accommodationType"
              v-model="cost.accommodationType"
              class="h-9 w-full"
              placeholder="Unesite naziv"
              type="text"
              :disabled="props.disabled"
            ></VInput>
          </div>
          <div class="flex flex-col">
            <label for="numberOfNights">Broj noćenja:</label>
            <VInput
              id="numberOfNights"
              name="numberOfNights"
              v-model="cost.numberOfNights"
              class="h-9 w-24"
              placeholder="Unesite količinu"
              type="number"
              :min-number="0"
              :disabled="props.disabled"
              @update:model-value="
                cost.numberOfNights && cost.amountPerNight
                  ? (cost.totalAmount =
                      cost.numberOfNights * cost.amountPerNight)
                  : (cost.totalAmount = 0)
              "
            ></VInput>
          </div>
          <div class="flex flex-col">
            <label for="amountPerNight">Iznos KM:</label>
            <VInput
              id="amountPerNight"
              name="amountPerNight"
              v-model="cost.amountPerNight"
              class="h-9 w-24"
              placeholder="Unesite iznos"
              type="number"
              :min-number="0"
              :disabled="props.disabled"
              @update:model-value="
                cost.numberOfNights && cost.amountPerNight
                  ? (cost.totalAmount =
                      cost.numberOfNights * cost.amountPerNight)
                  : (cost.totalAmount = 0)
              "
            ></VInput>
          </div>
          <div class="flex flex-col">
            <label for="accommodationTotalAmount">Ukupno KM:</label>
            <span
              id="accommodationTotalAmount"
              name="accommodationTotalAmount"
              class="h-9 w-24 place-content-center"
              disabled
              >{{ cost.totalAmount?.toFixed(2) }}</span
            >
          </div>
          <VButton
            v-if="
              state.travelExpense.accommodationCosts.length > 1 ||
              !props.disabled
            "
            class="h-9 w-24 rounded-md"
            color="error"
            label="Ukloni"
            @click="removeAccommodationCost(index)"
          ></VButton>
        </div>
        <VButton
          v-if="!props.disabled"
          class="w-32 rounded-md"
          color="success"
          label="Dodaj red"
          @click="addAccommodationCost"
        ></VButton>
      </div>
    </VDisclosure>

    <VDisclosure title="Ostali troskovi">
      <div class="flex flex-col gap-4">
        <div
          v-for="(cost, index) in state.travelExpense.otherCosts"
          :key="index"
          class="flex w-full items-center gap-2"
        >
          <div class="flex flex-col">
            <label for="otherCostType">Naziv troška:</label>
            <VInput
              id="otherCostType"
              name="otherCostType"
              v-model="cost.costName"
              class="h-9 w-full"
              placeholder="Unesite naziv"
              type="text"
              :disabled="props.disabled"
            ></VInput>
          </div>
          <div class="flex flex-col">
            <label for="otherCostQuantity">Količina:</label>
            <VInput
              id="otherCostQuantity"
              name="otherCostQuantity"
              v-model="cost.quantity"
              class="h-9 w-24"
              placeholder="Unesite količinu"
              type="number"
              :min-number="0"
              :disabled="props.disabled"
              @update:model-value="
                cost.quantity && cost.amount
                  ? (cost.totalAmount = cost.quantity * cost.amount)
                  : (cost.totalAmount = 0)
              "
            ></VInput>
          </div>
          <div class="flex flex-col">
            <label for="otherCostAmount">Iznos KM:</label>
            <VInput
              id="otherCostAmount"
              name="otherCostAmount"
              v-model="cost.amount"
              class="h-9 w-24"
              placeholder="Unesite iznos"
              type="number"
              :min-number="0"
              :disabled="props.disabled"
              @update:model-value="
                cost.quantity && cost.amount
                  ? (cost.totalAmount = cost.quantity * cost.amount)
                  : (cost.totalAmount = 0)
              "
            ></VInput>
          </div>
          <div class="flex flex-col">
            <label for="otherCostTotalAmount">Ukupno KM:</label>
            <span
              id="otherCostTotalAmount"
              name="otherCostTotalAmount"
              class="h-9 w-24 place-content-center"
              >{{ cost.totalAmount?.toFixed(2) }}</span
            >
          </div>
          <VButton
            v-if="state.travelExpense.otherCosts.length > 1 || !props.disabled"
            class="h-9 w-24 rounded-md"
            color="error"
            label="Ukloni"
            @click="removeOtherCost(index)"
          ></VButton>
        </div>
        <VButton
          v-if="!props.disabled"
          class="w-32 rounded-md"
          color="success"
          label="Dodaj red"
          @click="addOtherCost"
        ></VButton>
      </div>
    </VDisclosure>

    <VDisclosure
      title="Da li je bila osigurana ishrana tokom puta (tri obroka)"
    >
      <div class="flex gap-2">
        <VButton
          class="w-24 self-center rounded-md"
          :color="state.travelExpense.isMealProvided ? 'success' : 'neutral'"
          label="Da"
          :disabled="props.disabled"
          @click="state.travelExpense.isMealProvided = true"
        ></VButton>
        <VButton
          class="w-24 self-center rounded-md"
          :color="!state.travelExpense.isMealProvided ? 'error' : 'neutral'"
          label="Ne"
          :disabled="props.disabled"
          @click="state.travelExpense.isMealProvided = false"
        ></VButton>
      </div>
    </VDisclosure>

    <div class="mt-6 flex gap-4 self-center">
      <VButton
        v-if="!props.disabled"
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
