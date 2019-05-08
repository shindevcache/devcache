import { combineReducers } from 'redux';

//import all reducer functions here
import reducerFunctions from './reducerFunctions';

//combine reducer functions
const rootReducer = combineReducers({
  state: reducerFunctions
})

//export the combined reducer functions
export default rootReducer;