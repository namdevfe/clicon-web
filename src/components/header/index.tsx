import HeaderBottom from '@/components/header/header-bottom'
import HeaderMiddle from '@/components/header/header-middle'
import HeaderTop from '@/components/header/header-top'

const Header = () => {
  return (
    <header className='fixed top-0 left-0 z-[100] w-full'>
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom />
    </header>
  )
}

export default Header
