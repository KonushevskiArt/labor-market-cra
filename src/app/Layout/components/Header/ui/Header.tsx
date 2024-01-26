import React from 'react'
import cls from './Header.module.scss'
import { AuthModal } from 'Features/Auth/AuthModal';
import { Logout } from 'Features/Auth/Logout';
import { LanguageSwitcher } from 'widgets/LanguageSwitcher';
import { Logo } from 'widgets/Logo';
import { Navbar } from 'widgets/Navbar';
import ThemeSwitcher from 'widgets/ThemeSwitcher';
import { useAuth } from 'shared/hooks/useAuth';

export const Header = () => {
  const { isAuth } = useAuth()
  
  return (
    <header className={cls.header}>
      <Logo />
      <Navbar />
      {isAuth
        ? <Logout /> 
        : <AuthModal />
      }
      <ThemeSwitcher />
      <LanguageSwitcher />
    </header>
  );
};
