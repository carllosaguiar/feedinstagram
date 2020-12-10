import {
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    CREATE_USER,
    CREATE_USER_FAIL,
    CREATE_USER_SUCCESS
  } from '../actions/types';
  
  const STATE = {
    errorLoging: '',
    errorCreating: '',
    loading: false,
    user: null
  };
  
  const auth = (state = STATE, action) => {
    switch (action.type) {
      case CREATE_USER:
        return { ...state, ...STATE, loading: true, user: action.payload };
      case CREATE_USER_FAIL:
        return { ...state, errorCreating: 'A ação falhou! Verifique suas credenciais!', loading: false };
      case CREATE_USER_SUCCESS:
        return { ...state, loading: false, error: '' };
      case LOGIN_USER:
        return { ...state, ...STATE, loading: true, user: action.payload };
      case LOGIN_USER_FAIL:
        return { ...state, errorLoging: 'Falha na autenticação! Verifique suas credenciais!', loading: false };
      case LOGIN_USER_SUCCESS:
        return { ...state, loading: false, error: '' };
      default:
        return state;
    }
  };
  
  export default auth;