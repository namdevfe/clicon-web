'use client'

import { SignInForm, SignUpForm } from '@/components/auth'
import Tabs from '@/components/tabs'
import { useSearchParams } from 'next/navigation'

const TabsAuth = () => {
  const searchParams = useSearchParams()
  const isVerified = searchParams.get('isVerified') || ''

  return (
    <Tabs defaultValue={isVerified ? 'sign-in' : 'sign-up'} className='w-[424px] bg-white shadow-md rounded'>
      <Tabs.List>
        <Tabs.Trigger value='sign-in' className='py-4 text-gray-600 text-xl font-semibold tracking-tighter capitalize'>
          Sign in
        </Tabs.Trigger>
        <Tabs.Trigger value='sign-up' className='py-4 text-gray-600 text-xl font-semibold tracking-tighter capitalize'>
          Sign up
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value='sign-in' className='border-t border-gray-100 pt-6 px-8 pb-8'>
        <SignInForm type='page' />
      </Tabs.Content>
      <Tabs.Content value='sign-up' className='border-t border-gray-100 pt-6 px-8 pb-8'>
        <SignUpForm />
      </Tabs.Content>
    </Tabs>
  )
}

export default TabsAuth
