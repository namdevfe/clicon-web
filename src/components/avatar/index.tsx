import { cn } from '@/lib/cn'
import Image from 'next/image'

interface AvatarProps {
  imageURL: string
  alt: string
  size?: number
  width?: number
  height?: number
  [key: string]: any
}

const Avatar = ({ imageURL, alt, size, width = 50, height = 50, ...restProps }: AvatarProps) => {
  return (
    <div className={cn('flex overflow-hidden aspect-square rounded-full', size && `size-[${size}px]`)}>
      <Image
        src={imageURL}
        alt={alt}
        width={width}
        height={height}
        className='w-full h-full object-cover'
        {...restProps}
      />
    </div>
  )
}

export default Avatar
