import React from 'react';
import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SideNavData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <IoIcons.IoIosHome />,
  },
  {
    title: 'Transactions',
    path: '/transactions',
    icon: <FaIcons.FaMoneyBill />,
  },
  {
    title: 'Budget',
    path: '/budget',
    icon: <FaIcons.FaChartLine />,
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <FaIcons.FaFileAlt />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <FaIcons.FaCog />,
  },
];
