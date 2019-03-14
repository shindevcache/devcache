import subject from '../client/reducers/reducerFunctions.js'; //can't import for some reason?

describe('Reducer Test', () => {
  let state;
  
  beforeEach(() => {
    state = {
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
      };
  });

  describe('Unrecognized action types', () => {
    it('Unrecognized action will return original state', () => {
      expect(subject(state, {type: null})).toBe(state)
    });
  });


})