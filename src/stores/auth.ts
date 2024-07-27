import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = useLocalStorage<{
    name: string
    lastName: string
  }>('user', { name: 'Foo', lastName: 'Bar' })
  const isAdmin = useLocalStorage<boolean>('isAdmin', false)

  return {
    user,
    isAdmin
  }
})
