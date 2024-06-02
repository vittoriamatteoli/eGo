import { Logo } from "../reusables/Logo"
import { Avatar } from "../reusables/Avatar"
import { Logout } from "../pages/Logout"
export const Sidebar = () => {
  return (
    <>
      <Logo />
      <Avatar />
      <p>Username</p>
      <Logout />
    </>
  )
}
