import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import { Page } from "components";
import {
    Header,
    Tile,
} from "./components";
import PropTypes from 'prop-types';

import contents from "./componentsConfig";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    container: {
        marginTop: theme.spacing(3),
    },
}));

const DashboardDefault = (props) => {
    const {
        auth: { user }
    } = props;
    let userType;
    if (user) {
        userType = user.userType;
    } else {
        userType = "buyer";
    }

    const classes = useStyles();

    return (
        <Page className={classes.root} title='Default Dashboard'>
            <Header />
            <Grid className={classes.container} container spacing={3}>
                {contents[userType].map((tile, i) => (
                    <Grid key={i} item lg={6} sm={6} xs={12}>
                        <Tile
                            title={tile.title}
                            href={tile.href}
                            Icon={tile.icon}
                        />
                    </Grid>
                ))}
            </Grid>
        </Page>
    );
};

DashboardDefault.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(DashboardDefault);
