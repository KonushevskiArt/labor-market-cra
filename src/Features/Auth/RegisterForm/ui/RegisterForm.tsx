import cls from './RegisterForm.module.scss'
import { type SetStateAction, type FC, type Dispatch, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Button } from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons'
import { getAuth, createUserWithEmailAndPassword, type User } from 'firebase/auth'
import toast from 'react-hot-toast'
import { useTypedDispatch } from 'app/store'
import { setUser } from 'entities/User/model/userSlice'
import { db } from 'app/firebase'
import { doc, setDoc } from 'firebase/firestore'

interface Inputs {
  email: string
  userName: string
  password: string
  repeatPassword: string
}

interface IExpandedUser extends User {
  accessToken: string
}

interface RegisterFormProps {
  hideModal: () => void
  setRegisterForm: Dispatch<SetStateAction<boolean>>
}

export const RegisterForm: FC<RegisterFormProps> = ({ hideModal, setRegisterForm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>()
  const [isLoading, setLoading] = useState(false)
  const dispatch = useTypedDispatch()
  const [isIdenticalPasswords, setIdenticalPasswords] = useState(true)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password === data.repeatPassword) {
      setIdenticalPasswords(true)
      setLoading(true)

      try {
        const { email, password, userName } = data
        const auth = getAuth()
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        const expendedUser = user as IExpandedUser
        toast.success('successfully registered')

        await setDoc(doc(db, 'users', user.uid), { userName, email })

        dispatch(setUser({
          email: expendedUser.email,
          uid: expendedUser.uid,
          token: expendedUser.accessToken,
          userName
        }))
        reset()
        hideModal()
      } catch (error: any) {
        const messageError = error.message as string
        toast.error(messageError)
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {
      setIdenticalPasswords(false)
    }
  }
  const { t } = useTranslation()

  const isError = errors.email || errors.password

  return (
    <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={cls.label}>
        <span className={cls.labelTitle}>{t('email')}</span>
        <input
          className={cls.input}
          defaultValue=""
          {...register('email', {
            required: { value: true, message: t('requiredField') },
            minLength: { value: 6, message: t('minLength') },
            pattern: { value: /^\S+@\S+$/i, message: t('emailValidErrorMessage') }
          })}
        />
        {errors.email && <span className={cls.error}>{errors.email.message}</span>}
      </label>

      <label className={cls.label}>
        <span className={cls.labelTitle}>{t('userName')}</span>
        <input
          className={cls.input}
          defaultValue=""
          {...register('userName', {
            required: { value: true, message: t('requiredField') },
            minLength: { value: 6, message: t('minLength') },
            maxLength: { value: 45, message: t('maxLength') }
          })}
        />
        {errors.userName && <span className={cls.error}>{errors.userName.message}</span>}
      </label>

      <label className={cls.label}>
        <span className={cls.labelTitle}>{t('password')}</span>
        <input className={cls.input} {...register('password', {
          required: { value: true, message: t('requiredField') },
          minLength: { value: 6, message: t('minLength') },
          maxLength: { value: 45, message: t('maxLength') }
        })} />
        {errors.password && <span className={cls.error}>{errors.password.message}</span>}
      </label>

      <label className={cls.label}>
        <span className={cls.labelTitle}>{t('repeatPassword')}</span>
        {/* <input onChange={() => { setIdenticalPasswords(true) }} className={cls.input} {...register('repeatPassword', {
          required: { value: true, message: t('requiredField') }
        })} /> */}
        <input className={cls.input} {...register('repeatPassword', {
          required: { value: true, message: t('requiredField') }
        })} />
        {errors.repeatPassword && <span className={cls.error}>{errors.repeatPassword.message}</span>}
        {!isIdenticalPasswords && <span className={cls.error}>{t('passwordsDoNotMatch')}</span>}
      </label>

      <Button
        disabled={Boolean(isError) || isLoading}
        loading={isLoading}
        htmlType="submit"
        size='large'
        icon={<UsergroupAddOutlined />}
      >
        {t('register')}
      </Button>
      <p className={cls.registrationMessage}>
        {t('haveAccMessage')}&nbsp;
        <Button
          className={cls.buttonLink}
          type="link"
          onClick={() => { setRegisterForm(false) }}
        >
           {t('login')}
        </Button>
      </p>
    </form>
  )
}
