import { type FC } from 'react'
import { Skeleton } from 'antd'
import cls from './PageSkeleton.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'

const PageSkeleton: FC = () => {
  return (
    <div className={cls.container}>
      <Skeleton.Image className={classNames(cls.mr5, {}, [cls.mb5])} active />
      <Skeleton.Input active />
      <div className={cls.mb5}>
        <Skeleton title paragraph={{ rows: 2 }} active />
      </div>
      <Skeleton.Image className={classNames(cls.mr5, {}, [cls.mb5])} active />
      <Skeleton.Input />
      <Skeleton title paragraph={{ rows: 2 }} active />
    </div>
  )
}

export default PageSkeleton
