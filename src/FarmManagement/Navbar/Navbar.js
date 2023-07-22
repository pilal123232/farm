import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser , faBell ,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { Badge } from "@mui/material";

const Navbar = (props) => {
   return (
      <nav className="navbar navbar-light bg-white shadow p-0">
         <div className="container-fluid flex-nowrap">
            <div className="User d-flex flex-nowrap">
               <Link className="navbar-brand p-0 mx-2">
                  <div className="d-inline-block w-25">
                     <FontAwesomeIcon className="ps-2" icon={faUser} />
                     <span className="border-start ps-2">mosab-abd</span>
                  </div>
               </Link>
               <Link to="/Notification">
                  <Badge badgeContent={ 5 } color="error" sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 15, minWidth: 15 } }}>
                     <FontAwesomeIcon className="text-black" icon={faBell} />
                  </Badge>
               </Link>
            </div>
            <form className="d-flex Search">
               <button className="btn bg-light" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
               <input className="form-control bg-light" type="search"  aria-label="Search"/>
            </form>
         </div>
      </nav>
   );
};
export default Navbar;
