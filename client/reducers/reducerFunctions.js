import * as types from '../actions/actionTypes';

const initialState = {
  username: '',
  password: '',
  fullname: '',
  email: '',
  isLoggedIn: false,
  mode: 'login', //changes between 'login', 'register', and 'main'
  snippet: '',
  comments: '',
  tags: '',
  search: '',
  userTags: [],
  taggedSnippets: [],
  accountid: '',
  currentSnippetid: ''
}

const stateReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.UPDATE_USERNAME: {
      let username = action.payload;
      return {
        ...state,
        username
      }
    }

    case types.UPDATE_PASSWORD: {
      let password = action.payload;
      return {
        ...state,
        password
      }
    }

    case types.UPDATE_FULLNAME: {
      let fullname = action.payload;
      return {
        ...state,
        fullname
      }
    }

    case types.UPDATE_EMAIL: {
      let email = action.payload;
      return {
        ...state,
        email
      }
    }

    case types.LOGIN: {
      let username = action.payload.account.username;
      let email = action.payload.account.email;
      let fullname = action.payload.account.fullname;
      let accountid = action.payload.account.id;
      let snippet = action.payload.snippets[0].snippet;
      let currentSnippetid = action.payload.snippets[0].id;
      return {
        ...state,
        username,
        email,
        fullname,
        accountid,
        snippet,
        currentSnippetid,
        isLoggedIn: true
      }
    }

    case types.UPDATE_SNIPPET: {
      let snippet = action.payload;
      return {
        ...state,
        snippet
      }
    }

    case types.UPDATE_COMMENTS: {
      let comments = action.payload;
      return {
        ...state,
        comments
      }
    }

    case types.UPDATE_TAGS: {
      let tags = action.payload;
      return {
        ...state,
        tags
      }
    }

    case types.SUBMIT_SNIPPET: {
      let snippet = '';
      let comments = '';
      let tags = '';
      return {
        ...state,
        snippet,
        comments,
        tags
      }
    }

    case types.UPDATE_SEARCH: {
      let search = action.payload;
      return {
        ...state,
        search
      }
    }

    case types.TOGGLE_MODE: {
      let mode = state.mode;
      if (mode === 'login') mode = 'register'
      else if (mode === 'register') mode = 'login'
      return {
        ...state,
        mode
      }
    }

    case types.LOGIN_FAIL: {
      return {
        ...state
      }
    }

    case types.LOGOUT: {
      return {
        username: '',
        password: '',
        fullname: '',
        email: '',
        isLoggedIn: false,
        mode: 'login',
        snippet: '',
        comments: '',
        tags: '',
        search: '',
        userTags: [],
        taggedSnippets: [],
        accountid: '',
        currentSnippetid: ''
      }
    }

    case types.DELETE_SNIPPET: {
      let snippet = '';
      return {
        ...state,
        snippet
      }
    }

    default:
      return state;
  }
}

export default stateReducer;