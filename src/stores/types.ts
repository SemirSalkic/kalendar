export interface Calendar {
  day: number
  date: string
  isWeekend: boolean
  description?: string
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
