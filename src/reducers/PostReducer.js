import {
    FETCH_ALL,
    ADD,
    SELECT_IMAGE,
    DISLIKE,
    LIKE,
    ADD_COMMENT
  } from '../actions/types';
  
  const STATE = {
    posts: []
  };
  
  const post = (state = STATE, action) => {
    switch (action.type) {
      case FETCH_ALL:
        return { ...state, posts: action.payload };
      case ADD:
        return { ...state, post: action.payload };
      case SELECT_IMAGE:
        return { ...state, post: action.payload };
      case LIKE:
        return { ...state, post: action.payload };
      case DISLIKE:
        return { ...state, post: action.payload };
      case ADD_COMMENT:
        return { ...state, post: action.payload };
      default:
        return state;
    }
  };
  
  export default post;