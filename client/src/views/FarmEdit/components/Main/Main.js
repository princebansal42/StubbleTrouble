import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import SuccessSnackbar from '../SuccessSnackbar';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.white,
    padding: theme.spacing(3),
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 48,
    width: 48
  },
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  mapContainer: {
      marginTop: theme.spacing(2),
      position: 'relative',
      height: '300px',
      width: '100%'
    },
    submitButton: {
      marginTop: theme.spacing(2),
      width: '100%'
    }
}));

const FarmEdit = props => {
  const { className, id, editFarm, farm } = props;

  const classes = useStyles();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formState, setFormState] = useState({
    address:farm.address,
    area:farm.area,
    lat:farm.location.lat,
    long:farm.location.long
  });

  useEffect(() => {

  /*  setFormState(formState => ({
      address: farm.address,
      area: farm.area,
      lat: farm.location.lng,
      long: farm.location.long
    }))

*/

}, [farm]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      [event.target.name]: event.target.value
    }));

  };

  const handleSubmit = async event => {
    event.preventDefault();
    const farmDetail = {
      address: formState.address,
      location: {
        lat: formState.lat,
        long: formState.long
      },
      area: formState.area
    };
    editFarm(id, farmDetail);
    setOpenSnackbar(true);

  };

  const onMarkerDragEnd = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const long = latLng.lng();

    setFormState(formState => ({
      ...formState,
      lat: lat,
      long: long
    }));
  }

  if(!farm){
    return null;
  }

  return (
    <>
    <Card
      className={clsx(classes.root, className)}
    >
      <div>
          <div>
            <Typography
              color="initial"
              variant="h3"
            >
              Farm Id: {id}
            </Typography>
            <br></br>
            <form
              onSubmit={handleSubmit}
            >
              <div className={classes.fields}>
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
                  xs = { 12 }
                  style = { {
                    width: "100%",
                    height: "100%"
                  } }
                  google = { props.google }
                  zoom = { 14 }
                  initialCenter = {{ lat: formState.lat, lng: formState.long }}
                >
                  <Marker
                    draggable={true}
                    onDragend={onMarkerDragEnd}
                    title = { 'Changing Colors Garage' }
                    position = {{ lat: formState.lat, lng: formState.long }}
                    name = { 'Changing Colors Garage' }
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
                Save
              </Button>

            </form>
            <SuccessSnackbar
              onClose={handleSnackbarClose}
              open={openSnackbar}
            />

        </div>
      </div>
    </Card>
    </>
  );
};

FarmEdit.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  editFarm: PropTypes.func.isRequired,
  farm: PropTypes.object.isRequired,
};


export default GoogleApiWrapper({
  api: ('AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo')
})(FarmEdit);
