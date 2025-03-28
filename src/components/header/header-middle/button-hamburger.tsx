'use client'
import { useAppDispatch } from '@/store'
import { handleShowNavMobile } from '@/store/reducers/appSlice'
import { List } from '@phosphor-icons/react'

const ButtonHamburger = () => {
  const dispatch = useAppDispatch()

  return (
    <button className='flex text-white xs:hidden' onClick={() => dispatch(handleShowNavMobile())}>
      <List size={32} />
    </button>
  )
}

export default ButtonHamburger
