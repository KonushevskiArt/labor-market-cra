import { type ReactNode, type FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from 'shared/hooks/useAuth'

interface IProps {
  children: ReactElement
}

export const RequireAuth: FC<IProps> = ({ children }) => {
  const { isAuth } = useAuth()

  return isAuth ? children : <Navigate to="/" replace />
}
