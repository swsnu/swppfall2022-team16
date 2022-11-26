import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from '@reduxjs/toolkit'
import axios from 'axios'
import { getMockStore, stubUserState } from '../../test-utils/mock'
import reducer, { fetchUsers, login, signout, signup, UserState } from './user'

describe('user reducer', () => {
  let store: EnhancedStore<{ user: UserState }, AnyAction, [ThunkMiddleware<{ user: UserState }, AnyAction, undefined>]>
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
        userlist: [
          { id: 1, username: 'username1', nickname: 'nickname1', height: 1, weight: 1, gender: 'male' },
          { id: 2, username: 'username2', nickname: 'nickname2', height: 1, weight: 1, gender: 'male' },
          { id: 3, username: 'username3', nickname: 'nickname3', height: 1, weight: 1, gender: 'male' }
        ],
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
