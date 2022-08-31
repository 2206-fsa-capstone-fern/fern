import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SideNavData } from "./SideNavData";
import "./SideBar.css";
import { IconContext } from "react-icons";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from "cdbreact";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [collapse, setCollapse] = useState(false);
  return (
    <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        <div
          className="container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={"./public/pics/fernfi_logo.png"}
            alt=""
            style={{ width: "30px" }}
          />
          <h6 className="ml-2">FernFi</h6>
        </div>
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          {SideNavData.map((item, index) => (
            <CDBSidebarMenuItem key={index}>
              <Link to={item.path}>
                <IconContext.Provider value={{ color: "#333" }}>
                  {item.icon}
                </IconContext.Provider>
                <span className="ml-2">{item.title}</span>
              </Link>
            </CDBSidebarMenuItem>
          ))}
        </CDBSidebarMenu>
      </CDBSidebarContent>
    </CDBSidebar>
  );
}

export default Navbar;
