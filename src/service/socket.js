import { createContext } from "react";
import io from "socket.io-client";
import { serverUrl } from "../redux/modules";

export const socket = io.connect(`${serverUrl}/api/chat`, {
  path: "/socket.io",
});

export const socketContext = createContext(socket);
