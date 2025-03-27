import Container from '@/shared/components/container'
import Actions from '@/shared/components/header/actions'
import DropdownCurrencies from '@/shared/components/header/dropdown-currencies'
import DropdownLanguages from '@/shared/components/header/dropdown-languages'
import SocialList from '@/shared/components/header/social-list'
import Logo from '@/shared/components/logo'
import Search from '@/shared/components/search'

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
          <Logo />
          <Search className='flex-1 xs:flex absolute top-full left-0 right-0 shadow-sm xs:relative xs:top-auto xs:left-auto xs:right-auto' />
          <Actions />
        </Container>
      </div>
    </div>
  )
}

export default HeaderMiddle
