import { 
  FETCH_ALL,
  ADD,
  SELECT_IMAGE,
  DISLIKE,
  LIKE,
  ADD_COMMENT
 } from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const fetchPosts = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/`)
      .child('posts')
      .on('value', snapshot => {
        if (snapshot.val() === null || snapshot.val() === undefined) {
          let arrayPosts = [];
          dispatch({ type: FETCH_ALL, payload: arrayPosts });
        } else {
          dispatch({ type: FETCH_ALL, payload: snapshot.val() });
        }
      });
  };
};

export const addPost = (image, location, description) => {
  const { currentUser } = firebase.auth();
  const date = new Date().toLocaleString();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/`)
      .child('posts')
      .push({
        username: 'Carlos Aguiar',
        userpic: 'https://instagram.fssa10-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120579636_376730860167882_5301364676953074677_n.jpg?_nc_ht=instagram.fssa10-1.fna.fbcdn.net&_nc_ohc=bC8-BPU3z4cAX-lrtaX&tp=1&oh=1d5a441c0846d3b1799c0ff373cf49ab&oe=5FF8B22F',
        date: date,
        image: image,
        title: description,
        likes: 0,
        comments_number: 0,
        location: location,
        liked: false
      })
      .then(() => {
        firebase
          .database()
          .ref(`/users/${currentUser.uid}/profile/posts_number`)
          .once('value', snapshot => {
            const posts = snapshot.val() + 1;
            firebase
              .database()
              .ref(`/users/${currentUser.uid}/profile/`)
              .update({
                posts_number: posts
              });
          });
      })
      .then(() => {
        dispatch({ type: ADD });
        Actions.reset('app');
      });
  };
};

export const selectImage = url => ({
  type: SELECT_IMAGE,
  payload: url
});

export const like = (post, likes) => {
  const { currentUser } = firebase.auth();
  const newLikes = likes + 1;

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/posts/${post}/`)
      .update({
        likes: newLikes,
        liked: true
      })
      .then(() => {
        dispatch({ type: LIKE });
      });
  };
};

export const dislike = (post, likes) => {
  const { currentUser } = firebase.auth();
  const newLikes = likes - 1;

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/posts/${post}/`)
      .update({
        likes: newLikes,
        liked: false
      })
      .then(() => {
        dispatch({ type: DISLIKE });
      });
  };
};

export const sendMessage = (post, comments, newcomment) => {
  const { currentUser } = firebase.auth();
  const newcomments = comments + 1;

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/posts/${post}/`)
      .update({
        comments_number: newcomments
      })
      .then(() => {
        firebase
          .database()
          .ref(`/users/${currentUser.uid}/posts/${post}/`)
          .child('comments')
          .push({
            username: 'Carlos Aguiar',
            message: newcomment
          });
      })
      .then(() => {
        dispatch({ type: ADD_COMMENT });
      });
  };
};
