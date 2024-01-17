import React, { useState } from 'react';
import cls from './FilterVacancyInterface.module.scss'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { SearchOutlined } from '@ant-design/icons';

interface IFinters {
  employment: string
  city: string
  salaryFrom: number,
  salaryTo: number,
  experienceFrom: number,
  experienceTo: number, 
}

export const FilterVacancyInterface = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employment: '',
      city: '',
      salaryFrom: 0,
      salaryTo: 0,
      experienceFrom: 0,
      experienceTo: 0, 
    }
  })

  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { t } = useTranslation()

  const filterDataValidation = (data: IFinters) => {
    const {
      salaryFrom,
      salaryTo,
      experienceFrom,
      experienceTo
    } = data
    if (salaryFrom > salaryTo) {
      return {isError: true, errorMessage: t('theLowerThresholdOfSalaryExceeds')} 
    } else if (experienceFrom > experienceTo) {
      return {isError: true, errorMessage: t('theLowerThresholdOfExperienceExceeds')}
    } else {
      return {isError: false, errorMessage: ''}
    }
  }

  const handleChange = () => {
    setErrorMessage('')
    setError(false)
    console.log('change')
  }


  const onSubmit: SubmitHandler<IFinters> = async (data) => {
    try {
      // await addVacancyApi(vacancyWithId)
      console.log(data)
      const validation = filterDataValidation(data)
      if (validation.isError) {
        setErrorMessage(validation.errorMessage)
        setError(validation.isError)
      }
      // add validation 
      // dispatch(addVacancy(vacancyWithId))
      // reset()
    } catch (error) {
    }
  }

  return (
    <div className={cls.FilterInterface}>
       <Form
          className={cls.form}
          onFinish={handleSubmit(onSubmit)}
          layout="horizontal"
        >
          <div className={cls.inputWrapper}>
            <label className={cls.label} htmlFor="city">{t('city')}</label>
            <Form.Item className={cls.formItem}>
              <Controller
                name="city"
                control={control}
                rules={{
                  maxLength: { value: 140, message: t('maxLength140') }
                }}
                render={({ field }) => <Input id='city' className={cls.input} {...field} />}
              />
              {errors.city && <span className={cls.error}>{errors.city.message}</span>}
            </Form.Item>
          </div>

          <div className={cls.inputWrapper}>
            <label className={cls.label} htmlFor="employment">{t('employment')}</label>
            <Form.Item className={cls.formItem}>
              <Controller
                name="employment"
                control={control}
                render={({ field }) => (
                  <Select id='employment' className={cls.input} {...field}>
                    <Select.Option value={'fourHoursPerDay'}>{t('fourHoursPerDay')}</Select.Option>
                    <Select.Option value={'notFullDay'}>{t('notFullDay')}</Select.Option>
                    <Select.Option value={'inTheEvenings'}>{t('InTheEvenings')}</Select.Option>
                    <Select.Option value={'onWeekends'}>{t('onWeekends')}</Select.Option>
                    <Select.Option value={'fullTime'}>{t('fullTime')}</Select.Option>
                  </Select>
                )}
              />
              {errors.employment && <span className={cls.error}>{errors.employment.message}</span>}
            </Form.Item>
          </div>

          <div className={cls.inputWrapper}>
            <label className={cls.label} htmlFor="experienceFrom">{t('workExperience')}</label>
            <div className={cls.wrapperForTwo}>
              <Form.Item className={cls.formItem}>
                <Controller
                    name="experienceFrom"
                    control={control}
                    render={({ field }) => (
                      <InputNumber id='experienceFrom' className={cls.input} addonBefore={t('from')} min={0} max={80} {...field} />
                    )}
                  />
                  {errors.experienceFrom && <span className={cls.error}>{errors.experienceFrom.message}</span>}
              </Form.Item>

              <Form.Item className={cls.formItem}>
                <Controller
                    name="experienceTo"
                    control={control}
                    render={({ field }) => (
                      <InputNumber id='experienceTo' className={cls.input} addonBefore={t('to')} min={0} max={80} {...field} />
                    )}
                  />
                  {errors.experienceTo && <span className={cls.error}>{errors.experienceTo.message}</span>}
              </Form.Item>
            </div>
          </div>


          <div className={cls.inputWrapper}>
            <label className={cls.label} htmlFor="salaryFrom">{t('salary')}</label>
            <div className={cls.wrapperForTwo}>
              <Form.Item className={cls.formItem}>
                <Controller
                    name="salaryFrom"
                    control={control}
                    render={({ field }) => (
                      <InputNumber id='salaryFrom' className={cls.input} addonBefore={t('from')} min={0} max={9999999} {...field} />
                    )}
                  />
                  {errors.salaryFrom && <span className={cls.error}>{errors.salaryFrom.message}</span>}
              </Form.Item>

              <Form.Item className={cls.formItem}>
                <Controller
                    name="salaryTo"
                    control={control}
                    render={({ field }) => (
                      <InputNumber id='salaryTo' className={cls.input} addonBefore={t('to')} min={0} max={9999999} {...field} />
                    )}
                  />
                  {errors.salaryTo && <span className={cls.error}>{errors.salaryTo.message}</span>}
              </Form.Item>
            </div>
          </div>

          <Button
              disabled={Boolean(isLoading || isError)}
              loading={Boolean(isLoading)}
              htmlType="submit"
              size='middle'
              type='primary'
              icon={<SearchOutlined  />}
            >
              {t('search')}
            </Button>
                      
          <p className={cls.error}>{errorMessage}</p>
        </Form>
    </div>
  );
};
