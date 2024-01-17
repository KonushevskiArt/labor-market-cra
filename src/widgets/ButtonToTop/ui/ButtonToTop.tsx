import { UpCircleOutlined } from '@ant-design/icons';
import { useEffect, useRef } from 'react';
import cls from './ButtonToTop.module.scss'
import { withDebaunce } from 'shared/helpers/withDebaunce';

export const ButtonToTop = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const scrollHandler = () => {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
      buttonRef!.current!.classList.add(cls.active)
    } else {
      buttonRef!.current!.classList.remove(cls.active)
    }
  } 

  const onScroll = () => {
    withDebaunce(scrollHandler, 50)
  }

  const clickHandler = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

 
  return (
    <button ref={buttonRef} className={cls.ButtonToTop} onClick={clickHandler} >
      <UpCircleOutlined className='bigIcon' /> 
    </button>
  );
};
