import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { AppStore, RootState } from "../store";
import userReducer, { UserState } from '../store/slices/user'
import userShopReducer from '../store/slices/usershop'
import shopitemReducer, { ShopItemState } from '../store/slices/shopitem'
import shopitemDetailReducer, { ShopItemDetailState } from '../store/slices/shopitemdetail'
import reviewReducer, { ReviewState } from '../store/slices/review'
import commentReducer, { CommentState } from '../store/slices/comment'
import userorderReducer, { UserOrderState } from '../store/slices/userorder'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist";
import { get } from "https";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const getMockStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
        user: userReducer,
        usershop: userShopReducer,
        shopitem: shopitemReducer,
        shopitemdetail: shopitemDetailReducer,
        review: reviewReducer,
        comment: commentReducer,
        userorder: userorderReducer
    },
    preloadedState,
  });
};

export const stubShopItemState: ShopItemState = {
  shopitems: [
    { id: 1, name: 'name', seller: 1, image_url: 'url', price: 1, rating: 1, star: 1, type: 'type' },
    { id: 2, name: 'name2', seller: 1, image_url: 'url', price: 1, rating: 1, star: 1, type: 'type' },
    { id: 3, name: 'name3', seller: 2, image_url: 'url', price: 1, rating: 1, star: 1, type: 'type' },
    { id: 4, name: 'name4', seller: 2, image_url: 'url', price: 1, rating: 1, star: 1, type: 'type' }
  ],
  current_shopitem: null
}

export const stubUserOrderState: UserOrderState = {
  userOrders: [
    { id: 1, user_id: 1, item_id: 1, status: 'shipping' }
  ]
}

export const stubReviewState: ReviewState = {
  reviews: [
    { id: 1, title: 'title', content: 'content', author: 1, review_item: 1, rating: 1, likes: 1, image_url: 'url' },
    { id: 2, title: 'title2', content: 'content2', author: 1, review_item: 1, rating: 1, likes: 1, image_url: 'url' }
  ],
  current_review: null
}

export const stubNoReviewState: ReviewState = {
  reviews: [],
  current_review: null
}

export const stubUserState: UserState = {
  users: [
    { id: 1, username: 'username1', nickname: 'nickname1', height: 1, weight: 1, gender: 'male' },
    { id: 2, username: 'username2', nickname: 'nickname2', height: 1, weight: 1, gender: 'male' },
    { id: 3, username: 'username3', nickname: 'nickname3', height: 1, weight: 1, gender: 'male' },
  ],
  currentLoggedIn: null
}

export const stubCommentState: CommentState = {
  comments: [
    { id: 1, review: 1, content: 'content1', author: 1 },
    { id: 2, review: 1, content: 'content2', author: 2 },
    { id: 3, review: 2, content: 'content3', author: 2 },
  ]
}

export const stubShopItemDetailState: ShopItemDetailState = {
  shopitem_details: [
    { id: 1, main_item: 1, color: 'red', size: 'S', left_amount: 1 },
    { id: 2, main_item: 2, color: 'red', size: 'S', left_amount: 1 },
    { id: 3, main_item: 3, color: 'red', size: 'S', left_amount: 1 }
  ]
}

const persistConfig = {
    key: 'root',
    storage
}
  
// const persistedReducer = persistReducer(persistConfig, getMockStore)

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = getMockStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}