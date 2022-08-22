import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

import axios from '../../shared/axios.js'
import { getCookie } from '../../util/cookie'

export const onSilentRefresh = createAsyncThunk(
    "onSilentRefresh",
    async (payload, api) => {
      try {
        const user = api.getState().user
        const today = new Date().getTime()
        let flag = false
        if(user.accessToken) {
            if(user.expireTime < today - 300000) flag = true
        } else {
            if(getCookie('refreshToken')) flag = true
        }
        let newAccessToken = null
        if(flag) {
            const result = await axios.post('/user/token', {'refreshToken': getCookie('refreshToken')})
            newAccessToken = result.data.data
        }
        return api.fulfillWithValue(newAccessToken);
      } catch (err) {
        return api.rejectWithValue();
      }
    }
  );

const userSlice = createSlice({
    name: "user",
    initialState: {
        loginUser: null,
        accessToken: null,
        expireTime: null
    },
    reducers: {
        SET_TOKEN: (state, action) => {
            state.loginUser = jwtDecode(action.payload).userId;
            state.accessToken = action.payload;
            state.expireTime = jwtDecode(action.payload).exp * 1000;
        },
        DELETE_TOKEN: (state) => {
            state.loginUser = null;
            state.accessToken = null;
            state.expireTime = null
        }
    },
    extraReducers: {
        [onSilentRefresh.fulfilled]: (state, action) => {
            if(action.payload)  {
              state.loginUser = jwtDecode(action.payload).userId
              state.accessToken = action.payload
              state.expireTime = jwtDecode(action.payload).exp * 1000
            }
        },
        [onSilentRefresh.rejected]: (state, action) => {
          // 에러대기
        }
      },
})

export const { SET_TOKEN, DELETE_TOKEN } = userSlice.actions
export default userSlice.reducer