import { Phone } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';

export const ContectPhone = () => {
  const { t } = useTranslation();
  const ds = useRef("")
  useEffect(()=>{
    
  },[])
  return (
    <div className='flex-initial  flex gap-2 items-center'>
        <Phone className='w-5 text-primary' /> <span>+213770171795
          {t('fdf')}
        </span>
    </div>
  )
}
