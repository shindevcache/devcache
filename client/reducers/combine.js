import { combineReducers } from 'redux';

//import all reducer functions here
import reducerFunctions from './reducerFunctions';

//combine reducer functions
const reducers = combineReducers({
  state: reducerFunctions
})

//export the combined reducer functions
export default reducers;