import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, Typography } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import useRouter from "utils/useRouter";

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.white,
        padding: theme.spacing(3),
        alignItems: "center",
    },
    avatar: {
        backgroundColor: theme.palette.white,
        color: theme.palette.primary.main,
        height: 48,
        width: 48,
    },
    fields: {
        margin: theme.spacing(-1),
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            flexGrow: 1,
            margin: theme.spacing(1),
        },
    },
    mapContainer: {
        marginTop: theme.spacing(2),
        position: "relative",
        height: "300px",
        width: "100%",
    },
    submitButton: {
        marginTop: theme.spacing(2),
        width: "100%",
    },
}));

const Main = (props) => {
    const { className, addFarm } = props;

    const classes = useStyles();
    const { history } = useRouter();

    const [formState, setFormState] = useState({
        name: "",
        address: "",
        area: "",
        lat: 28.6103,
        long: 77.0379,
    });

    const handleChange = (event) => {
        event.persist();

        setFormState((formState) => ({
            ...formState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, address, area, lat, long } = formState;
        const farmDetail = {
            name,
            address,
            location: {
                lat,
                long,
            },
            area,
        };
        console.log(farmDetail);
        addFarm(farmDetail);
        history.push("/dashboard/management/farms");
    };

    const onMarkerDragEnd = (t, map, coord) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const long = latLng.lng();

        setFormState((formState) => ({
            ...formState,
            lat: lat,
            long: long,
        }));
    };

    return (
        <>
            <Card className={clsx(classes.root, className)}>
                <div>
                    <div>
                        <Typography color="initial" variant="h3">
                            Add Farm
                        </Typography>
                        <br></br>
                        <form onSubmit={handleSubmit}>
                            <div className={classes.fields}>
                                <TextField
                                    fullWidth
                                    label="Farm Name"
                                    name="name"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.name}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Farm Address"
                                    name="address"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.address}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Farm Area"
                                    name="area"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.area}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Farm latitude"
                                    name="lat"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.lat}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Farm longitude"
                                    name="long"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.long}
                                    variant="outlined"
                                />
                            </div>

                            <div className={classes.mapContainer}>
                                <Map
                                    item
                                    xs={12}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    google={props.google}
                                    zoom={14}
                                    initialCenter={{
                                        lat: formState.lat,
                                        lng: formState.long,
                                    }}
                                >
                                    <Marker
                                        draggable={true}
                                        onDragend={onMarkerDragEnd}
                                        title={"Changing Colors Garage"}
                                        position={{
                                            lat: formState.lat,
                                            lng: formState.long,
                                        }}
                                        name={"Changing Colors Garage"}
                                    />
                                </Map>
                            </div>
                            <Button
                                className={classes.submitButton}
                                color="secondary"
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Add
                            </Button>
                        </form>
                    </div>
                </div>
            </Card>
        </>
    );
};

Main.propTypes = {
    className: PropTypes.string,
    addFarm: PropTypes.func.isRequired,
};

export default GoogleApiWrapper({
    api: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
})(Main);
