/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import {
  colors
} from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import {
  Label
} from 'components';

const contents = {
  farmer: [{
      title: 'Pages',
      pages: [{
          title: 'Overview',
          href: '/dashboard/overview',
          icon: HomeIcon
        },
        {
          title: 'Dashboards',
          href: '/dashboards',
          icon: DashboardIcon,
          children: [{
              title: 'Default',
              href: '/dashboard'
            },
            {
              title: 'Analytics',
              href: '/dashboard/dashboards/analytics'
            }
          ]
        },
        {
          title: 'Management',
          href: '/dashboard/management',
          icon: BarChartIcon,
          children: [{
              title: 'Farms',
              href: '/dashboard/management/farms'
            },
            {
              title: 'Customer Details',
              href: '/dashboard/management/customers/1/summary'
            },
            {
              title: 'Orders',
              href: '/dashboard/management/orders'
            },
            {
              title: 'Order Details',
              href: '/dashboard/management/orders/1'
            }
          ]
        },
        {
          title: 'Invoice',
          href: '/dashboard/invoices/1',
          icon: ReceiptIcon
        },
        {
          title: 'Settings',
          href: '/dashboard/settings',
          icon: SettingsIcon,
          children: [{
              title: 'General',
              href: '/dashboard/settings/general'
            },
            {
              title: 'Subscription',
              href: '/dashboard/settings/subscription'
            },
            {
              title: 'Notifications',
              href: '/dashboard/settings/notifications'
            },
            {
              title: 'Security',
              href: '/dashboard/settings/security'
            }
          ]
        }
      ]
    },
    {
      title: 'Support',
      pages: [{
        title: 'Getting started',
        href: '/getting-started',
        icon: CodeIcon
      }]
    }
  ],
  buyer: [{
      title: 'Pages',
      pages: [{
          title: 'Overview',
          href: '/dashboard/overview',
          icon: HomeIcon
        },
        {
          title: 'Dashboards',
          href: '/dashboards',
          icon: DashboardIcon,
          children: [{
              title: 'Default',
              href: '/dashboard'
            },
            {
              title: 'Analytics',
              href: '/dashboard/dashboards/analytics'
            }
          ]
        },
        {
          title: 'Management',
          href: '/dashboard/management',
          icon: BarChartIcon,
          children: [{
              title: 'Orders',
              href: '/dashboard/management/orders'
            },
            {
              title: 'Order Details',
              href: '/dashboard/management/orders/1'
            }
          ]
        },
        {
          title: 'Invoice',
          href: '/dashboard/invoices/1',
          icon: ReceiptIcon
        },
        {
          title: 'Settings',
          href: '/dashboard/settings',
          icon: SettingsIcon,
          children: [{
              title: 'General',
              href: '/dashboard/settings/general'
            },
            {
              title: 'Subscription',
              href: '/dashboard/settings/subscription'
            },
            {
              title: 'Notifications',
              href: '/dashboard/settings/notifications'
            },
            {
              title: 'Security',
              href: '/dashboard/settings/security'
            }
          ]
        }
      ]
    },
    {
      title: 'Support',
      pages: [{
        title: 'Getting started',
        href: '/',
        icon: CodeIcon
      }]
    }
  ]

};

export default contents;
