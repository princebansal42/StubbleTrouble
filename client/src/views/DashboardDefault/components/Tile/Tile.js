import React from 'react';
import clsx from 'clsx';
import { Link } from'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardActionArea, CardMedia, Typography, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 600
  },
  actionArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 150,
    width: 150
  },
  icon: {
    height: 150,
    width: 150
  },
  title: {
    width:120
  },
}));

const MyFarms = props => {
  const { className, title, href, Icon, ...rest } = props;

  const classes = useStyles();


  return (
    <Link to={href} >
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardActionArea  className={classes.actionArea}>
        <CardMedia>
          <Avatar
            className={classes.avatar}
            color="inherit"
          >
            <Icon className={classes.icon} />
          </Avatar>
        </CardMedia>
        <Typography
          color="inherit"
          variant="h3"
          className={classes.title}
        >
          {title}
        </Typography>
      </ CardActionArea>
    </Card>
    </Link>
  );
};

MyFarms.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  href: PropTypes.string,
  Icon: PropTypes.object
};

export default MyFarms;
