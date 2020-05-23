import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import HistoryIcon from '@material-ui/icons/History';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import HelpIcon from '@material-ui/icons/Help';
import ShopIcon from '@material-ui/icons/Shop';

const contents = {
  farmer: [
    {
      title: 'Auctions',
      icon: AttachMoneyIcon,
      href: '/dashboard/management/auctions'
    },
    {
      title: 'My Farms',
      icon: LocalFloristIcon,
      href: '/dashboard/management/farms'
    },
    {
      title: 'Orders',
      icon: HistoryIcon,
      href: '/dashboard/management/orders'
    },
    {
      title: 'Profile',
      icon: PersonIcon,
      href: '/dashboard/settings/general'
    },
  ],
  buyer: [
    {
      title: 'Buy Stubble',
      icon: ShopIcon,
      href: '/dashboard/management/auctions'
    },
    {
      title: 'Get Stubble Uses',
      icon: HelpIcon,
      href: '/dashboard'
    },
    {
      title: 'Orders',
      icon: HistoryIcon,
      href: '/dashboard/management/orders'
    },
    {
      title: 'Profile',
      icon: PersonIcon,
      href: '/dashboard/settings/general'
    },
  ],
  admin: [
    {
      title: 'Buy Stubble',
      icon: ShopIcon,
      href: '/dashboard/management/auctions'
    },
    {
      title: 'Get Stubble Uses',
      icon: HelpIcon,
      href: '/dashboard'
    },
    {
      title: 'Orders',
      icon: HistoryIcon,
      href: '/dashboard/management/orders'
    },
    {
      title: 'Profile',
      icon: PersonIcon,
      href: '/dashboard/settings/general'
    },
  ],
  logistics: [
    {
      title: 'Buy Stubble',
      icon: ShopIcon,
      href: '/dashboard'
    },
    {
      title: 'Get Stubble Uses',
      icon: HelpIcon,
      href: '/dashboard'
    },
    {
      title: 'Orders',
      icon: HistoryIcon,
      href: '/dashboard/management/orders'
    },
    {
      title: 'Profile',
      icon: PersonIcon,
      href: '/dashboard/settings/general'
    },
  ]

};

export default contents;
