import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlgin: 'center'
  },
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 250,
    width: 250
  },
  icon: {
    height: 250,
    width: 250
  },
  removeBotton: {
    width: '100%'
  }
}));

const ProfileDetails = props => {
  const { profile, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>

        <Avatar
          className={classes.avatar}
          color="inherit"
        >
          <AccountCircleIcon className={classes.icon} />
        </Avatar>
        <Typography
          className={classes.name}
          gutterBottom
          variant="h2"
        >
          {profile.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="h4"
        >
          {profile.email}
        </Typography>
        <Typography
          color="textSecondary"
          variant="h4"  
        >
          {profile.userType}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
        variant="text"
          className={classes.removeBotton}
        >
          Remove picture
        </Button>
      </CardActions>
    </Card>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default ProfileDetails;
