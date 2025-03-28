import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  data: any
}

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <figure className='flex items-center gap-3 w-full p-3 rounded-[3px] bg-white border border-gray-100'>
      <Link href='#product-demo' className='flex flex-shrink-0 size-20 overflow-hidden'>
        <Image
          className='w-full h-full object-cover'
          src={data?.imageURL}
          alt='Product Demo'
          width={100}
          height={100}
          priority
        />
      </Link>

      <div className='w-full'>
        <h3 className='mb-2 max-h-10 truncate line-clamp-2 text-wrap transition-colors duration-300 hover:text-primary-500'>
          <Link href='#product-demo'>{data?.name}</Link>
        </h3>
        <p className='flex gap-1'>
          {data?.oldPrice && <span className='text-gray-400 line-through'>${data?.oldPrice}</span>}
          <span className='text-body-small-600 text-secondary-500'>${data?.price}</span>
        </p>
      </div>
    </figure>
  )
}

export default ProductCard
