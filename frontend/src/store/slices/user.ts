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
      return response.data
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
<<<<<<< HEAD
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
=======
>>>>>>> f80017e4656bf09e2bc319e2c6656797c7a7b768
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentLoggedIn = {'id':1,
            'username': 'swpp',
            'nickname': 'swpp',
            'height': 180,
            'weight': 70,
            'gender': 'male'}   
        })
    },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer;