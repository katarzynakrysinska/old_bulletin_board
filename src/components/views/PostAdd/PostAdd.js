import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, Paper, Button, FormControl, Select, MenuItem, Typography, InputLabel, TextField} from '@mui/material';
import { connect } from 'react-redux';
import { getUsers } from '../../../redux/userRedux.js';
import { NotFound } from '../NotFound/NotFound';
import styles from './PostAdd.module.scss';
import { fetchAdd } from '../../../redux/postsRedux';

class Component extends React.Component {

  state = {
    post: {
      title: 'Test test test',
      created: '',
      updated: '',
      status: 'draft',
      text: 'tewtewr tewt ewt wet wet wet wer trewt retretre tert ert ert ert',
      photo: '',
      price: '123',
      phone: '12344566',
      location: 'tetestset',
      email: 'test@gmail.com'
    },
  };

  handleFile = (event) => {
    const { post } = this.state;

    this.setState ({ post: { ...post, photo: event.target.files[0] },
    });
  };

  handleChange = (event) => {
    const { post } = this.state;
    this.setState({ post: { ...post, [event.target.name]: event.target.value },
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    const { post } = this.state;
    const { addNewPost } = this.props;

    let error = null;
    const emailPattern = /\S+@\S+\.\S+/;
    
    if (post.title.length < 10) {
      alert('The title is too short');
      error = 'text too short';
    } else if (post.text.length < 20) {
      alert('The content is too short');
      error = 'text too short';
    } else if (!emailPattern.test(post.email)) {
      alert('Your email adress is not valid!');
      error = 'wrong email';
    }
    if (!error ) {
      post.created = new Date().toISOString();
      post.updated = post.created;
    
      addNewPost();
      console.log('add', addNewPost(post)); 

      alert('Thank you for your add!');
      //window.location = "/";
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
        {users.isLogged === true ? (
          <Grid container align="center" justify="center">
            <Grid item align="center" xs={12} sm={9}>
              <Paper>
                <form onSubmit={submitForm}>
                  <Typography variant="h6">
                    Fill the fields to add an announcement
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
                      name="email"
                      value={post.email}
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

                  <Grid>
                    <Typography>Add photo</Typography>
                      <input className={styles.imageInput} type="file" name="photo" accept=".png, .jpg, .jpeg, .gif" onChange={this.handleFile}></input>
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
  className: PropTypes.string,
  users: PropTypes.object,
  addPost: PropTypes.func,
};

const mapStateToProps = (state) => ({
  users: getUsers(state),
});

const mapDispatchToProps = dispatch => ({
  addNewPost: (post) => dispatch(fetchAdd(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};