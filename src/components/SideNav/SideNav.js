import React from "react";
import { NavLink } from "react-router-dom";
import { SideNavData } from "./SideNavData";
import "./SideBar.css";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from "cdbreact";

function Navbar() {
  return (
    <div
      className={`app`}
      style={{ display: "flex", height: "100%", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "lightgreen", fontSize: 36 }}
          >
            FernFi
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {SideNavData.map((item, index) => {
              return (
                <CDBSidebarMenuItem key={index} className={item.cName}>
                  <NavLink to={item.path}>
                    <svg width='20' height='20'>
                    {item.icon}
                    </svg>
                    <span style={{ padding:5}}>{item.title}</span>
                  </NavLink>
                </CDBSidebarMenuItem>
              );
            })}
          </CDBSidebarMenu>
          <CDBSidebarMenu></CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
}

export default Navbar;
