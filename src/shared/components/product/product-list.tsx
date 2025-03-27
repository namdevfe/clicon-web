import ProductCard from '@/shared/components/product/product-card'

interface ProductListProps {
  title: string
  items?: any[]
}

const ProductList = ({ title = '', items = [] }: ProductListProps) => {
  return (
    <div>
      {!!title && <h3 className='mb-4 text-body-medium-600 text-gray-900 uppercase'>{title}</h3>}

      {/* List */}
      <div className='flex flex-col gap-4'>
        {items.length > 0 &&
          items.map((item, index) => <ProductCard key={item?.id || new Date().getTime() + index} data={item} />)}
      </div>
    </div>
  )
}

export default ProductList
