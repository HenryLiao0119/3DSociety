import {
  // USER_DETAILS_REQUEST,
  // USER_DETAILS_RESET,
  // USER_DETAILS_SUCCESS,
  // USER_DETAILS_FAIL,
  // USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  // USER_UPDATE_RESET,
  // USER_UPDATE_REQUEST,
  // USER_UPDATE_SUCCESS,
  // USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from '../constants/userTypes';

const initialState = {
  users: [],
  userCurrent: [],
  error: null,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // login user
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userCurrent: action.payload,
        loading: false,
      };
    case USER_LOGIN_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    case USER_LOGOUT:
      return { users: null, userCurrent: null, error: null };
    // reg. user
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userCurrent: action.payload,
        loading: false,
      };
    case USER_REGISTER_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    // get user detail
    // case USER_DETAILS_REQUEST:
    //   return { ...state, loading: true };
    // case USER_DETAILS_SUCCESS:
    //   return {
    //     userCurrent: action.payload,
    //     loading: false,
    //   };
    // case USER_DETAILS_FAIL:
    //   return {
    //     error: action.payload,
    //     loading: false,
    //   };
    // case USER_DETAILS_RESET:
    //   return {
    //     userCurrent: {},
    //   };
    // update users
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        userCurrent: action.payload,
        loading: false,
        success: true,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    // grab all users
    case USER_LIST_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case USER_LIST_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    // delete user
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case USER_DELETE_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
