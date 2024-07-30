// src/store/reducers/index.ts

import { combineReducers } from 'redux';
import resumeReducer from './resumeData';

const rootReducer = combineReducers({
  resumeData: resumeReducer,
});

export default rootReducer;
