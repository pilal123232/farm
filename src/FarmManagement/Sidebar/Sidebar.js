import React from "react";
import "./Sidebar.css";
import {NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse , faHeartPulse , faChartSimple ,faDollarSign} from '@fortawesome/free-solid-svg-icons'

const Sidebar = (props) => {
  const menuItem = [
    {
      path : "/",
      name : "الرئيسية",
      icon : <FontAwesomeIcon icon={faHouse} />
    },
    {
      path : "/health",
      name : "قسم الرعاية الصحية",
      icon : <FontAwesomeIcon icon={faHeartPulse} />
    },
    {
      path : "/checking",
      name : "قسم المراقبة",
      icon : <FontAwesomeIcon icon={faChartSimple} />
    },
    {
      path : "/milk",
      name : "قسم الإنتاجية",
      icon : <FontAwesomeIcon icon={faDollarSign} />
    }
    
  ]
  return (
    <aside className="Sidebar col-1 col-sm-2">
      <div></div>
      <ul className="nav flex-column">
        {
          menuItem.map((item , index) => (
            <li key={index}>
              <hr className="m-auto"></hr>
              <NavLink to={item.path} className="nav-link" activeclassname="active">
                {item.icon}
                <span className="d-none d-sm-inline ms-2">{item.name}</span>
              </NavLink>
            </li>
          ))
        }
      </ul>
    </aside>
    
  );
};

export default Sidebar;
