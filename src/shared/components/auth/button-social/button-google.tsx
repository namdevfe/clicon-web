import Button from '@/shared/components/button'
import Image from 'next/image'

interface ButtonGoogleProps {
  type: 'signup' | 'signin'
}

const ButtonGoogle = ({ type = 'signin' }: ButtonGoogleProps) => {
  return (
    <Button className='relative h-11 w-full bg-white text-sm tracking-normal font-normal text-gray-700 normal-case border border-gray-100 hover:bg-white hover:border-primary-500 hover:text-primary-500'>
      <Image
        className='absolute top-2/4 left-4 -translate-y-2/4'
        src='/images/icon-google.svg'
        alt='Icon Google'
        width={20}
        height={20}
      />
      <span>{type === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}</span>
    </Button>
  )
}

export default ButtonGoogle
