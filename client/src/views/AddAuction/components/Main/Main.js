import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import useRouter from 'utils/useRouter';

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
  const { className } = props;

  const classes = useStyles();
  const { history } = useRouter();

  const [formState, setFormState] = useState({
    title:"",
    description:"",
    start: new Date(),
    location:"",
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


  //  history.push('/dashboard/management/farms');
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
              Add Auction
            </Typography>
            <br></br>
            <form
              onSubmit={handleSubmit}
            >
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
                  label="location"
                  name="location"
                  onChange={handleChange}
                  type="text"
                  value={formState.location}
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
};

export default GoogleApiWrapper({
  api: ('AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo')
})(Main);
