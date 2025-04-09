'use client'

import { addBrand, editBrand } from '@/app/admin/products/brands/actions'
import Button from '@/components/button'
import Input from '@/components/input'
import TextArea from '@/components/text-area'
import { addBrandSchema } from '@/schemas/brand-schema'
import { AddBrandPayload, Brand, EditBrandPayload } from '@/types/brand'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface BrandFormProps {
  slug?: string
  brand?: Brand | any
}

const BrandForm = ({ slug, brand = {} }: BrandFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleSubmit, control, reset } = useForm<AddBrandPayload>({
    defaultValues: {
      name: '',
      description: ''
    },
    resolver: zodResolver(addBrandSchema)
  })

  const handleAddBrand = async (payload: AddBrandPayload) => {
    setIsLoading(true)
    try {
      const response = await addBrand(payload)
      if (response?.data?._id) {
        toast.success(response.message)
        reset({
          name: '',
          description: ''
        })
        router.push('/admin/products/brands')
      }
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditBrand = async (payload: EditBrandPayload) => {
    setIsLoading(true)
    try {
      const response = await editBrand(slug as string, payload)
      if (response?.data?._id) {
        toast.success(response.message)
        reset({
          name: '',
          description: ''
        })
        router.push('/admin/products/brands')
      }
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBrandFormSubmit = (values: AddBrandPayload | EditBrandPayload) => {
    const payload = { ...values }
    Object.keys(brand).length > 0 ? handleEditBrand(payload) : handleAddBrand(payload)
  }

  useEffect(() => {
    if (!Object.keys(brand as object).length) return
    reset({
      name: brand?.name || '',
      description: brand?.description || ''
    })
  }, [reset, brand])

  return (
    <form onSubmit={handleSubmit(handleBrandFormSubmit)}>
      <Input disabled={isLoading} name='name' control={control} label='Name' placeholder='Enter name of brand' />
      <Input
        disabled={isLoading}
        name='description'
        control={control}
        label='Description'
        placeholder='Enter description'
        renderProps={(props: any) => {
          return <TextArea {...props} rows={6} cols={50} />
        }}
      />

      <div className='flex items-center gap-2 mt-6'>
        <Button type='submit' size='medium' isLoading={isLoading} disabled={isLoading}>
          Save changes
        </Button>
      </div>
    </form>
  )
}

export default BrandForm
