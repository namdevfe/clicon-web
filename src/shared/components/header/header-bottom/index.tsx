import Categories from '@/shared/components/categories'
import Container from '@/shared/components/container'
import { ArrowsCounterClockwise, Headphones, Info, MapPinLine, PhoneCall } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

const MENU_ITEMS: { icon: React.ReactNode; title: string; href: string }[] = [
  {
    icon: <MapPinLine size={24} />,
    title: 'Track order',
    href: '/track-order'
  },
  {
    icon: <ArrowsCounterClockwise size={24} />,
    title: 'Compare',
    href: '/compare'
  },
  {
    icon: <Headphones size={24} />,
    title: 'Customer Support',
    href: '/support'
  },
  {
    icon: <Info size={24} />,
    title: 'Need Help',
    href: '/help'
  }
]

const HeaderBottom = () => {
  return (
    <nav className='h-20 py-4 bg-white border-b border-gray-50'>
      <Container className='flex items-center justify-between h-full'>
        <div className='flex items-center gap-3'>
          <Categories />
          <ul className='flex items-center'>
            {MENU_ITEMS.map((menuItem, index) => (
              <li key={new Date().getTime() + index}>
                <Link href={menuItem.href} className='flex items-center gap-[6px] px-3 text-gray-600 capitalize'>
                  <span className='flex-shrink-0'>{menuItem.icon}</span>
                  <span>{menuItem.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link href='tel:+12025550104' className='flex items-center gap-2 text-gray-900 text-body-large-400'>
          <PhoneCall size={28} />
          <span>+1-202-555-0104</span>
        </Link>
      </Container>
    </nav>
  )
}

export default HeaderBottom
