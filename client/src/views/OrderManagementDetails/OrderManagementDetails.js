import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import { Page } from "components";
import { Header, OrderInfo, OrderItems } from "./components";
import { getOrder } from "actions/order";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    container: {
        marginTop: theme.spacing(3),
    },
}));

const OrderManagementDetails = (props) => {
    const classes = useStyles();

    const { order } = props;

    const {
        match: {
            params: { id },
        },
        getOrder,
    } = props;

    useEffect(() => {
        let mounted = true;

        getOrder(id);

        return () => {
            mounted = false;
        };
    }, []);

    if (!order) {
        return null;
    }

    return (
        <Page className={classes.root} title="Order Management Details">
            <Header id={id} />
            <Grid className={classes.container} container spacing={3}>
                <Grid item md={4} xl={3} xs={12}>
                    <OrderInfo order={order} />
                </Grid>
                <Grid item md={8} xl={9} xs={12}>
                    <OrderItems order={order} />
                </Grid>
            </Grid>
        </Page>
    );
};

const mapStateToProps = (state) => ({
    order: state.order.order,
});

export default connect(mapStateToProps, { getOrder })(OrderManagementDetails);
