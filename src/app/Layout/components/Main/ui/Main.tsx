import React, { Suspense } from 'react';
import cls from './Main.module.scss'
import { AppRouter } from 'app/providers/router';
import { ButtonToTop } from 'widgets/ButtonToTop';

export const Main = () => {
  return (
    <Suspense fallback=''>
      <main className={cls.main}>
        <AppRouter />
        <ButtonToTop />
      </main>
    </Suspense>
  );
};
