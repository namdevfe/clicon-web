import DropdownAccount from '@/shared/components/header/actions/dropdown-account'
import DropdownCart from '@/shared/components/header/actions/dropdown-cart'
import { Heart } from '@phosphor-icons/react/dist/ssr'

const Actions = () => {
  return (
    <div className='flex items-center text-white'>
      <DropdownCart />
      <button className='px-1 xs:px-3'>
        <Heart size={32} />
      </button>
      <DropdownAccount />
    </div>
  )
}

export default Actions
