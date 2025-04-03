import UserForm from '@/app/admin/users/_components/user-form'
import Card from '@/components/card'
import Container from '@/components/container'

const AddUserPage = () => {
  return (
    <>
      <Container className='py-14 flex justify-center'>
        <Card title='Add user' className='max-w-[500px] flex-1'>
          <UserForm />
        </Card>
      </Container>
    </>
  )
}

export default AddUserPage
