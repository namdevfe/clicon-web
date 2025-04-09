'use client'

import { addProductCategory } from '@/app/admin/products/categories/actions'
import Button from '@/components/button'
import Input from '@/components/input'
import TextArea from '@/components/text-area'
import { addProductCategorySchema } from '@/schemas/product-category-schema'
import { AddProductCategoryPayload } from '@/types/product-category'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const ProductCategoryForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleSubmit, control, reset } = useForm<AddProductCategoryPayload>({
    defaultValues: {
      name: '',
      description: ''
    },
    resolver: zodResolver(addProductCategorySchema)
  })

  const handleAddProductCategory = async (payload: AddProductCategoryPayload) => {
    setIsLoading(true)
    try {
      const response = await addProductCategory(payload)
      if (response?.data?._id) {
        toast.success(response.message)
        reset({
          name: '',
          description: ''
        })
        router.push('/admin/products/categories')
      }
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProductCategoryFormSubmit = (values: AddProductCategoryPayload) => {
    const payload = { ...values }
    handleAddProductCategory(payload)
  }

  return (
    <form onSubmit={handleSubmit(handleProductCategoryFormSubmit)}>
      <Input
        disabled={isLoading}
        name='name'
        control={control}
        label='Name'
        placeholder='Enter name of product category'
      />
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

export default ProductCategoryForm
