import Button from '@/components/button'
import Container from '@/components/container'
import { ArrowLeft, House } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <main>
      <Container>
        <div className='flex flex-col items-center justify-center max-w-full xs:max-w-[536px] mx-auto'>
          <Image src='/images/error-notfound.png' alt='Error Oops 404' width={500} height={500} />
          <div className='flex flex-col items-center justify-center gap-6'>
            <h1 className='text-display5 text-gray-900'>404, Page not founds</h1>
            <p className='text-gray-700 text-body-medium-400 text-center'>
              Something went wrong. It&apos;s look that your requested could not be found. It&apos;s look like the link
              is broken or the page is removed.
            </p>
            <div className='flex flex-col xs:flex-row items-center gap-4 w-full xs:w-fit'>
              <Button className='w-full'>
                <ArrowLeft size={20} />
                <span>Go back</span>
              </Button>
              <Link href='/' className='w-full'>
                <Button outlined='primary-light' className='w-full'>
                  <House size={20} />
                  <span>Go to home</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default NotFoundPage
