'use client'

import Avatar from '@/components/avatar'
import { cn } from '@/lib/cn'
import { Camera, Image as ImageIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Control, useController } from 'react-hook-form'

interface UploadImageProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  control: Control<any>
  imageType?: 'avatar' | 'image'
}

const UploadImage = ({ name, control, imageType = 'avatar', multiple, ...restProps }: UploadImageProps) => {
  const {
    field,
    formState: { isSubmitSuccessful }
  } = useController({ name, control })

  const [previewImage, setPreviewImage] = useState<string>('')
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files as FileList

    // Upload single image
    if (fileList.length > 0 && !multiple) {
      setPreviewImage(URL.createObjectURL(fileList[0]))
      field.onChange(fileList?.[0] as any)
    } else {
      // Upload multiple images
      const images: string[] = []

      for (let i = 0; i < fileList.length; i++) {
        images.push(URL.createObjectURL(fileList[i]))
      }

      setPreviewImages(images)
      field.onChange(Array.from(fileList))
    }
  }

  // Cleanup upload single image
  useEffect(() => {
    return () => {
      !!previewImage && URL.revokeObjectURL(previewImage)
    }
  }, [previewImage])

  useEffect(() => {
    return () => {
      if (previewImages.length > 0) {
        for (const image of previewImages) {
          URL.revokeObjectURL(image)
        }
      }
    }
  }, [previewImages])

  // Clear preview single image when form submitted
  useEffect(() => {
    if (!!previewImage && !multiple && isSubmitSuccessful) {
      URL.revokeObjectURL(previewImage)
      field.onChange(undefined)
      setPreviewImage('')
    }
  }, [isSubmitSuccessful, field, previewImage, multiple])

  // Clear preview multiple images when form submitted
  // useEffect(() => {
  //   if (previewImages.length > 0 && multiple && isSubmitSuccessful) {
  //     for (const image of previewImages) {
  //       URL.revokeObjectURL(image)
  //       field.onChange(undefined)
  //       setPreviewImages([])
  //     }
  //   }
  // }, [isSubmitSuccessful, field, previewImages, multiple])

  useEffect(() => {
    if (field.value instanceof File) {
      setPreviewImage(URL.createObjectURL(field.value))
    } else {
      setPreviewImage(field.value)
    }
  }, [field])

  if (imageType === 'avatar')
    return (
      <label className='relative flex w-24 h-24 rounded-full overflow-hidden cursor-pointer'>
        <input type='file' id={name} {...field} {...restProps} hidden onChange={handleImageChange} value='' />
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

  if (imageType === 'image') {
    return (
      <>
        <label className='relative flex flex-col gap-1 items-center justify-center w-full h-[170px] rounded-lg bg-gray-50 border border-gray-200 overflow-hidden cursor-pointer transition-colors duration-300 hover:border-primary-500'>
          <input
            type='file'
            id={name}
            {...field}
            {...restProps}
            hidden
            value=''
            onChange={handleImageChange}
            multiple={multiple}
          />
          <ImageIcon size={50} className='text-primary-500' />
          <p className='text-body-medium-600'>Drop your image here, or browse</p>
          <small className='text-body-small-400 text-gray-500'>Supports: JPG, JPEG, PNG</small>
        </label>
        {previewImage && !multiple && (
          <div className='flex items-center mt-3 w-full h-[500px] rounded-md overflow-hidden'>
            <Image src={previewImage} alt='' width={200} height={100} className='w-full h-full object-cover' />
          </div>
        )}

        {previewImages.length > 0 && multiple && (
          <div className='flex items-center gap-4 mt-3'>
            {previewImages.map((image, index) => {
              return (
                <figure
                  key={image || new Date().getTime() + index}
                  className='w-[100px] h-[100px] rounded-md overflow-hidden'
                >
                  <Image src={image} alt='' width={100} height={100} className='w-full h-full object-cover' />
                </figure>
              )
            })}
          </div>
        )}
      </>
    )
  }
}

export default UploadImage
