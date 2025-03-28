'use client'
import { Coord } from '@/components/dropdown'
import { MutableRefObject, useEffect, useState } from 'react'

const useRectResize = (elementRef?: MutableRefObject<HTMLElement | null> | undefined) => {
  const [coord, setCoord] = useState<Coord>()

  useEffect(() => {
    const handleResize = () => {
      if (elementRef?.current) {
        const clientRect = elementRef.current.getBoundingClientRect()
        setCoord(clientRect)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [elementRef])

  // useEffect(() => {
  //   callback?.()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [JSON.stringify(deps), callback])

  return {
    coord,
    setCoord
  }
}

export default useRectResize
