'use client'

import Avatar from '@/components/avatar'
import { cn } from '@/lib/cn'
import { Camera } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { Control, useController } from 'react-hook-form'

interface UploadImageProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  control: Control<any>
}

const UploadImage = ({ name, control, ...restProps }: UploadImageProps) => {
  const {
    field,
    formState: { isSubmitSuccessful }
  } = useController({ name, control })

  const [previewImage, setPreviewImage] = useState<string>('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files as FileList

    if (fileList?.length > 0) {
      setPreviewImage(URL.createObjectURL(fileList[0]))
      field.onChange(fileList?.[0] as any)
    }
  }

  useEffect(() => {
    return () => {
      !!previewImage && URL.revokeObjectURL(previewImage)
    }
  }, [previewImage])

  useEffect(() => {
    if (isSubmitSuccessful) {
      setPreviewImage('')
      !!previewImage && URL.revokeObjectURL(previewImage)
      field.onChange(undefined)
    }
  }, [isSubmitSuccessful, field, previewImage])

  useEffect(() => {
    if (field.value instanceof File) {
      setPreviewImage(URL.createObjectURL(field.value))
    } else {
      setPreviewImage(field.value)
    }
  }, [field])

  return (
    <label className='relative flex w-24 h-24 rounded-full overflow-hidden cursor-pointer'>
      <input type='file' {...field} {...restProps} hidden onChange={handleImageChange} value='' />
      {/* Customize avatar upload */}
      <Avatar
        imageURL={previewImage}
        alt='User Avatar'
        size={50}
        className={cn('bg-gray-100 w-full h-full object-cover')}
      />
      <div className='absolute left-0 top-0 w-full h-full flex items-center justify-center text-white bg-black opacity-0 transition-opacity duration-300 hover:opacity-80'>
        <Camera size={32} />
      </div>
    </label>
  )
}

export default UploadImage
