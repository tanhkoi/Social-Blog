import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import { 
  BsGrid1X2Fill, 
  BsFillArchiveFill, 
  BsFillGrid3X3GapFill, 
  BsPeopleFill, 
  BsListCheck, 
  BsMenuButtonWideFill, 
  BsFillGearFill 
} from 'react-icons/bs';
import '../../App.css'; 

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside 
      id="sidebar" 
      className={`${openSidebarToggle ? "responsive" : ""}`}
    >
      <div className='title'>
        <div className='brand'>
          CWTS
        </div>
        <span className='admin-icon admin-close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='list'>
        <li className='list-item'>
          <Link to="/admin">
            <BsGrid1X2Fill className='admin-icon' /> Dashboard
          </Link>
        </li>
        <li className='list-item'>
          <Link to="/admin/products">
            <BsFillArchiveFill className='admin-icon' /> Blogs
          </Link>
        </li>
        <li className='list-item'>
          <Link to="/admin/categories">
            <BsFillGrid3X3GapFill className='admin-icon' /> Categories
          </Link>
        </li>
        <li className='list-item'>
          <Link to="/admin/customers">
            <BsPeopleFill className='admin-icon' /> Customers
          </Link>
        </li>
        <li className='list-item'>
          <Link to="/admin/inventory">
            <BsListCheck className='admin-icon' /> Inventory
          </Link>
        </li>
        <li className='list-item'>
          <Link to="/admin/reports">
            <BsMenuButtonWideFill className='admin-icon' /> Reports
          </Link>
        </li>
        <li className='list-item'>
          <Link to="/admin/settings">
            <BsFillGearFill className='admin-icon' /> Setting
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
