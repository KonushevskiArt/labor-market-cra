import { DollarOutlined, PieChartOutlined, HourglassOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { t } from 'i18next';
import cls from './SortVacancyInterface.module.scss'
import { useTypedDispatch } from 'app/store';


export const SortVacancyInterface = () => {
  const dispatch = useTypedDispatch()

  const sortSalaryHandler = () => {
    // toSorted
    // dispatch(setVacanciesData(response?.data))
  }

  const sortWorkExperienceHandler = () => {

  }

  const sortPostedHandler = () => {

  }
  return (
    <div className={cls.sortWrapper}>
      <span>{t('sortBy')}:</span>
      <Button size='small'><DollarOutlined />{t('salary')}</Button>
      <Button size='small'><PieChartOutlined />{t('workExperience')}</Button>
      <Button size='small'><HourglassOutlined  />{t('posted')}</Button>
    </div>
  );
};