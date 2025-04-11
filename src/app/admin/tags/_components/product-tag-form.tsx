'use client'

import { addProductTag, editProductTag } from '@/app/admin/tags/actions'
import Button from '@/components/button'
import Input from '@/components/input'
import TextArea from '@/components/text-area'
import { addProductTagSchema } from '@/schemas/product-tag-schema'
import { AddProductTagPayload, EditProductTagPayload, ProductTag } from '@/types/product-tag'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface ProductTagFormProps {
  slug?: string
  productTag?: ProductTag | any
}

const ProductTagForm = ({ slug, productTag = {} }: ProductTagFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleSubmit, control, reset } = useForm<AddProductTagPayload>({
    defaultValues: {
      name: '',
      description: ''
    },
    resolver: zodResolver(addProductTagSchema)
  })

  const handleAddProductTag = async (payload: AddProductTagPayload) => {
    setIsLoading(true)
    try {
      const response = await addProductTag(payload)
      if (response?.data?._id) {
        toast.success(response.message)
        reset({
          name: '',
          description: ''
        })
        router.push('/admin/tags')
      }
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditProductTag = async (payload: EditProductTagPayload) => {
    setIsLoading(true)
    try {
      const response = await editProductTag(slug as string, payload)
      if (response?.data?._id) {
        toast.success(response.message)
        reset({
          name: '',
          description: ''
        })
        router.push('/admin/tags')
      }
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProductTagFormSubmit = (values: AddProductTagPayload | EditProductTagPayload) => {
    const payload = { ...values }
    Object.keys(productTag).length > 0 ? handleEditProductTag(payload) : handleAddProductTag(payload)
  }

  useEffect(() => {
    if (!Object.keys(productTag).length) return
    reset({
      name: productTag?.name || '',
      description: productTag?.description || ''
    })
  }, [reset, productTag])

  return (
    <form onSubmit={handleSubmit(handleProductTagFormSubmit)}>
      <Input disabled={isLoading} name='name' control={control} label='Name' placeholder='Enter name of product tag' />
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

export default ProductTagForm
