/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import usePrivateRoute from "./utils/usePrivateRoute";
import AuthLayout from "./layouts/Auth";
import HomeLayout from "./layouts/Landing";
import ErrorLayout from "./layouts/Error";
import DashboardLayout from "./layouts/Dashboard";
import DashboardAnalyticsView from "./views/DashboardAnalytics";
import DashboardDefaultView from "./views/DashboardDefault";
import OverviewView from "./views/Overview";
import PresentationView from "./views/Presentation";
// import PrivateRoute from "./components/PrivateRoute";

const routes = [
    {
        path: "/",
        exact: true,
        component: () => <Redirect to='/home' />,
    },
    {
        path: "/auth",
        component: AuthLayout,
        routes: [
            {
                path: "/auth/login",
                exact: true,
                component: lazy(() => import("views/Login")),
            },
            {
                path: "/auth/register",
                exact: true,
                component: lazy(() => import("views/Register")),
            },
            {
                component: () => <Redirect to='/errors/error-404' />,
            },
        ],
    },
    {
        path: "/errors",
        component: ErrorLayout,
        routes: [
            {
                path: "/errors/error-401",
                exact: true,
                component: lazy(() => import("views/Error401")),
            },
            {
                path: "/errors/error-404",
                exact: true,
                component: lazy(() => import("views/Error404")),
            },
            {
                path: "/errors/error-500",
                exact: true,
                component: lazy(() => import("views/Error500")),
            },
            {
                component: () => <Redirect to='/errors/error-404' />,
            },
        ],
    },
    {
        path: "/home",
        exact: true,
        component: HomeLayout,
        routes: [
            {
                path: "/home",
                exact: true,
                component: PresentationView,
            },
            {
                component: () => <Redirect to='/errors/error-404' />,
            },
        ],
    },
    {
        path: "/dashboard",
        component: usePrivateRoute(DashboardLayout),
        routes: [
            {
                path: "/dashboard/dashboards/analytics",
                exact: true,
                component: DashboardAnalyticsView,
            },
            {
                path: "/dashboard",
                exact: true,
                component: DashboardDefaultView,
            },
            {
                path: "/dashboard/invoices/:id",
                exact: true,
                component: lazy(() => import("views/InvoiceDetails")),
            },
            {
                path: "/dashboard/management/farms",
                exact: true,
                component: lazy(() => import("views/FarmsManagementList")),
            },
            {
                path: "/dashboard/management/farms/:id",
                exact: true,
                component: lazy(() => import("views/FarmEdit")),
            },
	    {
                path: "/dashboard/management/auctions",
                exact: true,
                component: lazy(() => import("views/AuctionList")),
            },
	    {
                path: "/dashboard/management/auctions/:id",
                exact: true,
                component: lazy(() => import("views/AuctionDetails")),
            },
	    {
                path: "/dashboard/management/auctions/join/:id",
                exact: true,
                component: lazy(() => import("views/JoinAuction")),
            },
            {
                path: "/dashboard/management/customers/:id",
                exact: true,
                component: lazy(() =>
                    import("views/CustomerManagementDetails")
                ),
            },
            {
                path: "/dashboard/management/customers/:id/:tab",
                exact: true,
                component: lazy(() =>
                    import("views/CustomerManagementDetails")
                ),
            },
            {
                path: "/dashboard/management/add-farm",
                exact: true,
                component: lazy(() => import("views/AddFarm")),
            },
	    {
                path: "/dashboard/management/add-auction",
                exact: true,
                component: lazy(() => import("views/AddAuction")),
            },
            {
                path: "/dashboard/management/orders",
                exact: true,
                component: lazy(() => import("views/OrderManagementList")),
            },
            {
                path: "/dashboard/management/orders/:id",
                exact: true,
                component: lazy(() => import("views/OrderManagementDetails")),
            },
            {
                path: "/dashboard/overview",
                exact: true,
                component: OverviewView,
            },
	    {
                path: "/dashboard/profile",
                exact: true,
                component: lazy(() => import("views/Profile")),
            },
            {
                path: "/dashboard/settings",
                exact: true,
                component: lazy(() => import("views/Settings")),
            },
            {
                path: "/dashboard/settings/:tab",
                exact: true,
                component: lazy(() => import("views/Settings")),
            },
            {
                path: "/dashboard/getting-started",
                exact: true,
                component: lazy(() => import("views/GettingStarted")),
            },
            {
                component: () => <Redirect to='/errors/error-404' />,
            },
        ],
    },
];

export default routes;
