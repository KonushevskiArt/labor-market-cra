import { useTypedSelector } from 'app/store'

export interface IAuth {
  isAuth: boolean
  email: string | null
  token: string | null
  uid: string | null
  userName: string | null
}

export const useAuth = (): IAuth => {
  const { email, token, uid, userName } = useTypedSelector(state => state.user)

  return {
    isAuth: Boolean(email),
    userName,
    email,
    token,
    uid
  }
}
