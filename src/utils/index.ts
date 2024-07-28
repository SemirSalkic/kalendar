/**
 * Utility functions for the application.
 *
 * This file exports utility functions that are used throughout the application.
 * These functions provide common functionality that is reused in multiple places,
 * helping to keep the codebase DRY (Don't Repeat Yourself) and making it easier
 * to make changes in one place.
 */

export const formatDate = (date?: Date | string): string => {
  const parsedDate = date ? new Date(date) : null
  if (!parsedDate || isNaN(parsedDate.getTime())) return 'Datum nije validan'

  return parsedDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  })
}

export const compareDatesAndFormat = (
  startDate: string,
  endDate: string,
  endDateTwo: string
): string => {
  const dates = [startDate, endDate, endDateTwo]
    .map((date) => new Date(date))
    .filter((date) => !isNaN(date.getTime()))
    .sort((a, b) => a.getTime() - b.getTime())

  if (dates.length < 2) {
    return 'Datum nije validan!'
  }

  return `${formatDate(dates[0])} - ${formatDate(dates[dates.length - 1])}`
}
