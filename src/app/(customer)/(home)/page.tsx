'use client'

import dynamic from 'next/dynamic'
const ModalConfirm = dynamic(() => import('@/components/modal-confirm'), { ssr: false })

const HomePage = () => {
  return (
    <main>
      <ModalConfirm
        title='Delete users?'
        description='Are you sure you want to delete this user. You cannot undo this action.'
        isOpen={true}
      />
    </main>
  )
}

export default HomePage
