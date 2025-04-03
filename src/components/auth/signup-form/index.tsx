'use client'

import { registerSchema } from '@/schemas/auth-schema'
import authService from '@/services/auth-service'
import { ButtonApple, ButtonGoogle } from '@/components/auth'
import Button from '@/components/button'
import Checkbox from '@/components/checkbox'
import Input from '@/components/input'
import { RegisterPayload } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const { handleSubmit, control } = useForm<RegisterPayload>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAgree: false
    },
    resolver: zodResolver(registerSchema)
  })

  const handleRegisterSubmit = async (value: RegisterPayload) => {
    setIsLoading(true)

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { confirmPassword: _confirmPassword, isAgree: _isAgree, ...payload } = value

    try {
      const res = await authService.register(payload as RegisterPayload)

      // If you register account is successfully, system will send OTP your email address
      toast.success(res?.message)
      // In next step: change screen to verify OTP
      router.push(`/auth/email-verification?email=${payload.email}`)
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full'>
      <form method='post' onSubmit={handleSubmit(handleRegisterSubmit)}>
        <Input disabled={isLoading} name='firstName' control={control} label='First name' />
        <Input disabled={isLoading} name='lastName' control={control} label='Last name' />
        <Input disabled={isLoading} name='email' control={control} label='Email address' />

        <Input
          disabled={isLoading}
          name='password'
          control={control}
          isPassword
          label='Password'
          extraActions={
            <Link href='/forgot-password' className='text-body-small-500 text-secondary-500' tabIndex={-1}>
              Forgot password
            </Link>
          }
        />

        <Input disabled={isLoading} name='confirmPassword' control={control} isPassword label='Confirm password' />

        <Input
          name='isAgree'
          control={control}
          disabled={isLoading}
          renderProps={(props) => {
            return (
              <Checkbox
                labelCheckbox={<p>Are you agree to Clicon Terms of Condition and Privacy Policy.</p>}
                {...props}
              />
            )
          }}
        />

        <Button
          disabled={isLoading}
          isLoading={isLoading}
          type='submit'
          size='medium'
          className='w-full mt-[34px] mb-6'
        >
          <span>Sign up</span>
          <ArrowRight size={20} weight='bold' />
        </Button>
      </form>

      {/* Create account */}
      <div>
        <p className='relative text-center text-gray-500 before:content-[""] before:absolute before:left-0 before:top-2/4 before:z-[11] before:-translate-y-2/4 before:block before:w-full before:h-[2px] before:bg-gray-100'>
          <span className='relative z-20 inline-block px-2 bg-white'>or</span>
        </p>

        <div className='mt-3 flex flex-col gap-3'>
          <ButtonGoogle type='signup' />
          <ButtonApple type='signup' />
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
