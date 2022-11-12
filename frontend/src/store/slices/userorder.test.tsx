import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit"
import axios from "axios"
import { getMockStore, stubCommentState, stubNoReviewState, stubReviewState, stubShopItemDetailState, stubShopItemState, stubUserOrderState } from "../../test-utils/mock"
import reducer, { fetchOrders, UserOrderState } from "./userorder"

describe('userorder reducer', () => {
  let store: EnhancedStore<
    { userOrder: UserOrderState },
    AnyAction,
    [ThunkMiddleware<{ userOrder: UserOrderState }, AnyAction, undefined>]
  >
  beforeEach(() => {
    store = configureStore({ reducer: { userOrder: reducer } })
  })
  it('should use correct initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      userOrders: []
    })
  })
  it('should handle fetchOrders', async () => {
    const userOrders = stubUserOrderState
    axios.get = jest.fn().mockResolvedValueOnce({
      data: userOrders
    })
    await store.dispatch(fetchOrders())
  })
})
