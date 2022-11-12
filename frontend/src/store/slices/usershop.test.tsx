import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit"
import axios from "axios"
import { getMockStore, stubCommentState, stubNoReviewState, stubReviewState, stubShopItemDetailState, stubShopItemState, stubUserOrderState } from "../../test-utils/mock"
import reducer, { fetchUserShop, UserShopInfo, UserShopState } from "./usershop"

describe('usershop reducer', () => {
  let store: EnhancedStore<
    { userShop: UserShopState },
    AnyAction,
    [ThunkMiddleware<{ userShop: UserShopState }, AnyAction, undefined>]
  >
  beforeEach(() => {
    store = configureStore({ reducer: { userShop: reducer } })
  })
  it('should use correct initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      usershop: null
    })
  })
  it('should handle fetchOrders', async () => {
    axios.get = jest.fn().mockResolvedValueOnce({
      data: {
        id: 1,
        favorite_clothes: 'favorite',
        credit: 1,
        cart: 'cart',
        purchased_item: 'purchased'
      }
    })
    await store.dispatch(fetchUserShop())
  })
})
