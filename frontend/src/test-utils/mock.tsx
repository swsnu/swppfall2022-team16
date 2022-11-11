import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { AppStore, RootState } from "../store";
import userReducer from '../store/slices/user'
import userShopReducer from '../store/slices/usershop'
import shopitemReducer from '../store/slices/shopitem'
import shopitemDetailReducer from '../store/slices/shopitemdetail'
import reviewReducer from '../store/slices/review'
import commentReducer from '../store/slices/comment'
import userorderReducer from '../store/slices/userorder'
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