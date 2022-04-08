import React from 'react';
import PropTypes from 'prop-types';

//import clsx from 'clsx';
import { Container, Paper } from '@material-ui/core';
import { Header } from '../Header/Header';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './MainLayout.module.scss';

const Component = ({children}) => (
  <Container className={styles.root} sx={{display: 'flex'}}>
    <Header></Header>
    <Paper elevation={2} className={styles.paper}>
      {children}
    </Paper>
  </Container>
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
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};