import React from 'react';
import cls from './Footer.module.scss'
import { useTranslation } from 'react-i18next';
import { CopyRight } from './CopyRight/CopyRight';

export const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className={cls.footer}>
      {t('created_by')}
      <CopyRight />
    </footer>
  );
};