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
    hour12: false
  })
}
