import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
import userReducer from './slices/user'
import userShopReducer from './slices/usershop'
import shopitemReducer from './slices/shopitem'
import shopitemDetailReducer from './slices/shopitemdetail'
import reviewReducer from './slices/review'
import commentReducer from './slices/comment'
import userorderReducer from './slices/userorder'
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  user: userReducer,
  usershop: userShopReducer,
  shopitem: shopitemReducer,
  shopitemdetail: shopitemDetailReducer,
  review: reviewReducer,
  comment: commentReducer,
  userorder: userorderReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
