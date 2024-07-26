export interface Calendar {
  day: number | undefined
  date: string
  isWeekend: boolean
  description?: string
  travelEntry?: TravelEntry[]
}
export interface RangeConfig {
  noDisabledRange?: boolean
  showLastInRange?: boolean
  minMaxRawRange?: boolean
  partialRange?: boolean
  disableTimeRangeValidation?: boolean
  fixedStart?: boolean
  fixedEnd?: boolean
  maxRange?: string | number
  minRange?: string | number
  autoRange?: string | number
}

export enum LeaveType {
  ANNUAL_LEAVE = 'Godisnji odmor',
  SICK_LEAVE = 'Bolovanje',
  EMPTY = 'Izbrisi uneseno'
}

export enum ErrorType {
  ANNUAL_ERROR = 'Zabranjen unos godisnjeg odmora za vikend.',
  SICK_ERROR = 'Zabranjen unos bolovanja više od 7 dana.'
}

export enum Categories {
  LEAVE = 'Odsustvo',
  TRAVEL = 'Službeno putovanje'
}

// Travel Purpose

export enum TravelPurpose {
  WorkMeeting = 'Radni Sastanak',
  Business = 'Poslovno',
  Conference = 'Konferencija',
  Other = 'Ostalo'
}

export enum Currency {
  KM = 'KM',
  USD = 'USD',
  EUR = 'EUR'
}

export enum PaymentMethod {
  Card = 'Kartica',
  Cash = 'Gotovina',
  BankTransfer = 'Bankovni Transfer',
  Other = 'Ostalo'
}

export enum Country {
  BosniaAndHerzegovina = 'Bosna i Hercegovina',
  Croatia = 'Hrvatska',
  Serbia = 'Srbija',
  Montenegro = 'Crna Gora',
  Slovenia = 'Slovenija',
  Other = 'Ostalo'
}

export interface TravelEntry {
  travelEntryId?: string
  travelDetails: TravelDetails
  advancePayment: AdvancePayment
  travelExpense: TravelExpense
}
export interface TravelDetails {
  purpose: TravelPurpose
  startingCountry: Country
  startingCity: string
  destinationCountry: Country
  destinationCountryTwo?: Country
  destinationCity: string
  destinationCityTwo?: string
  startDateAndTIme?: Date
  endDateAndTime?: Date
  endDAteAndTimeTwo?: Date
  travelPurpose: string
  additionalInformation?: string
}

export interface AdvancePayment {
  amount?: number
  currency: Currency
  paymentDate?: Date
  paymentMethod: PaymentMethod
  notes?: string
}

// Calculation of Travel Costs

export interface TravelExpense {
  transportCosts: TransportCost[]
  ownCarUsage?: OwnCarUsage // Optional, only if own car is used
  accommodationCosts: AccommodationCost[]
  otherCosts: OtherCost[]
  isMealProvided: boolean // true if three meals are provided
}

export interface TransportCost {
  transportMeans: string
  quantity: number
  amount: number // in KM
  totalAmount: number // in KM
}

export interface OwnCarUsage {
  kilometersDriven?: number
  ratePerKilometer?: number // Dropdown list with predefined rates 0.5 | 0.75 | 1.0 | 1.25 | 1.5 | 1.88
  // TODO: Define better type for ratePerKilometer
  totalAmount?: number // in KM
}

export interface AccommodationCost {
  accommodationType: string
  numberOfNights?: number
  amountPerNight?: number // in KM
  totalAmount?: number // in KM
}

export interface OtherCost {
  costName: string
  quantity?: number
  amount?: number // in KM
  totalAmount?: number // in KM
}
