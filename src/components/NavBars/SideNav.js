import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import SignedInLinks from "../SignedInLinks";
import SignedOutLinks from "../SignedOutLinks";

import { SideNavData } from "./SideNavData";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from "cdbreact";

function SideNav(props) {
  return (
    <div
      className={`app`}
      style={{ display: "flex", height: "100%", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#55828B">
        <CDBSidebarHeader>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "lightgreen", fontSize: 36 }}
          >
            Fern
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {SideNavData.map((item, index) => {
              return (
                <CDBSidebarMenuItem key={index} className={item.cName}>
                  <NavLink to={item.path}>
                    <svg width="20" height="20">
                      {item.icon}
                    </svg>
                    <span style={{ padding: 5 }}>{item.title}</span>
                  </NavLink>
                </CDBSidebarMenuItem>
              );
            })}
            <CDBSidebarMenuItem className="sidebar-item">
              {props.isLoggedIn ? <SignedInLinks /> : <SignedOutLinks />}
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.firstName,
  };
};

export default connect(mapState, null)(SideNav);