import { default as React } from 'react';
import { NavLink } from 'react-router-dom';

import * as Routes from '../../../routes';

import './Sidebar.scss';

const Navigation = ({children, className}) => {
  return (
    <ul className={className}>
      <li className="sidebar-nav-item">        
        <NavLink to={Routes.BACKOFFICE_DASHBOARD} activeClassName="active" className="sidebar-nav-link"><i className="fas fa-tachometer-alt"></i><span>Dasboard</span></NavLink>
      </li>
      <li className="sidebar-nav-item">        
        <NavLink to={Routes.BACKOFFICE_POSTS} activeClassName="active" className="sidebar-nav-link"><i className="fas fa-blog"></i><span>Blogs</span></NavLink>
      </li>
      <li className="sidebar-nav-item">        
        <NavLink to={Routes.BACKOFFICE_POSTS} activeClassName="active" className="sidebar-nav-link"><i className="fas fa-edit"></i><span>Posts</span></NavLink>
      </li>
      <li className="sidebar-nav-item">        
        <NavLink to={Routes.BACKOFFICE_POSTS} activeClassName="active" className="sidebar-nav-link"><i className="fas fa-tags"></i><span>Categories</span></NavLink>
      </li>      
      <li className="sidebar-nav-item">        
        <NavLink to={Routes.BACKOFFICE_POSTS} activeClassName="active" className="sidebar-nav-link"><i className="fas fa-comment-alt"></i><span>Messages</span></NavLink>
      </li>
      <li className="sidebar-nav-item">        
        <NavLink to={Routes.BACKOFFICE_POSTS} activeClassName="active" className="sidebar-nav-link"><i className="fas fa-users"></i><span>Users</span></NavLink>
      </li>
      <li className="sidebar-nav-item">        
        <NavLink to={Routes.HOME} activeClassName="active" className="sidebar-nav-link"><i className="fas fa-home"></i><span>Home</span></NavLink>
      </li>
    </ul>
  );
};

export default Navigation;