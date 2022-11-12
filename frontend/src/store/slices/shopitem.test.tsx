import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from '@reduxjs/toolkit'
import axios from 'axios'
import { getMockStore, stubShopItemState } from '../../test-utils/mock'
import reducer, { deleteShopItem, fetchMainItems, postShopItem, putShopItem, ShopItemState } from './shopitem'

describe('shopitem reducer', () => {
  let store: EnhancedStore<{ shopitem: ShopItemState }, AnyAction, [ThunkMiddleware<{ shopitem: ShopItemState }, AnyAction, undefined>]>
  beforeEach(() => {
    store = configureStore({ reducer: { shopitem: reducer } })
  })
  it('should use correct initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      shopitems: [],
      current_shopitem: null
    })
  })
  it('should handle fetchMainItems', async () => {
    const shopitems = stubShopItemState
    axios.get = jest.fn().mockResolvedValueOnce({
      data: shopitems
    })
    await store.dispatch(fetchMainItems())
  })
  it('should handle postShopItem', async () => {
    const shopitem = stubShopItemState.shopitems[0]
    axios.post = jest.fn().mockResolvedValueOnce({
      data: shopitem
    })
    await store.dispatch(postShopItem({
      price: 1,
      type: 'clothes'
    }))
  })
  it('should handle putShopItem', async () => {
    store = getMockStore({ shopitem: stubShopItemState })
    const shopitem = stubShopItemState.shopitems[0]
    axios.put = jest.fn().mockResolvedValueOnce({
      data: shopitem
    })
    await store.dispatch(putShopItem(shopitem))
  })
  it('should handle deleteShopItem', async () => {
    store = getMockStore({ shopitem: stubShopItemState })
    axios.delete = jest.fn().mockResolvedValueOnce({})
    await store.dispatch(deleteShopItem(1))
  })
})
