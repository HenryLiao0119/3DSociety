import {
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DELETE_RESET,
  USER_UPDATE_RESET,
} from '../constants/userTypes';

const initialState = {
  user: [],
  userList: [],
  userCurrent: [],
  userError: null,
  userLoading: false,
  userUpdated: false,
  userDeleted: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // user resets
    case USER_DELETE_RESET:
      return {
        ...state,
        userDeleted: false,
      };
    case USER_UPDATE_RESET:
      return {
        ...state,
        userUpdated: false,
      };
    // login user
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userCurrent: action.payload,
        userLoading: false,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        userError: action.payload,
        userLoading: false,
      };
    case USER_LOGOUT:
      return {
        user: [],
        userList: [],
        userCurrent: null,
        userError: null,
        userLoading: false,
        userUpdated: false,
        userDeleted: false,
      };
    // register user
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userCurrent: action.payload,
        userLoading: false,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        userError: action.payload,
        userLoading: false,
      };
    // get user detail
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userLoading: false,
      };
    case USER_DETAILS_FAIL:
      return {
        ...state,
        userError: action.payload,
        userLoading: false,
      };
    // update single user
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        userCurrent: action.payload,
        userLoading: false,
        userUpdated: true,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        userError: action.payload,
        userLoading: false,
      };
    // grab all users
    case USER_LIST_SUCCESS:
      return {
        ...state,
        userList: action.payload,
        userLoading: false,
      };
    case USER_LIST_FAIL:
      return {
        ...state,
        userError: action.payload,
        userLoading: false,
      };
    // delete user
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        userDeleted: true,
        userLoading: false,
      };
    case USER_DELETE_FAIL:
      return {
        ...state,
        userError: action.payload,
        userLoading: false,
      };
    // update Users admin
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        userUpdated: true,
        userLoading: false,
      };
    case USER_UPDATE_FAIL:
      return {
        ...state,
        userError: action.payload,
        userLoading: false,
      };
    default:
      return state;
  }
};
