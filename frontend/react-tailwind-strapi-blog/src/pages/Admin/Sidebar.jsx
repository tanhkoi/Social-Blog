import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logo } from "../../assets";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillGearFill,
} from "react-icons/bs";
import { MdReport } from "react-icons/md";

const menuItems = [
  { path: "/admin", label: "Dashboard", icon: <BsGrid1X2Fill className="text-xl mr-2" /> },
  { path: "/admin/products", label: "Blogs", icon: <BsFillArchiveFill className="text-xl mr-2" /> },
  { path: "/admin/categories", label: "Categories", icon: <BsFillGrid3X3GapFill className="text-xl mr-2" /> },
  { path: "/admin/customers", label: "Customers", icon: <BsPeopleFill className="text-xl mr-2" /> },
  { path: "/admin/report-items", label: "Report", icon: <MdReport className="text-xl mr-2" /> },
  { path: "/admin/settings", label: "Settings", icon: <BsFillGearFill className="text-xl mr-2" /> },
];

const Sidebar = forwardRef(({ openSidebarToggle, OpenSidebar }, ref) => {
  return (
    <aside
      ref={ref}
      id="sidebar"
      className={`absolute top-0 left-0 ${openSidebarToggle ? "w-[250px]" : "w-0"
        } h-full bg-[#263043] overflow-y-auto transition-all ease duration-500 z-10`}
    >
      <div className="flex justify-between items-center p-[15px_30px]">
        <div className="mt-[15px]">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className={`opacity-55 w-full h-[25px] cursor-pointer ${openSidebarToggle ? "ml-10" : "ml-3"
                }`}
            />
          </Link>
        </div>
        <span
          className="text-red-500 ml-[30px] mt-[10px] cursor-pointer text-2xl"
          onClick={OpenSidebar}
        >
          ×
        </span>
      </div>

      <ul className="p-0 list-none">
        {menuItems.map((item, index) => (
          <li key={index} className="p-[20px] text-lg">
            <Link to={item.path} className="text-[#9e9ea4] flex items-center no-underline">
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
});

Sidebar.propTypes = {
  openSidebarToggle: PropTypes.bool.isRequired,
  OpenSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
