import Axios from 'axios';
/* selectors */
export const getAll = ({posts}) => posts.data;
export const getPostById = ({ posts }, id) => {
  return posts.data.filter((post) => post.id === id)[0];
};

export const getAllPublished = ({posts}) => posts.data.filter(item => item.status === 'published');
export const getLoadingState = ({posts}) => posts.loading;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_POSTS = createActionName('FETCH_POSTS');
const FETCH_ONE_POST = createActionName('FETCH_ONE_POST');

const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');
const DELETE_POST = createActionName('DELETE_POST'); 
/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchPosts = payload => ({payload, type: FETCH_POSTS});
export const fetchOnePost = payload => ({payload, type: FETCH_ONE_POST});

export const addPost = (payload) => ({ payload, type: ADD_POST });
export const editPost = (payload) => ({ payload, type: EDIT_POST });
export const deletePost = (payload) => ({ payload, type: DELETE_POST });
/* thunk creators */

export const fetchAllPosts = () => async (dispatch, getState) => {
  const {posts} = getState();

  if (!posts.data.length) {
    dispatch(fetchStarted());
    await Axios.get('http://localhost:8000/api/posts')
      .then(res => {
        dispatch(fetchPosts(res.data));
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  }
};

export const fetchOnePostFromAPI = (_id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios.get(`http://localhost:8000/api/posts/${_id}`)
      .then((res) => {
        dispatch(fetchOnePost(res.data));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchAdd = (post) => {
  console.log('Added post:', post);

  return (dispatch, getState) => {
    const state = getState();
    const userId = state.users.userId
    dispatch(fetchStarted());

    const fd = new FormData();
    for(const key in post) {
      fd.append(key, post[key])
    }
    fd.append('author', userId);

    Axios.post('http://localhost:8000/api/posts', fd, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        dispatch(addPost(post));
        dispatch(fetchSuccess(post));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchRemove = (postId) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios.delete('http://localhost:8000/api/posts/' + postId)
      .then((res) => {
        dispatch(deletePost(postId));
        dispatch(fetchSuccess());
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
    case EDIT_POST: {
      return {
        ...statePart,
        data: [
          ...statePart.data.map((post) =>
            post.id === action.payload.id ? action.payload : post
          ),
        ],
      };
    }
   case DELETE_POST: {
    return {
    ...statePart,
    data: [...statePart.data.filter(post => post.id !== action.payload)],
    };
    }
   
    default:
      return statePart;
  }
};