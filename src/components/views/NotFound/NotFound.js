import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';
import { Paper, Button, Grid, Typography}  from '@material-ui/core';

//import clsx from 'clsx';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => (
  <Paper className={styles.root} elevation={9}>
    <Grid container justify="center" direction="column" alignItems="center" xl>
      <Grid item>
        <Typography className={styles.title} variant="h4" component="h2">
          Page not found
        </Typography>
      </Grid>
      <Grid item>
        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          component={Link}
          to={'/'}
        >
          Let`s go back
        </Button>
      </Grid>
    </Grid>
  </Paper>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });
// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });
// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};