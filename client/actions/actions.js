import * as types from '../actions/actionTypes';
import Axios from 'axios';

export const updateUsername = (value) => ({
  type: types.UPDATE_USERNAME,
  payload: value
})

export const updatePassword = (value) => ({
  type: types.UPDATE_PASSWORD,
  payload: value
})

export const updateFullname = (value) => ({
  type: types.UPDATE_FULLNAME,
  payload: value
})

export const updateEmail = (value) => ({
  type: types.UPDATE_EMAIL,
  payload: value
})

export const loginUser = (username, password) => dispatch => {
  return Axios('/login', {username: username, password: password})
    .then(userInfo => dispatch(logIn(userInfo)))
    .catch(err => dispatch(err)) // ???
}

export const logIn = (userInfo) => ({
  type: types.LOGIN,
  payload: userInfo
})

export const registerUser = (username, password, fullname, email) => dispatch => {
  return Axios('/signup', {username: username, password: password, fullname: fullname, email: email})
    .then(userInfo => dispatch(logIn(userInfo)))
    .catch(err => dispatch(err))  
}

export const updateSnippet = (value) => ({
  type: types.UPDATE_SNIPPET,
  payload: value
})

export const updateComment = (value) => ({
  type: types.UPDATE_COMMENT,
  payload: value
})

export const updateTags = (value) => ({
  type: types.UPDATE_TAGS,
  payload: value
})

export const submitSnippet = (snippet, tags) => ({ //
  type: types.SUBMIT_SNIPPET,
  payload: {
    snippet: snippet,
    tags: tags
  }
})

export const updateSearch = (value) => ({
  type: types.UPDATE_SEARCH,
  payload: value
})

export const toggleMode = () => ({
  type: types.TOGGLE_MODE,
})