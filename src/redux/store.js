// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/auth-reducer";
import dashboardReducer from "./reducers/dashboard/dashboard-reducer";
import { persistReducer , FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux';


const persistConfig = {
  key: 'root',
  storage,
}
 
const reducers = combineReducers({
  authReducer,
  dashboardReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


