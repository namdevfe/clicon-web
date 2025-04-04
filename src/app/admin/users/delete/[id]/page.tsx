import ButtonDelete from '@/app/admin/users/delete/[id]/_components/button-delete'
import Button from '@/components/button'
import Container from '@/components/container'
import Link from 'next/link'

const DeleteUserPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Container>
        <div className='flex flex-col items-center gap-3'>
          <h1>Are you sure want to delete user with id={params.id}</h1>
          <div className='flex items-center gap-3'>
            <Button outlined='primary-light' size='small'>
              <Link href='/admin/users'>Cancle</Link>
            </Button>
            <ButtonDelete id={params.id} />
          </div>
        </div>
      </Container>
    </>
  )
}

export default DeleteUserPage
