import cls from './Logout.module.scss'
import { useState, type FC } from 'react'
import { useAuth } from 'shared/hooks/useAuth'
import { LoadingOutlined, LogoutOutlined } from '@ant-design/icons'
import { useTypedDispatch } from 'app/store'
import { removeUser } from 'entities/User/model/userSlice'
import { getAuth, signOut } from 'firebase/auth'
import toast from 'react-hot-toast'

type Error = {message: string}
export const Logout: FC = () => {
  const { email } = useAuth()
  const dispatch = useTypedDispatch()

  const [isLoading, setLoading] = useState(false)

  const handleLogout = async (): Promise<void> => {
    try {
      setLoading(true)
      const auth = getAuth()
      await signOut(auth)
      dispatch(removeUser())
    } catch (error: any) {
      if (error.message) {
        const messageError = error.message as string
        toast.error(messageError)
        console.log(error)
      }
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cls.logout}>
      <span className={cls.email}>{email}</span>
      <button
        onClick={handleLogout}
        className={cls.logoutButton}
        title="logout"
      >
        {isLoading
          ? <LoadingOutlined className={cls.Icon} />
          : <LogoutOutlined className={cls.Icon} />}

      </button>
    </div>
  )
}
