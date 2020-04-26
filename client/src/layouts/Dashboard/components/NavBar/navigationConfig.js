import BarChartIcon from "@material-ui/icons/BarChart";
import CodeIcon from "@material-ui/icons/Code";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import ReceiptIcon from "@material-ui/icons/ReceiptOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const contents = {
    farmer: [
        {
            title: "Pages",
            pages: [
                {
                    title: "Overview",
                    href: "/dashboard",
                    icon: HomeIcon,
                },
                {
                    title: "Dashboards",
                    href: "/dashboards",
                    icon: DashboardIcon,
                    children: [
                        {
                            title: "Analytics",
                            href: "/dashboard/dashboards/analytics",
                        },
                    ],
                },
                {
                    title: "Management",
                    href: "/dashboard/management",
                    icon: BarChartIcon,
                    children: [
                        {
                            title: "Farms",
                            href: "/dashboard/management/farms",
                        },
			{
                            title: "Auctions",
                            href: "/dashboard/management/auctions",
                        },
                        {
                            title: "Customer Details",
                            href: "/dashboard/management/customers/1/summary",
                        },
                        {
                            title: "Orders",
                            href: "/dashboard/management/orders",
                        },
                        {
                            title: "Order Details",
                            href: "/dashboard/management/orders/1",
                        },
                    ],
                },
                {
                    title: "Invoice",
                    href: "/dashboard/invoices/1",
                    icon: ReceiptIcon,
                },
		{
                    title: "Profile",
                    href: "/dashboard/profile",
                    icon: AccountCircleIcon,
                },
                {
                    title: "Settings",
                    href: "/dashboard/settings",
                    icon: SettingsIcon,
                    children: [
                        {
                            title: "General",
                            href: "/dashboard/settings/general",
                        },
                        {
                            title: "Subscription",
                            href: "/dashboard/settings/subscription",
                        },
                        {
                            title: "Notifications",
                            href: "/dashboard/settings/notifications",
                        },
                        {
                            title: "Security",
                            href: "/dashboard/settings/security",
                        },
                    ],
                },
            ],
        },
        {
            title: "Support",
            pages: [
                {
                    title: "Getting started",
                    href: "/getting-started",
                    icon: CodeIcon,
                },
            ],
        },
    ],
    buyer: [
        {
            title: "Pages",
            pages: [
                {
                    title: "Overview",
                    href: "/dashboard",
                    icon: HomeIcon,
                },
                {
                    title: "Dashboards",
                    href: "/dashboards",
                    icon: DashboardIcon,
                    children: [
                        {
                            title: "Analytics",
                            href: "/dashboard/dashboards/analytics",
                        },
                    ],
                },
                {
                    title: "Management",
                    href: "/dashboard/management",
                    icon: BarChartIcon,
                    children: [
			{
                            title: "Auctions",
                            href: "/dashboard/management/auctions",
                        },
                        {
                            title: "Orders",
                            href: "/dashboard/management/orders",
                        },
                        {
                            title: "Order Details",
                            href: "/dashboard/management/orders/1",
                        },
                    ],
                },
                {
                    title: "Invoice",
                    href: "/dashboard/invoices/1",
                    icon: ReceiptIcon,
                },
		{
                    title: "Profile",
                    href: "/dashboard/profile",
                    icon: AccountCircleIcon,
                },
                {
                    title: "Settings",
                    href: "/dashboard/settings",
                    icon: SettingsIcon,
                    children: [
                        {
                            title: "General",
                            href: "/dashboard/settings/general",
                        },
                        {
                            title: "Subscription",
                            href: "/dashboard/settings/subscription",
                        },
                        {
                            title: "Notifications",
                            href: "/dashboard/settings/notifications",
                        },
                        {
                            title: "Security",
                            href: "/dashboard/settings/security",
                        },
                    ],
                },
            ],
        },
        {
            title: "Support",
            pages: [
                {
                    title: "Getting started",
                    href: "/",
                    icon: CodeIcon,
                },
            ],
        },
    ],
    admin: [
        {
            title: "Pages",
            pages: [
                {
                    title: "Overview",
                    href: "/dashboard",
                    icon: HomeIcon,
                },
                {
                    title: "Dashboards",
                    href: "/dashboards",
                    icon: DashboardIcon,
                    children: [
                        {
                            title: "Default",
                            href: "/dashboard",
                        },
                        {
                            title: "Analytics",
                            href: "/dashboard/dashboards/analytics",
                        },
                    ],
                },
                {
                    title: "Management",
                    href: "/dashboard/management",
                    icon: BarChartIcon,
                    children: [
                        {
                            title: "Orders",
                            href: "/dashboard/management/orders",
                        },
                        {
                            title: "Order Details",
                            href: "/dashboard/management/orders/1",
                        },
                    ],
                },
                {
                    title: "Invoice",
                    href: "/dashboard/invoices/1",
                    icon: ReceiptIcon,
                },
		{
                    title: "Profile",
                    href: "/dashboard/profile",
                    icon: AccountCircleIcon,
                },
                {
                    title: "Settings",
                    href: "/dashboard/settings",
                    icon: SettingsIcon,
                    children: [
                        {
                            title: "General",
                            href: "/dashboard/settings/general",
                        },
                        {
                            title: "Subscription",
                            href: "/dashboard/settings/subscription",
                        },
                        {
                            title: "Notifications",
                            href: "/dashboard/settings/notifications",
                        },
                        {
                            title: "Security",
                            href: "/dashboard/settings/security",
                        },
                    ],
                },
            ],
        },
        {
            title: "Support",
            pages: [
                {
                    title: "Getting started",
                    href: "/",
                    icon: CodeIcon,
                },
            ],
        },
    ],
    logistics: [
        {
            title: "Pages",
            pages: [
                {
                    title: "Overview",
                    href: "/dashboard",
                    icon: HomeIcon,
                },
                {
                    title: "Dashboards",
                    href: "/dashboards",
                    icon: DashboardIcon,
                    children: [
                        {
                            title: "Default",
                            href: "/dashboard",
                        },
                        {
                            title: "Analytics",
                            href: "/dashboard/dashboards/analytics",
                        },
                    ],
                },
                {
                    title: "Management",
                    href: "/dashboard/management",
                    icon: BarChartIcon,
                    children: [
                        {
                            title: "Orders",
                            href: "/dashboard/management/orders",
                        },
                        {
                            title: "Order Details",
                            href: "/dashboard/management/orders/1",
                        },
                    ],
                },
                {
                    title: "Invoice",
                    href: "/dashboard/invoices/1",
                    icon: ReceiptIcon,
                },
		{
                    title: "Profile",
                    href: "/dashboard/profile",
                    icon: AccountCircleIcon,
                },
                {
                    title: "Settings",
                    href: "/dashboard/settings",
                    icon: SettingsIcon,
                    children: [
                        {
                            title: "General",
                            href: "/dashboard/settings/general",
                        },
                        {
                            title: "Subscription",
                            href: "/dashboard/settings/subscription",
                        },
                        {
                            title: "Notifications",
                            href: "/dashboard/settings/notifications",
                        },
                        {
                            title: "Security",
                            href: "/dashboard/settings/security",
                        },
                    ],
                },
            ],
        },
        {
            title: "Support",
            pages: [
                {
                    title: "Getting started",
                    href: "/",
                    icon: CodeIcon,
                },
            ],
        },
    ],
};

export default contents;
