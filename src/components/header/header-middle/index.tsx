import Container from '@/components/container'
import Actions from '@/components/header/actions'
import DropdownCurrencies from '@/components/header/dropdown-currencies'
import DropdownLanguages from '@/components/header/dropdown-languages'
import ButtonHamburger from '@/components/header/header-middle/button-hamburger'
import SocialList from '@/components/header/social-list'
import Logo from '@/components/logo'
import Search from '@/components/search'

const HeaderMiddle = () => {
  return (
    <div className='bg-secondary-700'>
      {/* Header middle top */}
      <div className='h-[52px] w-full'>
        <Container className='flex items-center flex-col xs:flex-row justify-between h-full'>
          <p className='text-white'>Welcome to Clicon online eCommerce store. </p>

          <div className='flex items-center'>
            <SocialList />

            <div className='flex items-center pl-3 gap-6'>
              <DropdownLanguages />
              <DropdownCurrencies />
            </div>
          </div>
        </Container>
      </div>

      {/* Header middle bottom */}
      <div className='h-[89px] w-full border-t border-gray-500'>
        <Container className='relative flex items-center justify-between gap-2 h-full'>
          <div className='flex items-center gap-3'>
            <ButtonHamburger />
            <Logo />
          </div>
          <Search className='flex-1 xs:flex absolute top-full left-0 right-0 shadow-sm xs:relative xs:top-auto xs:left-auto xs:right-auto' />
          <Actions />
        </Container>
      </div>
    </div>
  )
}

export default HeaderMiddle
