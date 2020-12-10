import {
    CREATE_USER,
    CREATE_USER_FAIL,
    CREATE_USER_SUCCESS,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS
  } from './types';
  import firebase from 'firebase';
  import { Actions } from 'react-native-router-flux';
  

  export const createUser = (email, password) => {
    return dispatch => {
        dispatch({ type: CREATE_USER});

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => createUserSuccess(dispatch, user))
            .catch(() => CREATE_USER_FAIL(dispatch));
    }
  };

  const createUserFail = dispatch => {
    dispatch({ type: CREATE_USER_FAIL });
  };
  
  const createUserSuccess = (dispatch, user) => {
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: user
    });
  
    Actions.app();
  };

  export const loginUser = (email, password) => {
    return dispatch => {
      dispatch({ type: LOGIN_USER });
  
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch));
    };
  };  
  
  const loginUserFail = dispatch => {
    dispatch({ type: LOGIN_USER_FAIL });
  };
  
  const loginUserSuccess = (dispatch, user) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    });

        Actions.app();
};