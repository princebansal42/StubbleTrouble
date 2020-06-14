import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {},
}));

const Header = (props) => {
    const {
        className,
        auth: { user },
        ...rest
    } = props;

    const classes = useStyles();

    let button, userType;
    if (user) {
        userType = user.userType;
        if (userType === "farmer") {
            button = (
                <>
                    <RouterLink to="/dashboard/management/add-auction">
                        <Button color="primary" variant="contained">
                            Add Auction
                        </Button>
                    </RouterLink>
                </>
            );
        }
    } else {
        button = "";
    }

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <Grid
                alignItems="flex-end"
                container
                justify="space-between"
                spacing={3}
            >
                <Grid item>
                    <Typography component="h2" gutterBottom variant="overline">
                        Management
                    </Typography>
                    <Typography component="h1" variant="h3">
                        Auctions
                    </Typography>
                </Grid>
                <Grid item>{button}</Grid>
            </Grid>
        </div>
    );
};

Header.propTypes = {
    className: PropTypes.string,
    auth: PropTypes.object,
};

export default Header;
