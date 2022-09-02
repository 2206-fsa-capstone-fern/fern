import React from "react";
import * as FaIcons from "react-icons/fa";
// import * as AiIcons from 'react-icons/ai';
import * as IoIcons from "react-icons/io";
import { CDBIcon } from "cdbreact";

export const SideNavData = [
  {
    title: "  Dashboard",
    path: "/dashboard",
    icon: <CDBIcon icon="tachometer-alt" />,
  },
  {
    title: "  Transactions",
    path: "/transactions",
    icon: <CDBIcon icon='money-check-alt' />,
  },
  {
    title: "  Trends",
    path: "/trends",
    icon: <CDBIcon icon='chart-line' />,
  },
  {
    title: "  Budget",
    path: "/budget",
    icon: <CDBIcon icon='piggy-bank' />,
  },
  {
    title: '  Balances',
    path: '/balances',
    icon: <CDBIcon icon='coins' />
  },
  {
    title: '  Quiz',
    path: '/quiz',
    icon: <CDBIcon icon='edit' />,
  },
];
