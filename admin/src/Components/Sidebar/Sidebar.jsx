import React from 'react';
import './Sidebar.css';
import add_product_icon from '../Assets/Product_Cart.svg';
import list_product_icon from '../Assets/Product_list_icon.svg';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      {/* Add Product */}
      <Link to='/addproduct' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="Add Product Icon" />
          <p>Add Product</p>
        </div>
      </Link>

      {/* Product List */}
      <Link to='/listproduct' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="Product List Icon" />
          <p>Product List</p>
        </div>
      </Link>

      {/* Orders */}
      <Link to="/orders" style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <p>Orders</p>
        </div>
      </Link>

      {/* Users */}
      <Link to="/users" style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <p>Users</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
