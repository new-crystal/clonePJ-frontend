import axios from "axios";
import { serverUrl } from "../redux/modules/index";

const api = axios.create({
  baseURL: `${serverUrl}`,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

export const apis = {
  //chat
  addChat: (roomId, content) => api.post(`/api/chat/${roomId}`, { content }),
  getChat: (roomId) => api.get(`/api/chat/${roomId}`),
  delChat: (chatId) => api.delete(`/api/chat/${chatId}`),
};
