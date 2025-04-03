import { cn } from '@/lib/cn'
import { User } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

interface AvatarProps {
  imageURL?: string
  alt?: string
  size?: number
  width?: number
  height?: number
  className?: string
  [key: string]: any
}

const Avatar = ({ imageURL, alt, size, width = 50, height = 50, className = '', ...restProps }: AvatarProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden aspect-square rounded-full',
        size && `size-[${size}px]`,
        className
      )}
    >
      {imageURL ? (
        <Image
          src={imageURL}
          alt={alt || ''}
          width={width}
          height={height}
          className='w-full h-full object-cover'
          {...restProps}
        />
      ) : (
        <User size={size} />
      )}
    </div>
  )
}

export default Avatar
