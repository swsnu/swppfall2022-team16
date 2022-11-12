import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit"
import axios from "axios"
import { getMockStore, stubCommentState, stubNoReviewState, stubReviewState, stubShopItemDetailState, stubShopItemState, stubUserState } from "../../test-utils/mock"
import reducer, { fetchUsers, login, signout, signup, UserState } from "./user"

describe('user reducer', () => {
  let store: EnhancedStore<
    { shopItem: UserState },
    AnyAction,
    [ThunkMiddleware<{ shopItem: UserState }, AnyAction, undefined>]
  >
  beforeEach(() => {
    store = configureStore({ reducer: { user: reducer } })
  })
  it('should use correct initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      users: [],
      currentLoggedIn: null
    })
  })
  it('should handle fetchUsers', async () => {
    const users = stubUserState.users
    axios.get = jest.fn().mockResolvedValueOnce({
      data: users
    })
    await store.dispatch(fetchUsers())
  })
  it('should handle login', async () => {
    store = getMockStore({ user: stubUserState })
    axios.post = jest.fn().mockResolvedValueOnce({
      data: {
        id: 1
      }
    })
    await store.dispatch(login({ username: 'username', password: 'password' }))
  })
  it('should handle signup', async () => {
    store = getMockStore({ user: stubUserState })
    axios.post = jest.fn().mockResolvedValueOnce({
      data: {
        id: 1
      }
    })
    await store.dispatch(signup({
      username: 'username',
      password: 'password',
      nickname: 'nickname',
      height: 1,
      weight: 1,
      gender: 'male'
    }))
  })
  it('should handle signout', async () => {
    axios.get = jest.fn().mockResolvedValueOnce({})
    await store.dispatch(signout())
  })
})
