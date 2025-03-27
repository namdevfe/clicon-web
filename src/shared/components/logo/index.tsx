import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/' className='flex'>
      <Image src='/images/logo-white.svg' width={177} height={48} alt='Logo Clicon' priority />
    </Link>
  )
}

export default Logo
