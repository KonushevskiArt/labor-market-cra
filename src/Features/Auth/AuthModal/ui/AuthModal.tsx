import cls from './AuthModal.module.scss'
import { useState, type FC } from 'react'
import { Modal } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import { LoginForm } from 'Features/Auth/LoginForm'
import { useTranslation } from 'react-i18next'
import { RegisterForm } from 'Features/Auth/RegisterForm'

export const AuthModal: FC = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [isRegisterForm, setRegisterForm] = useState(false)

  const showModal = (): void => {
    setOpen(true)
  }

  const hideModal = (): void => {
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={showModal}
        className={cls.LoginButton}
        title="login"
      >
        <LoginOutlined className={cls.LoginIcon} />
      </button>
      <Modal
        open={open}
        className={cls.modal}
        title={t('loginTitle')}
        onOk={hideModal}
        onCancel={hideModal}
        footer={[]}
      >
        {isRegisterForm
          ? <RegisterForm setRegisterForm={setRegisterForm} hideModal={hideModal} />
          : <LoginForm setRegisterForm={setRegisterForm} hideModal={hideModal} />
      }
      </Modal>
    </>
  )
}
