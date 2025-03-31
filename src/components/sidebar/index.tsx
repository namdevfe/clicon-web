import SidebarItem, { SidebarItemType } from '@/components/sidebar/sidebar-item'

interface SidebarProps {
  items: SidebarItemType[]
}

const Sidebar = ({ items = [] }: SidebarProps) => {
  return (
    <ul className='sidebar flex flex-col'>
      {items.map((item) => (
        <SidebarItem key={item.id} data={item} />
      ))}
    </ul>
  )
}

export default Sidebar
