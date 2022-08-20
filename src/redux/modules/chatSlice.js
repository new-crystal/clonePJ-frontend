import { apis } from "../../shared/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "./index";

//룸채팅 전체조희
export const __getMessage = createAsyncThunk(
  "GET_MESSAGE",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/chat/${payload}`, {
        headers: {},
      });
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//채팅 보내기
export const __postMessage = createAsyncThunk(
  "ADD_MESSAGE",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/chat/${payload.roomId}`,
        {},
        {
          headers: {},
        }
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//채팅조회
export const __getMessagesThunk = createAsyncThunk(
  "GET_MESSAGES",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/chat`, {
        headers: {},
      });
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//채팅 삭제
export const __delMessage = async (payload, thunkAPI) => {
  try {
    await axios.delete(`${serverUrl}/api/chat/${payload}`, {
      headers: {},
    });
    return thunkAPI.fulfillWithValue(payload);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
};

const initialState = {
  result: [
    {
      roomData: {
        ownerUserId: 1,
        owner: true,
        // 주인이면 true, 아니면 false
      },
      chatData: [
        {
          chatId: 1,
          nickname: "susu",
          content: "",
          updatedAt: "",
        },
      ],
    },
  ],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: {
    ///룸 전체 채팅 조회
    [__getMessage.pending]: (state, action) => {
      state.result = action.payload.data;
    },
    [__getMessage.fulfilled]: (state, action) => {
      state.result = action.payload.data;
    },
    [__getMessage.rejected]: (state, action) => {
      state.result = action.payload.data;
    },

    //채팅 보내기
    [__postMessage.pending]: (state, action) => {
      state.result = [...state, { chatData: action.payload }];
    },
    [__postMessage.fulfilled]: (state, action) => {
      state.result = [...state, { chatData: action.payload }];
    },
    [__postMessage.rejected]: (state, action) => {
      state.result = [...state, { chatData: action.payload }];
    },

    ///채팅 조희
    [__getMessagesThunk.pending]: (state, action) => {
      state.result = action.payload.data;
    },
    [__getMessagesThunk.fulfilled]: (state, action) => {
      state.result = action.payload.data;
    },
    [__getMessagesThunk.rejected]: (state, action) => {
      state.result = action.payload.data;
    },

    ///채팅 삭제
    [__delMessage.pending]: (state, action) => {
      const target = state.result;
    },
  },
});

export const messageActions = chatSlice.actions;
export default chatSlice.reducer;
