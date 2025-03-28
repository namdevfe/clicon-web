import { STORAGE } from '@/constants/storage'
import { Login } from '@/types/auth'

export const localToken = {
  set: (token: Login) => localStorage.setItem(STORAGE.AUTH, JSON.stringify(token)),
  get: () =>
    localStorage.getItem(STORAGE.AUTH) === undefined ? null : JSON.parse(localStorage.getItem(STORAGE.AUTH) as string),
  remove: () => localStorage.removeItem(STORAGE.AUTH)
}

const tokenMethod = {
  set: (token: Login) => localToken.set(token),
  get: () => localToken.get(),
  remove: () => localToken.remove()
}

export default tokenMethod
