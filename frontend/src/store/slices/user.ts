import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..'

/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface User {
    id: number
    username: string
    nickname: string
    height: number
    weight: number
    gender: string
}

export interface UserState {
    users: User[],
    currentLoggedIn : User | null;
}

const initialState : UserState = {
    users : [],
    currentLoggedIn : null
}


export const login = createAsyncThunk(
    'bridgeus/login',
    async (form: { username: string, password: string }, { dispatch }) => {
      const response = await axios.post('/api/signin/', form)
      dispatch(userActions.login(response.data))
      return response.data
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        login: (state, action: PayloadAction<User>) => {
            state.users =  state.users.map(
                (value) => {
                    if (value.id === action.payload.id)
                        return action.payload;
                    else return value;    
                }
            );            
            state.currentLoggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
    },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer;