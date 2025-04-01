'use client'

import { ButtonApple, ButtonGoogle } from '@/components/auth'
import Button, { buttonVariants } from '@/components/button'
import Input from '@/components/input'
import { cn } from '@/lib/cn'
import tokenMethod from '@/lib/storage'
import { loginSchema } from '@/schemas/auth-schema'
import authService from '@/services/auth-service'
import { useAppDispatch } from '@/store'
import { getProfile } from '@/store/reducers/authSlice'
import { Login, LoginPayload } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface SignInFormProps {
  type: 'page' | 'dropdown'
}

const SignInForm = ({ type = 'dropdown' }: SignInFormProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
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
        // Dispatch action getProfile on redux store
        const profileResponse = await dispatch(getProfile()).unwrap()
        if (!!profileResponse) {
          await authService.setProfileToNextServer(profileResponse)
          reset({ email: '', password: '' })
          router.push('/')
          toast.success(res.message)
        }
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
      {type === 'dropdown' && <h2 className='text-body-xl-600 text-center mb-5'>Sign in to your account</h2>}
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

        <Button
          disabled={isLoading}
          isLoading={isLoading}
          type='submit'
          size='medium'
          className='w-full mt-[34px] mb-6'
        >
          <span>Sign in</span>
          <ArrowRight size={20} weight='bold' />
        </Button>
      </form>

      {/* Create account */}
      <div>
        <p className='relative text-center text-gray-500 before:content-[""] before:absolute before:left-0 before:top-2/4 before:z-[11] before:-translate-y-2/4 before:block before:w-full before:h-[2px] before:bg-gray-100'>
          <span className='relative z-20 inline-block px-2 bg-white'>
            {/* eslint-disable-next-line quotes */}
            {type === 'dropdown' ? "Don't have an account?" : 'or'}
          </span>
        </p>

        {type === 'dropdown' && (
          <Link
            href='/auth'
            className={cn(buttonVariants({ outlined: 'primary-light', size: 'medium', className: 'w-full mt-3' }))}
          >
            Create account
          </Link>
        )}

        {type === 'page' && (
          <div className='mt-3 flex flex-col gap-3'>
            <ButtonGoogle type='signin' />
            <ButtonApple type='signin' />
          </div>
        )}
      </div>
    </div>
  )
}

export default SignInForm
