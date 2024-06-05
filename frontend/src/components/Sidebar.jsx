import { Logo } from "../reusables/Logo";
import { Avatar } from "../reusables/Avatar";
import { Logout } from "../pages/Logout";

export const Sidebar = ({ id }) => {
  return (
    <>
      <Logo />
      <Avatar id={id} />
      <Logout />

    </>
  )
}
