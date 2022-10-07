import {
  MdOutlineEngineering,
  MdOutlineShoppingCart,
  MdOutlineSettings,
} from "react-icons/md";
import { VscTools } from "react-icons/vsc";
import { FaFileSignature } from "react-icons/fa";
import { TiArrowShuffle } from "react-icons/ti";
import { AiOutlineBuild } from "react-icons/ai";
import { RiBarChart2Line } from "react-icons/ri";
import { MdAttachMoney } from "react-icons/md";

const sidebarRoutes = [
  { title: "Inventory", route: "/inventory", icon: <AiOutlineBuild /> },
  { title: "Workers", route: "/workers", icon: <MdOutlineEngineering /> },
  { title: "Orders", route: "/orders", icon: <MdOutlineShoppingCart /> },
  { title: "Suppliers", route: "/suppliers", icon: <TiArrowShuffle /> },
  { title: "Tools", route: "/tools", icon: <VscTools /> },
  {
    title: "Sub-contracts",
    route: "/sub-contracts",
    icon: <FaFileSignature />,
  },
  {
    title: "Miscellaneous",
    route: "/miscellaneous",
    icon: <MdAttachMoney />,
  },
  {
    title: "Users",
    route: "/users",
    icon: <MdAttachMoney />,
  },
  { title: "Setting", route: "/setting", icon: <MdOutlineSettings /> },
  { title: "Accounting", route: "/Accounting", icon: <RiBarChart2Line /> },
];

export default sidebarRoutes;
