import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..'


/* eslint no-multiple-empty-lines: "error" */

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export interface User {
  id: number
  username: string
  nickname: string
  height: number
  weight: number
  gender: string
  liked_posts: string
}

export interface UserState {
  users: User[]
  currentLoggedIn: User | null
}

const initialState: UserState = {
  users: [],
  currentLoggedIn: null
}


export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async () => {
    const response = await axios.get<User[]>('/api/user/')
    return response.data
  })

export const login = createAsyncThunk(
  'user/login',
  async (form: { username: string, password: string }, { dispatch }) => {
    const response = await axios.post('/api/signin/', form)
    return response.data
  }
)

export const signup = createAsyncThunk(
  'user/signup',
  async (form: { username: string, password: string, nickname: string, height: number, weight: number, gender: string }, { dispatch }) => {
    const response = await axios.post('/api/signup/', form)
    return response.data
  }
)

export const signout = createAsyncThunk(
  'user/signout',
  async () => {
    const response = await axios.get('/api/signout/')
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    likePost: (state, action: PayloadAction<{ response: User }>) => {
      if (state.currentLoggedIn !== null)
          state.currentLoggedIn.liked_posts = action.payload.response.liked_posts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentLoggedIn = state.users.find(
        (value) => {
          return value.id === action.payload.id
        }
      )!
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.users = action.payload.userlist

      state.currentLoggedIn = state.users.find(
        (value) => {
          return value.id === action.payload.id
        }
      )!
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })
    builder.addCase(signout.fulfilled, (state, action) => {
      state.currentLoggedIn = null
    })
  }
})

export const userActions = userSlice.actions
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
