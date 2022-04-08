import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, Paper, Button, FormControl, Select, MenuItem, Typography, InputLabel, TextField} from '@mui/material';
import { connect } from 'react-redux';
import { getUsers } from '../../../redux/userRedux.js';
import { NotFound } from '../NotFound/NotFound';
import styles from './PostEdit.module.scss';
import { editPost, getPostById } from '../../../redux/postsRedux';

class Component extends React.Component {

  state = {
    post: {
      id: '',
      author: '',
      created: '',
      updated: '',
      status: '',
      title: '',
      text: '',
      photo: '',
      price: '',
      phone: '',
      location: '',
    },
    className: '',
  };

  componentWillMount() {
    const { postToEdit } = this.props;
    const { post } = this.state;
    this.setState({
      post: {
        ...post,
        id: postToEdit.id,
        author: postToEdit.author,
        created: postToEdit.created,
        updated: postToEdit.updated,
        status: postToEdit.status,
        title: postToEdit.title,
        text: postToEdit.text,
        photo: postToEdit.photo,
        price: postToEdit.price,
        phone: postToEdit.phone,
        location: postToEdit.location,
      },
    });
  }

  handleChange = ({target}) => {
    const { post } = this.state;
    const { name, value } = target;
    console.log([name], value);
    this.setState({
      post: { ...post, [name]: value },
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    const { post } = this.state;
    const { addPost } = this.props;

    let error = null;
    const emailPattern = /\S+@\S+\.\S+/;
    
    if (post.title.length < 10) {
      alert('The title is too short');
      error = 'text too short';
    } else if (post.text.length < 20) {
      alert('The content is too short');
      error = 'text too short';
    } else if (!emailPattern.test(post.author)) {
      alert('Your email adress is not valid!');
      error = 'wrong email';
    }
    if (!error ) {
      post.created = new Date().toISOString();
      post.updated = post.created;
      post.id = Math.random().toString(36).substr(2, 5);
    
      addPost({
        ...post,
        created: new Date().toISOString()
      });

      this.setState({
        post: { ...post},
      });

      alert('Thank you for your add!');
    } else {
      alert('Please correct errors before submitting your add!');
    }
  };

  render() {
    const { submitForm } = this;
    const { className, users } = this.props;
    const { post } = this.state;

    return (
      <div className={clsx(className, styles.root)}>
        {users.isAdmin || (users.isLogged && users.user === post.author) ? (
          <Grid container align="center" justify="center">
            <Grid item align="center" xs={12} sm={9}>
              <Paper>
                <form onSubmit={submitForm}>
                  <Typography variant="h6">
                    Fill the fields to update an announcement
                  </Typography>

                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="title"
                      value={post.title}
                      label="Title"
                      variant="filled"
                      onChange={this.handleChange}
                      helperText="min. 10 characters"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="text"
                      value={post.text}
                      label="Give the full description!"
                      variant="filled"
                      onChange={this.handleChange}
                      helperText="min. 20 characters"
                      fullWidth
                    />

                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="author"
                      value={post.author}
                      label="Your Email"
                      variant="filled"
                      onChange={this.handleChange}
                      helperText="Put your vaild email"
                      fullWidth
                    />

                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="location"
                      value={post.location}
                      label="Location"
                      variant="filled"
                      onChange={this.handleChange}
                      helperText="Location"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="price"
                      value={post.price}
                      label="Price"
                      variant="filled"
                      onChange={this.handleChange}
                      helperText="Price in EUR"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="phone"
                      value={post.phone}
                      label="Phone number"
                      variant="filled"
                      onChange={this.handleChange}
                      helperText="Give you contact number"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <FormControl fullWidth>
                      <InputLabel id="status">Status of your add</InputLabel>
                      <Select
                        labelId="status"
                        id="status"
                        onChange={this.handleChange}
                        fullWidth
                        variant="filled"
                        name="status"
                        value={post.status}
                      >
                        <MenuItem value="draft">draft</MenuItem>
                        <MenuItem value="published">published</MenuItem>
                        <MenuItem value="closed">closed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={9} align="center">
                    <Button className={styles.submit} variant="contained" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <NotFound />
        )}
      </div>
    )}
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  users: PropTypes.object,
  updatePost: PropTypes.func,
  postToEdit: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  users: getUsers(state),
  postToEdit: getPostById(state, props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  updatePost: (post) => dispatch(editPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostAdd,
  Container as PostEdit,
  Component as PostEditComponent,
};
