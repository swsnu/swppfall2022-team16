import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user'
import userShopReducer from './slices/usershop'
import shopitemReducer from './slices/shopitem'
import shopitemDetailReducer from './slices/shopitemdetail'
import reviewReducer from './slices/review'
import commentReducer from './slices/comment'

export const store = configureStore({
  reducer: {
    user: userReducer,
    usershop: userShopReducer,
    shopitem: shopitemReducer,
    shopitemdetail: shopitemDetailReducer,
    review: reviewReducer,
    comment: commentReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
