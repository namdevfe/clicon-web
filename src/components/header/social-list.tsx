import {
  FacebookLogo,
  InstagramLogo,
  PinterestLogo,
  RedditLogo,
  TwitterLogo,
  YoutubeLogo
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

const SOCIAL_ITEMS: { icon: React.ReactNode }[] = [
  {
    icon: <TwitterLogo size={16} weight='fill' />
  },
  {
    icon: <FacebookLogo size={16} weight='fill' />
  },
  {
    icon: <PinterestLogo size={16} weight='fill' />
  },
  {
    icon: <RedditLogo size={16} weight='fill' />
  },
  {
    icon: <YoutubeLogo size={16} weight='fill' />
  },
  {
    icon: <InstagramLogo size={16} />
  }
]

const SocialList = () => {
  return (
    <div className='flex items-center pr-2 text-white'>
      <h5 className='text-body-small-400 pr-[6px]'>Follows:</h5>
      <ul className='flex items-center'>
        {SOCIAL_ITEMS.map(({ icon }, index) => (
          <li key={new Date().getTime() + index}>
            <Link href='/' className='flex px-[6px]'>
              {icon}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SocialList
