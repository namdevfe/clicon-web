'use client'

import { addProduct, getAllBrands, getALlCategories, getAllTags } from '@/app/admin/products/actions'
import Button from '@/components/button'
import Card from '@/components/card'
import Input from '@/components/input'
import Select, { SelectOption } from '@/components/select'
import TextArea from '@/components/text-area'
import UploadImage from '@/components/upload-image'
import { uploadFile, uploadMultipleFiles } from '@/lib/upload'
import { addProductSchema } from '@/schemas/product-schema'
import { Brand } from '@/types/brand'
import { AddProductPayload } from '@/types/product'
import { ProductCategory } from '@/types/product-category'
import { ProductTag } from '@/types/product-tag'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const ProductForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [brands, setBrands] = useState<Brand[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [tags, setTags] = useState<ProductTag[]>([])
  const { handleSubmit, control } = useForm<AddProductPayload>({
    defaultValues: {
      name: '',
      description: '',
      imageCover: '',
      images: [],
      price: 0,
      oldPrice: 0,
      quantity: 0,
      specification: '',
      stock: 0,
      category: '',
      brand: '',
      tags: []
    },
    resolver: zodResolver(addProductSchema)
  })

  const brandOptions: SelectOption[] = brands.map((brand) => ({
    label: brand.name,
    value: brand._id
  }))

  const categoryOptions: SelectOption[] = categories.map((category) => ({
    label: category.name,
    value: category._id
  }))

  const tagOptions: SelectOption[] = tags.map((tag) => ({
    label: tag.name,
    value: tag._id
  }))

  const handleProductFormSubmit = async (values: AddProductPayload) => {
    setIsLoading(true)
    if (values.imageCover instanceof File) {
      const image = await uploadFile(values.imageCover)
      values.imageCover = image
    }

    if (values.images.length > 0) {
      const images = await uploadMultipleFiles(values.images)
      values.images = images
    }

    try {
      const response = await addProduct(values)
      if (response?.data) {
        toast.success(response.message)
        router.push('/admin/products')
      }
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const response = await getAllBrands()
        if (response?.data && response.data.length > 0) {
          setBrands(response.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const response = await getALlCategories()
        if (response?.data && response.data.length > 0) {
          setCategories(response.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const response = await getAllTags()
        if (response?.data && response.data.length > 0) {
          setTags(response.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <Card title='Add product' className='mt-4'>
      <form onSubmit={handleSubmit(handleProductFormSubmit)}>
        <Input name='name' control={control} label='Name' disabled={isLoading} />
        <Input
          disabled={isLoading}
          name='description'
          control={control}
          label='Description'
          renderProps={(props: any) => {
            return <TextArea {...props} />
          }}
        />
        <Input
          disabled={isLoading}
          name='imageCover'
          control={control}
          label='Image Cover'
          renderProps={(props) => {
            return <UploadImage {...props} imageType='image' />
          }}
        />
        <Input
          disabled={isLoading}
          name='images'
          control={control}
          label='Images'
          renderProps={(props) => {
            return <UploadImage {...props} imageType='image' multiple={true} />
          }}
        />
        <Input disabled={isLoading} label='Price' name='price' type='number' control={control} />
        <Input disabled={isLoading} label='Old Price' name='oldPrice' type='number' control={control} />
        <Input disabled={isLoading} label='Quantity' name='quantity' type='number' control={control} />
        <Input disabled={isLoading} label='Stock' name='stock' type='number' control={control} />
        <Input
          disabled={isLoading}
          label='Category'
          name='category'
          control={control}
          renderProps={(props: any) => {
            return <Select {...props} options={categoryOptions || []} />
          }}
        />
        <Input
          disabled={isLoading}
          label='Brand'
          name='brand'
          control={control}
          renderProps={(props: any) => {
            return <Select {...props} options={brandOptions || []} />
          }}
        />
        <Input
          disabled={isLoading}
          label='Tags'
          name='tags'
          control={control}
          renderProps={(props: any) => {
            return <Select mode='multiple' {...props} options={tagOptions || []} />
          }}
        />

        <div className='flex items-center gap-2 mt-6'>
          <Button type='submit' size='medium' isLoading={isLoading} disabled={isLoading}>
            Save changes
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default ProductForm
