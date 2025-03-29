'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import { cn } from '@/lib/cn'
import authService from '@/services/auth-service'
import { EmailVerificationPayload } from '@/types/auth'
import { ArrowRight } from '@phosphor-icons/react'
import { StatusCodes } from 'http-status-codes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const EmailVerificationForm = () => {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { handleSubmit, control, reset, watch } = useForm<any>({
    defaultValues: {
      otpCode1: '',
      otpCode2: '',
      otpCode3: '',
      otpCode4: '',
      otpCode5: '',
      otpCode6: ''
    }
    // resolver: zodResolver(emailVerificationSchema)
  })
  const inputRefs = useRef<HTMLInputElement[]>([])

  const emailAddress = searchParams.get('email') || ''

  const [otpCode1, otpCode2, otpCode3, otpCode4, otpCode5, otpCode6] = watch(
    Array(6)
      .fill('')
      .map((_, index) => `otpCode${index + 1}`)
  )

  const handleEmailVerificationSubmit = async (values: any) => {
    let data: string = ''
    for (const key in values) {
      data += values[key]
    }

    if (!data || data.length < 6) {
      setError('Invalid OTP code. Please try again.')
    } else {
      setError('')
      // Call api verify otp
      setIsLoading(true)
      try {
        const payload: EmailVerificationPayload = { otpCode: data }
        const res = await authService.verifyEmail(payload)

        if (res?.statusCode === StatusCodes.OK) {
          toast.success(res.message)
          reset()
          router.push('/auth?isVerified=true')
        }
      } catch (error: any) {
        setError(error?.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleAutoFocus = useCallback(() => {
    const otpValues = [otpCode1, otpCode2, otpCode3, otpCode4, otpCode5, otpCode6]

    otpValues.forEach((value, index) => {
      if (value && inputRefs.current[index + 1] && otpValues[index + 1] === '') {
        inputRefs.current[index + 1].focus()
      }
    })

    if (!otpValues[0] && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [otpCode1, otpCode2, otpCode3, otpCode4, otpCode5, otpCode6])

  const handleBackspace = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (index > 0) {
        if (inputRefs.current && !inputRefs.current[index].value && inputRefs.current[index - 1].value) {
          inputRefs.current[index - 1].focus()
        }
      }
    }
  }

  // Handle focus when add value & remove
  useEffect(() => {
    handleAutoFocus()
  }, [handleAutoFocus])

  return (
    <div className='flex flex-col gap-6 w-[424px] p-8 bg-white rounded-[4px] shadow-md'>
      <div className='flex flex-col gap-3 items-center'>
        <Image src='/images/email-icon.gif' alt='Email Verification Icon' priority width={60} height={90} />
        <h1 className='text-body-xl-600 text-gray-900'>Please check your email</h1>
        {!!emailAddress && (
          <p className='text-body-small-400 flex gap-1 text-gray-600'>
            We have sent a code to
            <Link href={`mailto:${emailAddress}`} className='font-semibold'>
              {emailAddress}
            </Link>
          </p>
        )}
      </div>

      <form method='POST' onSubmit={handleSubmit(handleEmailVerificationSubmit)}>
        <div className='flex items-center justify-between'>
          {Array(6)
            .fill('')
            .map((_, index) => (
              <Input
                disabled={isLoading}
                isOTP
                type='text'
                key={new Date().getTime() + index}
                name={`otpCode${index + 1}`}
                control={control}
                ref={(e: any) => (inputRefs.current[index] = e)}
                className='w-full h-full text-center'
                classNameInput='size-10 overflow-hidden'
                classNameWrapper='[&+&]:mt-0'
                errorMessage={error}
                max={9}
                min={0}
                step={1}
                maxLength={1}
                onKeyDown={(e) => handleBackspace(e, index)}
              />
            ))}
        </div>
        <p
          className={cn('text-danger-500 mt-1 min-h-5 transition-all duration-300 opacity-0 pointer-events-none', {
            'opacity-100 pointer-events-auto': !isLoading && !!error
          })}
        >
          {error}
        </p>

        <Button type='submit' size='medium' className='w-full mt-6' disabled={isLoading} isLoading={isLoading}>
          <span>Verify me</span>
          <ArrowRight size={20} />
        </Button>
      </form>
    </div>
  )
}

export default EmailVerificationForm
