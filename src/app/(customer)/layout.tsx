interface PublicLayoutProps {
  children: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return <div className='pt-[220px]'>{children}</div>
}

export default PublicLayout
