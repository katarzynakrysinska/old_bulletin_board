import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getPostById, fetchOnePostFromAPI } from '../../../redux/postsRedux.js';
import styles from './Post.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, CardActions, Collapse, IconButton, Typography, Paper, Grid, Fab } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    //transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const Component = ({ className, post, fetchOnePost}) => {

  fetchOnePost();  

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Paper className={styles.component} elevation={9}>
        <Grid container spacing={3} alignContent="center" justify="center">
          <Grid item xs={12} sm={5}>
            <div className={styles.photoWrapper}>
              <img src={post.photo} alt={post.title} />
            </div>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card>
              <CardHeader
                title={post.title}
                subheader={`Publication date: ${post.created}, last update: ${post.updated}`}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.text}
                </Typography>
              </CardContent>
              <CardActions >
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>

                <Fab
                  className={clsx(styles.buttonMore, classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                  variant="extended"
                  size="small"
                  color="secondary"
                >
                  {' '}
                  More details
                  <ExpandMoreIcon />
                </Fab>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph> Status: {post.status}</Typography>
                  <Typography paragraph> Price: {post.price}</Typography>
                  <Typography paragraph>Author:{post.author}</Typography>
                  <Typography paragraph>Phone:{post.phone}</Typography>
                  <Typography>Location:{post.location}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};


Component.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  post: getPostById(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchOnePost: () => dispatch(fetchOnePostFromAPI(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};