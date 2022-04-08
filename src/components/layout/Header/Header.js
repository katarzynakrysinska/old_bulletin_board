import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { AppBar, Container, Toolbar, Typography, Button} from '@mui/material';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { getUsers } from '../../../redux/userRedux';
import styles from './Header.module.scss';

const Component = ({className, children, users}) => {

  return (
    <div className={clsx(className, styles.root)}>
    <AppBar position="sticky" className={styles.appbar}>
      <Container maxWidth="xl">
        <Toolbar className={styles.toolbar}>
            <Typography variant="h6">
              <NavLink to={'/'} className={styles.link}>
                  Bulletin Board - HOUSES and MORE
              </NavLink>
            </Typography>
          
          {users.isLogged === false ? '' : 
            <Button className={styles.link} variant="h7" href='/'>
             My Adds
            </Button>
          }
          {users.isLogged === false ? 
            <Button color="inherit" className={styles.login} href='https://google.com'>Login</Button> : <Button color="inherit" href='/'>Logout</Button>
          }
          </Toolbar>
      </Container>
    </AppBar>

    {children}
  </div>
  )
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  users: PropTypes.bool,
};

const mapStateToProps = state => ({
  users: getUsers(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const ContainerHeader = connect(mapStateToProps)(Component);

export {
  //Component as Header,
  ContainerHeader as Header,
  Component as HeaderComponent,
};
