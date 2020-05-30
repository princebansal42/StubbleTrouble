import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, Typography } from "@material-ui/core";
import { Button, TextField, Select, MenuItem, InputLabel } from "@material-ui/core";
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
    const { addAuction, farms,  className } = props;

    const classes = useStyles();
    const { history } = useRouter();

    const [formState, setFormState] = useState({
        title: "",
        farm_id: "",
        description: "",
        starting_price: "",
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
        const { farm_id, description, starting_price } = formState;
        const auctionDetail = {
            farm_id,
            description,
            starting_price,
        };

        addAuction(auctionDetail);

        history.push("/dashboard/management/auctions");
    };

    return (
        <>
            <Card className={clsx(classes.root, className)}>
                <div>
                    <div>
                        <Typography color="initial" variant="h3">
                            Add Auction
                        </Typography>
                        <br></br>
                        <form onSubmit={handleSubmit}>
                            <div className={classes.fields}>
                                <TextField
                                    fullWidth
                                    label="Auction Title"
                                    name="title"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.title}
                                    variant="outlined"
                                />

                                <InputLabel id="dropdown-farm-label" variant="outlined"> Select Farm</InputLabel>
                                <Select
                                  labelId="dropdown-farm-label"
                                  id="dropdown-farm"
                                  name="farm_id"
                                  value={formState.farm_id}
                                  onChange={handleChange}
                                  variant="outlined"
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>

                                  {farms && farms.map((farm,index) => {
                                    return(
                                      <MenuItem value={farm._id} key={farm._id}>{farm.name} ( {farm._id} )</MenuItem>
                                    )
                                  })}

                                </Select>

                                <TextField
                                    fullWidth
                                    label="Auction description"
                                    name="description"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.description}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Starting price"
                                    name="starting_price"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.starting_price}
                                    variant="outlined"
                                />
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
    farms: PropTypes.array.isRequired,
    addAuction: PropTypes.func.isRequired,
};

export default Main;
