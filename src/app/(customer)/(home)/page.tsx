'use client'

import Button from '@/components/button'
import { useAppDispatch, useAppSelector } from '@/store'
import { decrement, increment, incrementByAmount, selectCount } from '@/store/reducers/counterSlice'

const HomePage = () => {
  const value = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  return (
    <div className='mt-[500px]'>
      <h1>{value}</h1>

      <Button onClick={() => dispatch(increment())}>Increase</Button>
      <Button onClick={() => dispatch(decrement())}>Decrease</Button>
      <Button onClick={() => dispatch(incrementByAmount(10))}>Increase By Amount</Button>
    </div>
  )
}

export default HomePage
