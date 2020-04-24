import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    Button,
    Link,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@material-ui/core";

import { GenericMoreButton, TableEditBar } from "components";

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        padding: 0,
    },
    inner: {
        minWidth: 700,
    },
    nameCell: {
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        height: 42,
        width: 42,
        marginRight: theme.spacing(1),
    },
    actions: {
        padding: theme.spacing(1),
        justifyContent: "flex-end",
    },
}));

const Results = (props) => {
    const { className, farms, deleteFarm, ...rest } = props;

    const classes = useStyles();

    const [selectedFarms, setSelectedFarms] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleSelectAll = (event) => {
        const selectedFarms = event.target.checked
            ? farms.map((farm) => farm.id)
            : [];

        setSelectedFarms(selectedFarms);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedFarms.indexOf(id);
        let newSelectedFarms = [];

        if (selectedIndex === -1) {
            newSelectedFarms = newSelectedFarms.concat(selectedFarms, id);
        } else if (selectedIndex === 0) {
            newSelectedFarms = newSelectedFarms.concat(selectedFarms.slice(1));
        } else if (selectedIndex === selectedFarms.length - 1) {
            newSelectedFarms = newSelectedFarms.concat(
                selectedFarms.slice(0, -1)
            );
        } else if (selectedIndex > 0) {
            newSelectedFarms = newSelectedFarms.concat(
                selectedFarms.slice(0, selectedIndex),
                selectedFarms.slice(selectedIndex + 1)
            );
        }

        setSelectedFarms(newSelectedFarms);
    };

    const handleChangePage = (event, page) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
    };

    const handleRowDelete = async () => {
        selectedFarms.forEach((item, i) => {
            console.log(item);
            console.log(i);
            console.log(deleteFarm);
            deleteFarm(item);
        });
    };

    const handleCancel = () => {
        setSelectedFarms([]);
    };

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <Typography color='textSecondary' gutterBottom variant='body2'>
                {farms.length} Records found. Page {page + 1} of{" "}
                {Math.ceil(farms.length / rowsPerPage)}
            </Typography>
            <Card>
                <CardHeader action={<GenericMoreButton />} title='All farms' />
                <Divider />
                <CardContent className={classes.content}>
                    <PerfectScrollbar>
                        <div className={classes.inner}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding='checkbox'></TableCell>
                                        <TableCell>Farm Id</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>latitude</TableCell>
                                        <TableCell>longitude</TableCell>
                                        <TableCell>Area</TableCell>
                                        <TableCell align='right'>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {farms.slice(0, rowsPerPage).map((farm) => (
                                        <TableRow
                                            hover
                                            key={farm._id}
                                            selected={
                                                selectedFarms.indexOf(
                                                    farm._id
                                                ) !== -1
                                            }
                                        >
                                            <TableCell padding='checkbox'>
                                                <Checkbox
                                                    checked={
                                                        selectedFarms.indexOf(
                                                            farm._id
                                                        ) !== -1
                                                    }
                                                    color='primary'
                                                    onChange={(event) =>
                                                        handleSelectOne(
                                                            event,
                                                            farm._id
                                                        )
                                                    }
                                                    value={
                                                        selectedFarms.indexOf(
                                                            farm._id
                                                        ) !== -1
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>{farm._id}</TableCell>
                                            <TableCell>
                                                <div
                                                    className={classes.nameCell}
                                                >
                                                    <div>
                                                        <Link
                                                            color='inherit'
                                                            component={
                                                                RouterLink
                                                            }
                                                            to={`/dashboard/management/farms/${farm._id}`}
                                                            variant='h6'
                                                        >
                                                            {farm._id}
                                                        </Link>
                                                        <div>{farm.email}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {farm.address}
                                            </TableCell>

                                            <TableCell>
                                                {farm.location.lat}
                                            </TableCell>
                                            <TableCell>
                                                {farm.location.long}
                                            </TableCell>
                                            <TableCell>{farm.area}</TableCell>
                                            <TableCell align='right'>
                                                <Button
                                                    color='primary'
                                                    component={RouterLink}
                                                    size='small'
                                                    to={`/dashboard/management/farms/${farm._id}`}
                                                    variant='outlined'
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </PerfectScrollbar>
                </CardContent>
                <CardActions className={classes.actions}>
                    <TablePagination
                        component='div'
                        count={farms.length}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </CardActions>
            </Card>
            <TableEditBar
                selected={selectedFarms}
                onCancel={handleCancel}
                onDelete={handleRowDelete}
            />
        </div>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    farms: PropTypes.array.isRequired,
    deleteFarm: PropTypes.func.isRequired,
};

Results.defaultProps = {
    farms: [],
};

export default Results;
