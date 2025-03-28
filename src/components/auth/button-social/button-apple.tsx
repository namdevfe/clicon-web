import Button from '@/components/button'
import Image from 'next/image'

interface ButtonAppleProps {
  type: 'signup' | 'signin'
}

const ButtonApple = ({ type = 'signin' }: ButtonAppleProps) => {
  return (
    <Button className='relative h-11 w-full bg-white text-sm tracking-normal font-normal text-gray-700 normal-case border border-gray-100 hover:bg-white hover:border-primary-500 hover:text-primary-500'>
      <Image
        className='absolute top-2/4 left-4 -translate-y-2/4'
        src='/images/icon-apple.svg'
        alt='Icon Apple'
        width={20}
        height={20}
      />
      <span>{type === 'signin' ? 'Sign in with Apple' : 'Sign up with Apple'}</span>
    </Button>
  )
}

export default ButtonApple
