'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import { Trash } from '@phosphor-icons/react'
import React, { forwardRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface AttributeItemProps {
  index?: number
  // eslint-disable-next-line no-unused-vars
  onRemove?: (index: number) => void
  // eslint-disable-next-line no-unused-vars
  onChange?: (data: { name: string; value: string }) => void
}

const AttributeItem = forwardRef<any, AttributeItemProps>(({ index, onRemove, onChange }) => {
  const { control } = useForm()
  const [data, setData] = useState<{ name: string; value: string }>({ name: '', value: '' })

  const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    // if (!!data.name && !!data.value) {
    onChange?.(data)
    // }
  }, [data])

  return (
    <div className='flex items-center gap-4 mt-3'>
      <Input
        name='name'
        control={control}
        label='Name'
        classNameWrapper='flex-1 [&+&]:mt-0'
        value={data.name}
        onChange={handleAttributeChange}
      />
      <Input
        name='value'
        value={data.value}
        control={control}
        label='Value'
        classNameWrapper='flex-1'
        onChange={handleAttributeChange}
      />
      <Button outlined='primary-light' className='min-w-fit w-11 h-11 p-0' onClick={() => onRemove?.(index || 0)}>
        <Trash size={16} />
      </Button>
    </div>
  )
})

export default AttributeItem
