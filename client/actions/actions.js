import * as types from '../actions/actionTypes';

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

export const loginUser = (username, password) => ({
  type: types.LOGIN_USER,
  payload: {
    username: username,
    password: password
  }
})

export const registerUser = (username, password, fullname, email) => ({
  type: types.REGISTER_USER,
  payload: {
    username: username,
    password: password,
    fullname: fullname,
    email: email
  }
})

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

export const submitSnippet = (snippet) => ({
  type: types.SUBMIT_SNIPPET,
  payload: snippet
})

export const updateSearch = (value) => ({
  type: types.UPDATE_SEARCH,
  payload: value
})


// export const UPDATE_USERNAME = "UPDATE_USERNAME";
// export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
// export const UPDATE_FULLNAME = "UPDATE_FULLNAME";
// export const UPDATE_EMAIL = "UPDATE_EMAIL";
// export const LOGIN_USER = "LOGIN_USER";
// export const REGISTER_USER = "REGISTER_USER";
// export const UPDATE_SNIPPET = "UPDATE_SNIPPET";
// export const UPDATE_COMMENT = "UPDATE_COMMENT";
// export const UPDATE_TAGS = "UPDATE_TAGS";
// export const SUBMIT_SNIPPET = "SUBMIT_SNIPPET";
// export const UPDATE_SEARCH = "UPDATE_SEARCH";