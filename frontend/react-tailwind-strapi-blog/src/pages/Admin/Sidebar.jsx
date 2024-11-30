import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logo } from "../../assets";
import { 
  BsGrid1X2Fill, 
  BsFillArchiveFill, 
  BsFillGrid3X3GapFill, 
  BsPeopleFill, 
  BsFillGearFill 
} from 'react-icons/bs';

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside 
      id="sidebar"
      className={`fixed top-0 left-0 ${openSidebarToggle ? 'w-[250px]' : 'w-0'} h-full bg-[#263043] overflow-y-auto transition-all ease duration-500 z-10`}
    >
      <div className="flex justify-between items-center p-[15px_30px]">
        <div className="mt-[15px]">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className={`opacity-55 w-full h-[25px] ml-${openSidebarToggle ? '10' : '3'} cursor-pointer`}
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
        <li className="p-[20px] text-lg">
          <Link to="/admin" className="text-[#9e9ea4] no-underline">
            <BsGrid1X2Fill className="text-xl mr-2" /> Dashboard
          </Link>
        </li>
        <li className="p-[20px] text-lg">
          <Link to="/admin/products" className="text-[#9e9ea4] no-underline">
            <BsFillArchiveFill className="text-xl mr-2" /> Blogs
          </Link>
        </li>
        <li className="p-[20px] text-lg">
          <Link to="/admin/categories" className="text-[#9e9ea4] no-underline">
            <BsFillGrid3X3GapFill className="text-xl mr-2" /> Categories
          </Link>
        </li>
        <li className="p-[20px] text-lg">
          <Link to="/admin/customers" className="text-[#9e9ea4] no-underline">
            <BsPeopleFill className="text-xl mr-2" /> Customers
          </Link>
        </li>
        <li className="p-[20px] text-lg">
          <Link to="/admin/settings" className="text-[#9e9ea4] no-underline">
            <BsFillGearFill className="text-xl mr-2" /> Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}

Sidebar.propTypes = {
  openSidebarToggle: PropTypes.bool.isRequired, 
  OpenSidebar: PropTypes.func.isRequired, 
};

export default Sidebar;
