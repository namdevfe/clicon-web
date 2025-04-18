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
import { Plus, Trash } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface ProductAttribute {
  attributeName: string
  attributeValue: string
}

const ProductForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [brands, setBrands] = useState<Brand[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [tags, setTags] = useState<ProductTag[]>([])
  const methods = useForm<AddProductPayload>({
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
  const [attributes, setAttributes] = useState<ProductAttribute[]>([])

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

  // Handle add attribute
  const handleAddAttributeItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    setAttributes([...attributes, { attributeName: '', attributeValue: '' }])
  }

  // Handle attribute item change
  const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target
    const valueChange: any[] = [...attributes]
    valueChange[index][name] = value
    setAttributes(valueChange)
  }

  // Handle remove attribute item
  const handleRemoveAttributeItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, currentIndex: number) => {
    setAttributes((prev) => prev.filter((_, index) => index !== currentIndex))
  }

  const handleProductFormSubmit = async (values: AddProductPayload) => {
    const payload = { ...values }
    setIsLoading(true)

    // If has attributes
    if (attributes.length > 0) {
      payload.attributes = attributes.map((attribute) => ({
        name: attribute.attributeName,
        value: attribute.attributeValue
      }))
    }

    // If have image cover
    if (payload.imageCover instanceof File) {
      const image = await uploadFile(payload.imageCover)
      payload.imageCover = image
    }

    // If has images
    if (payload.images.length > 0) {
      const images = await uploadMultipleFiles(payload.images)
      payload.images = images
    }

    try {
      const response = await addProduct(payload)
      if (response?.data) {
        toast.success(response.message)
        methods.reset()
        setAttributes([])
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleProductFormSubmit)}>
          <Input name='name' control={methods.control} label='Name' disabled={isLoading} />
          <Input
            disabled={isLoading}
            name='description'
            control={methods.control}
            label='Description'
            renderProps={(props: any) => {
              return <TextArea {...props} />
            }}
          />
          <Input
            disabled={isLoading}
            name='imageCover'
            control={methods.control}
            label='Image Cover'
            renderProps={(props) => {
              return <UploadImage {...props} imageType='image' />
            }}
          />
          <Input
            disabled={isLoading}
            name='images'
            control={methods.control}
            label='Images'
            renderProps={(props) => {
              return <UploadImage {...props} imageType='image' multiple={true} />
            }}
          />
          <Input disabled={isLoading} label='Price' name='price' type='number' control={methods.control} />
          <Input disabled={isLoading} label='Old Price' name='oldPrice' type='number' control={methods.control} />
          <Input disabled={isLoading} label='Quantity' name='quantity' type='number' control={methods.control} />
          <Input disabled={isLoading} label='Stock' name='stock' type='number' control={methods.control} />
          <Input
            disabled={isLoading}
            label='Category'
            name='category'
            control={methods.control}
            renderProps={(props: any) => {
              return <Select {...props} options={categoryOptions || []} />
            }}
          />
          <Input
            disabled={isLoading}
            label='Brand'
            name='brand'
            control={methods.control}
            renderProps={(props: any) => {
              return <Select {...props} options={brandOptions || []} />
            }}
          />
          <Input
            disabled={isLoading}
            label='Tags'
            name='tags'
            control={methods.control}
            renderProps={(props: any) => {
              return <Select mode='multiple' {...props} options={tagOptions || []} />
            }}
          />

          {/* Attributes */}
          <div>
            <div className='flex items-center justify-between'>
              <h3 className='text-body-xl-600'>Attributes</h3>
              <Button outlined='primary-dark' size='small' disabled={isLoading} onClick={handleAddAttributeItem}>
                <Plus size={16} />
                <span>Add attribute</span>
              </Button>
            </div>
            {attributes.length > 0 &&
              attributes.map(({ attributeName, attributeValue }, index) => {
                return (
                  <div key={`attribute-${index}`} className='flex items-center gap-4 mt-3'>
                    <Input
                      disabled={isLoading}
                      name='attributeName'
                      control={methods.control}
                      label='Name'
                      classNameWrapper='flex-1 [&+&]:mt-0'
                      value={attributeName}
                      onChange={(e) => handleAttributeChange(e, index)}
                    />
                    <Input
                      disabled={isLoading}
                      name='attributeValue'
                      control={methods.control}
                      label='Value'
                      classNameWrapper='flex-1'
                      value={attributeValue}
                      onChange={(e) => handleAttributeChange(e, index)}
                    />
                    <Button
                      disabled={isLoading}
                      isLoading={isLoading}
                      outlined='primary-light'
                      className='min-w-fit w-11 h-11 p-0'
                      onClick={(e) => handleRemoveAttributeItem(e, index)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                )
              })}
          </div>

          <div className='flex items-center gap-2 mt-6'>
            <Button type='submit' size='medium' isLoading={isLoading} disabled={isLoading}>
              Save changes
            </Button>
          </div>
        </form>
      </FormProvider>
    </Card>
  )
}

export default ProductForm
