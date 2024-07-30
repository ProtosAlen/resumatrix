// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './reducers/resumeData'; // Import your resume reducer

export interface RootState {
  resumeData: ReturnType<typeof resumeReducer>;
  // Add other reducers here if you have them
}

const store = configureStore({
  reducer: {
    resumeData: resumeReducer,
  },
});

export default store;
