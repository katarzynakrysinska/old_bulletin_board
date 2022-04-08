import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { CardHeader, CardContent, Card, CardActions, IconButton, Typography, Paper, Grid, Fab }  from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PhoneIcon from '@material-ui/icons/Phone';
import { getAll, deletePost, fetchAllPosts } from '../../../redux/postsRedux.js';
import { getUsers } from '../../../redux/userRedux.js';
import styles from './Homepage.module.scss';

const Component = ({ className, users, fetchPublishedPosts }) => {
  
  fetchPublishedPosts();

const posts = useSelector((state) => state.posts.data);

const handlePost = (event, postId) => {
  event.preventDefault();
  if(window.confirm("Are you sure? There are no take-backs!")) {
    deletePost(postId);
  }
};

  return (
    <div className={clsx(className, styles.root)}>
      {users.isLogged === true ? (
        <div className={styles.buttonAdd}>
          <Link to={'/post/add'} variant="subtitle1" color="secondary">
            <Fab className={styles.buttonFab}
              size="small"
              color="secondary"
              aria-label="add"
              variant="extended"
            >
            Add a new add
            </Fab>
          </Link>
        </div>
      ) : null}
      {posts.map((post) => (
        <Paper key={post.id} className={styles.component} elevation={9}>
          <Grid container spacing={3} alignContent="center" justifyContent="center">

            <Grid item xs={12} sm={5}>
              <Card>
                <CardHeader
                  title={post.title}
                  subheader={`Publication date: ${post.created}, last update: ${post.updated}`}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {post.text}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="phone">
                    <PhoneIcon />
                  </IconButton>
                  <div className={styles.linkWrapper}>
                    <Link
                      to={`/post/${post.id}/`}
                      variant="subtitle1"
                      color="secondary"
                    >
                      <Fab className={styles.buttonMore}
                        size="small"
                        color="secondary"
                        aria-label="add"
                        variant="extended"
                      >
                        More details
                      </Fab>
                    </Link>
                  </div>

                  {users.isAdmin || (users.isLogged && users.user === post.author) ? (
                    <div className={styles.linkWrapper}>
                      <Link
                        to={`/post/${post.id}/edit`}
                        variant="subtitle1"
                        color="secondary"
                      >
                        <Fab className={styles.buttonEdit}
                          size="small"
                          color="secondary"
                          aria-label="add"
                          variant="extended"
                        >
                          Edit add
                        </Fab>
                      </Link>
                    </div>
                  ) : null}
                 
                    <div className={styles.linkWrapper}>
                      <Link>
                        <Fab
                          onClick={event => handlePost(event, post.id)}
                          className={styles.buttonDelete}
                          variant="subtitle1"
                          aria-label="delete"
                          size="small"
                        >
                          DELETE
                        </Fab>
                      </Link>
                    </div>
                  
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={5}>
              <div className={styles.photoWrapper}>
                <img src={post.photo} alt={post.title} />
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  )};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  users: PropTypes.object,
  posts: PropTypes.array,
  fetchPublishedPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  users: getUsers(state),
});

const mapDispatchToProps = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId)),
  fetchPublishedPosts: () => dispatch(fetchAllPosts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};