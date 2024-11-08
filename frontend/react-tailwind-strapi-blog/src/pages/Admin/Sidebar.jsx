import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import { logo } from "../../assets";
import { 
  BsGrid1X2Fill, 
  BsFillArchiveFill, 
  BsFillGrid3X3GapFill, 
  BsPeopleFill, 
  BsListCheck, 
  BsFillGearFill 
} from 'react-icons/bs';

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside 
      id="sidebar"
      style={{
        width: openSidebarToggle ? '250px' : '0',
        height: '100%',
        backgroundColor: '#263043',
        overflowY: 'auto',
        transition: 'all 0.5s ease',
        position: 'fixed',
        zIndex: '12',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
      }}>
        <div style={{ marginTop: '15px' }}>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              style={{
                opacity: '0.55',
                width: '100%',
                height: '25px',
                marginLeft: openSidebarToggle ? '10px' : '3px',
              }}
            />
          </Link>
        </div>
        <span 
          style={{
            color: 'red',
            marginLeft: '30px',
            marginTop: '10px',
            cursor: 'pointer',
            fontSize: '20px',
          }}
          onClick={OpenSidebar}
        >×</span>
      </div>

      <ul style={{ padding: '0', listStyleType: 'none' }}>
        <li style={{ padding: '20px', fontSize: '18px' }}>
          <Link to="/admin" style={{ textDecoration: 'none', color: '#9e9ea4' }}>
            <BsGrid1X2Fill style={{ fontSize: '20px', marginRight: '10px' }} /> Dashboard
          </Link>
        </li>
        <li style={{ padding: '20px', fontSize: '18px' }}>
          <Link to="/admin/products" style={{ textDecoration: 'none', color: '#9e9ea4' }}>
            <BsFillArchiveFill style={{ fontSize: '20px', marginRight: '10px' }} /> Blogs
          </Link>
        </li>
        <li style={{ padding: '20px', fontSize: '18px' }}>
          <Link to="/admin/categories" style={{ textDecoration: 'none', color: '#9e9ea4' }}>
            <BsFillGrid3X3GapFill style={{ fontSize: '20px', marginRight: '10px' }} /> Categories
          </Link>
        </li>
        <li style={{ padding: '20px', fontSize: '18px' }}>
          <Link to="/admin/customers" style={{ textDecoration: 'none', color: '#9e9ea4' }}>
            <BsPeopleFill style={{ fontSize: '20px', marginRight: '10px' }} /> Customers
          </Link>
        </li>
        <li style={{ padding: '20px', fontSize: '18px' }}>
          <Link to="/admin/inventory" style={{ textDecoration: 'none', color: '#9e9ea4' }}>
            <BsListCheck style={{ fontSize: '20px', marginRight: '10px' }} /> Inventory
          </Link>
        </li>
        <li style={{ padding: '20px', fontSize: '18px' }}>
          <Link to="/admin/settings" style={{ textDecoration: 'none', color: '#9e9ea4' }}>
            <BsFillGearFill style={{ fontSize: '20px', marginRight: '10px' }} /> Setting
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
