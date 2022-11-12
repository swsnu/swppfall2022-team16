import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit"
import axios from "axios"
import { getMockStore, stubCommentState, stubNoReviewState, stubReviewState, stubShopItemDetailState, stubShopItemState } from "../../test-utils/mock"
import reducer, { fetchDetails, ShopItemDetailState } from "./shopitemdetail"

describe('shopitemdetail reducer', () => {
  let store: EnhancedStore<
    { shopItem: ShopItemDetailState },
    AnyAction,
    [ThunkMiddleware<{ shopItem: ShopItemDetailState }, AnyAction, undefined>]
  >
  beforeEach(() => {
    store = configureStore({ reducer: { shopitem: reducer } })
  })
  it('should use correct initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      shopitem_details: [],
    })
  })
  it('should handle fetchDetails', async () => {
    const shopitemdetails = stubShopItemDetailState
    axios.get = jest.fn().mockResolvedValueOnce({
      data: shopitemdetails
    })
    await store.dispatch(fetchDetails(1))
  })
})
