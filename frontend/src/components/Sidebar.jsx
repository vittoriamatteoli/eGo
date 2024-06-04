import { Logo } from "../reusables/Logo";
import { Avatar } from "../reusables/Avatar";
import { Logout } from "../pages/Logout";
import { useParams } from "react-router-dom";

export const Sidebar = ({ id }) => {
  return (
    <>
      <Logo />
      <Avatar id={id} />
      <p>Username</p>
      <Logout />
    </>
  );
};
