import HeaderBottom from '@/shared/components/header/header-bottom'
import HeaderMiddle from '@/shared/components/header/header-middle'
import HeaderTop from '@/shared/components/header/header-top'

const Header = () => {
  return (
    <header className='fixed top-0 left-0 w-full'>
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom />
    </header>
  )
}

export default Header
