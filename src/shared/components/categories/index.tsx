'use client'

import Banner from '@/shared/components/banner'
import Button, { buttonVariants } from '@/shared/components/button'
import Dropdown, { Coord } from '@/shared/components/dropdown'
import { ProductList } from '@/shared/components/product'
import { cn } from '@/shared/lib/cn'
import { ArrowRight, CaretDown, CaretRight } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, MouseEvent, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type CategoryItem = {
  title: string
  items?: CategoryItem[]
}

const CATEGORIES: CategoryItem[] = [
  {
    title: 'Computer & Laptop'
  },
  {
    title: 'Computer Accessories'
  },
  {
    title: 'SmartPhone',
    items: [
      {
        title: 'All'
      },
      {
        title: 'iPhone'
      },
      {
        title: 'Samsung'
      },
      {
        title: 'Realme'
      },
      {
        title: 'Xiaomi'
      },
      {
        title: 'Oppo'
      },
      {
        title: 'Vivo'
      },
      {
        title: 'OnePlus'
      },
      {
        title: 'Huawei'
      },
      {
        title: 'Infinix'
      },
      {
        title: 'Tecno'
      }
    ]
  },
  {
    title: 'Headphone'
  },
  {
    title: 'Mobile Accessories'
  },
  {
    title: 'Gaming Console'
  },
  {
    title: 'Camera & Photo'
  },
  {
    title: 'TV & Homes Appliances'
  },
  {
    title: 'Watchs & Accessories'
  },
  {
    title: 'GPS & Navigation'
  },
  {
    title: 'Warable Technology'
  }
]

const PRODUCT_ITEMS: { id: string; name: string; price: number; oldPrice?: number; imageURL: string }[] = [
  {
    id: 'product-1',
    name: 'Samsung Electronics Samsung Galexy S21 5G',
    price: 160,
    imageURL: '/images/product-img.jpg'
  },
  {
    id: 'product-2',
    name: 'Simple Mobile 5G LTE Galexy 12 Mini 512GB Gaming Phone',
    price: 1500,
    imageURL: '/images/product-img.jpg'
  },
  {
    id: 'product-3',
    name: 'Sony DSCHX8 High Zoom Point & Shoot Camera',
    price: 2300,
    oldPrice: 3200,
    imageURL: '/images/product-img.jpg'
  }
]

const Categories = () => {
  const [isShowCategories, setIsShowCategories] = useState<boolean>(false)
  const [hoveredCate, setHoveredCate] = useState<CategoryItem>()
  const [coord, setCoord] = useState<Coord | undefined>()
  const categoryListRef = useRef<HTMLUListElement | null>(null)
  const isActive = CATEGORIES.some((cate) => cate.title === hoveredCate?.title)

  // Handle hover active is setCoord for subCate
  useEffect(() => {
    if (categoryListRef.current && isActive) {
      setCoord(categoryListRef.current.getBoundingClientRect())
    }
  }, [isActive])

  useEffect(() => {
    const handleResize = () => {
      if (categoryListRef.current) {
        const clientRect = categoryListRef.current.getBoundingClientRect()
        setCoord(clientRect)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleToggleCategories = () => {
    setIsShowCategories((prev) => !prev)
  }

  const handleCloseCategories = () => {
    setIsShowCategories(false)
  }

  const handleHoverCateChange = (_: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, item: CategoryItem) => {
    setHoveredCate(item)
  }

  return (
    <Dropdown isOpen={isShowCategories} onTrigger={handleToggleCategories} onClose={handleCloseCategories}>
      <Dropdown.Trigger>
        <Button
          className={cn(
            'bg-gray-50 text-gray-900 text-body-small-500 capitalize hover:bg-primary-500 hover:text-white',
            {
              'bg-primary-500 !text-white text-body-small-500': isShowCategories
            }
          )}
        >
          All categories
          <CaretDown
            size={16}
            weight='bold'
            className={cn('transition-transform duration-300', {
              'rotate-180': isShowCategories
            })}
          />
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Content className='min-w-60'>
        <ul ref={categoryListRef} className='relative h-[50vh]  py-3 overflow-y-scroll'>
          {CATEGORIES.map((category, index) => (
            <Fragment key={new Date().getTime() + index}>
              <li>
                <Link
                  href='#'
                  className={cn(
                    'flex items-center justify-between w-full py-2 pl-4 pr-5 text-gray-600 capitalize transition-colors duration-300 hover:bg-gray-50 hover:text-gray-900',
                    {
                      'bg-gray-50 text-gray-900': hoveredCate?.title === category.title
                    }
                  )}
                  onMouseEnter={(e) => handleHoverCateChange(e, category)}
                >
                  <span>{category.title}</span>
                  {category.items && <CaretRight size={12} weight='bold' />}
                </Link>
              </li>

              {/* Sub category */}
              {hoveredCate?.title === category.title &&
                (category.items as [])?.length > 0 &&
                createPortal(
                  <div
                    style={{
                      top: Number(coord?.y) || 0,
                      left: Number(coord?.x) + Number(coord?.width) + 8 || 0
                    }}
                    className='absolute p-5 flex gap-5 bg-white w-[868px] rounded-[3px] shadow-md'
                  >
                    <ul className='w-[164px]'>
                      {category.items?.map((subCate, index) => {
                        return (
                          <li key={new Date().getTime() + index}>
                            <Link
                              href='#'
                              className={cn(
                                'flex items-center justify-between w-full py-2 pl-4 pr-5 text-gray-600 capitalize transition-colors duration-300 hover:bg-gray-50 hover:text-gray-900 rounded-[3px]'
                              )}
                            >
                              <span>{subCate.title}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>

                    <div className='w-full grid grid-cols-2 items-stretch gap-5'>
                      <div className='w-full'>
                        <ProductList title='Featured Phone' items={PRODUCT_ITEMS} />
                      </div>
                      <div className='w-full'>
                        <Banner className='bg-warning-200'>
                          <div className='flex flex-col gap-3'>
                            <Image
                              className='mx-auto'
                              src='/images/banner-03.png'
                              alt='Banner'
                              priority
                              width={248}
                              height={96}
                            />
                            <div className='text-center'>
                              <h2 className='mb-2 text-heading2 text-gray-900'>21% Discount</h2>
                              <p className='mb-4 text-body-medium-400 text-gray-700'>
                                Escape the noise, It’s time to hear the magic with Xiaomi Earbuds.
                              </p>
                              <div className='flex items-center justify-center gap-2'>
                                <span className='text-body-small-400 text-gray-700'>Starting price:</span>
                                <span className='text-body-medium-600 text-gray-900 py-[6px] px-3 rounded-[3px] bg-white'>
                                  $99 USD
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='w-full'>
                            <Link
                              href='/products'
                              className={buttonVariants({ variant: 'primary', size: 'medium', className: 'w-full' })}
                            >
                              <span>Shop now</span>
                              <ArrowRight size={20} />
                            </Link>
                          </div>
                        </Banner>
                      </div>
                    </div>
                  </div>,
                  document.body
                )}
            </Fragment>
          ))}
        </ul>
      </Dropdown.Content>
    </Dropdown>
  )
}

export default Categories
