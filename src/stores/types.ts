export interface Calendar {
  day: number
  isWeekend: boolean
  description: string
}

export enum LeaveType {
  ANNUAL_LEAVE = 'Godisnji odmor',
  SICK_LEAVE = 'Bolovanje'
}
