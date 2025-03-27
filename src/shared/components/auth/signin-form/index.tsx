'use client'

import { loginSchema } from '@/schemas/auth-schema'
import authService from '@/services/auth-service'
import Button, { buttonVariants } from '@/shared/components/button'
import Input from '@/shared/components/input'
import { cn } from '@/shared/lib/cn'
import tokenMethod from '@/shared/lib/storage'
import { Login, LoginPayload } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const SignInForm = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    reset,
    setFocus,
    formState: { isSubmitSuccessful }
  } = useForm<LoginPayload>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  })

  const hanldeToggleShowPassword = () => {
    setIsShowPassword((prev) => !prev)
  }

  const handleLoginSubmit = async (value: LoginPayload) => {
    setIsLoading(true)
    try {
      const payload: LoginPayload = { ...value }

      const res = await authService.login(payload)

      if (res) {
        const token = res?.data as Login
        // Save token to localStorage
        tokenMethod.set(token)
        // Call api auth to set token on cookies
        await authService.auth(token)
        // Toast success
        toast.success(res.message)
        reset({ email: '', password: '' })
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrongs')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setFocus('email')
    }
  }, [isSubmitSuccessful, setFocus])

  return (
    <div className='w-full'>
      <h2 className='text-body-xl-600 text-center mb-5'>Sign in to your account</h2>
      <form method='post' onSubmit={handleSubmit(handleLoginSubmit)}>
        <Input disabled={isLoading} name='email' control={control} label='Email address' />

        <Input
          disabled={isLoading}
          name='password'
          control={control}
          isPassword
          type={isShowPassword ? 'text' : 'password'}
          label='Password'
          extraActions={
            <Link href='/forgot-password' className='text-body-small-500 text-secondary-500' tabIndex={-1}>
              Forgot password
            </Link>
          }
          onShowPassword={hanldeToggleShowPassword}
        />

        <Button disabled={isLoading} type='submit' size='medium' className='w-full mt-[34px] mb-6'>
          <span>Login</span>
          <ArrowRight size={20} weight='bold' />
        </Button>
      </form>

      {/* Create account */}
      <div>
        <p className='relative text-center text-gray-500 before:content-[""] before:absolute before:left-0 before:top-2/4 before:z-[11] before:-translate-y-2/4 before:block before:w-full before:h-[2px] before:bg-gray-100'>
          <span className='relative z-20 inline-block px-2 bg-white'>Don&apos;t have an account?</span>
        </p>

        <Link
          href='/sign-up'
          className={cn(buttonVariants({ outlined: 'primary-light', size: 'medium', className: 'w-full mt-3' }))}
        >
          Create account
        </Link>
      </div>
    </div>
  )
}

export default SignInForm
