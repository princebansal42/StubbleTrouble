import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Avatar, Grid } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

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

const Main = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    nickname:"",
    address:"",
    lat:28.6103,
    lng:77.0379
  });

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      [event.target.name]: event.target.value
    }));

  };

  const handleSubmit = async event => {
    event.preventDefault();

  };

  const onMarkerDragEnd = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    setFormState(formState => ({
      ...formState,
      lat: lat,
      lng: lng
    }));
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
              Add Farm
            </Typography>
            <br></br>
            <form
              onSubmit={handleSubmit}
            >
              <div className={classes.fields}>
                <TextField
                  fullWidth
                  label="Farm Nickname"
                  name="nickname"
                  onChange={handleChange}
                  type="text"
                  value={formState.nickname}
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
                  name="lng"
                  onChange={handleChange}
                  type="text"
                  value={formState.lng}
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
                  initialCenter = {{ lat: formState.lat, lng: formState.lng }}
                >
                  <Marker
                    draggable={true}
                    onDragend={onMarkerDragEnd}
                    title = { 'Changing Colors Garage' }
                    position = {{ lat: formState.lat, lng: formState.lng }}
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
  className: PropTypes.string
};

export default GoogleApiWrapper({
  api: ('AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo')
})(Main);
