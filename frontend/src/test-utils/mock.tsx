import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { AppStore, RootState } from "../store";
import userReducer from '../store/slices/user'
import userShopReducer from '../store/slices/usershop'
import shopitemReducer, { ShopItemState } from '../store/slices/shopitem'
import shopitemDetailReducer from '../store/slices/shopitemdetail'
import reviewReducer from '../store/slices/review'
import commentReducer from '../store/slices/comment'
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

const persistConfig = {
    key: 'root',
    storage
}
  
const persistedReducer = persistReducer(persistConfig, getMockStore)

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