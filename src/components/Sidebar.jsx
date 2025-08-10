import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return(
        <div className='sidebar'>
            <ul className="sidebar-menu">
                <NavLink to="/" exact="true"><li><i className="fa-solid fa-chart-line"></i></li></NavLink>
                <NavLink to="/books" exact="true"><li><i className="fa-solid fa-book"></i></li></NavLink>
            </ul>
        </div>
    )
}

export default Sidebar