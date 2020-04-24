import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { Page } from "components";
import { Header, Main } from "./components";
import PropTypes from "prop-types";
import { editFarm, getFarm } from "actions/farms";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    container: {
        marginTop: theme.spacing(3),
    },
}));

const FarmEdit = (props) => {
    const classes = useStyles();

    const {
        match: {
            params: { id },
        },
        editFarm,
        getFarm,
        farm,
    } = props;

    useEffect(() => {
        let mounted = true;

        getFarm(id);

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <Page className={classes.root} title='Default Dashboard'>
            <Header />
            <Grid className={classes.container} container spacing={3}>
                <Grid item lg={12} sm={12} xs={12}>
                    <Main id={id} editFarm={editFarm} farm={farm} />
                </Grid>
            </Grid>
        </Page>
    );
};

FarmEdit.propTypes = {
    editFarm: PropTypes.func.isRequired,
    getFarm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    farm: state.farm.farm,
});

export default connect(mapStateToProps, { editFarm, getFarm })(FarmEdit);
