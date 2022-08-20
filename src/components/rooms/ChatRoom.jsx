import { useEffect, useState } from "react";
import io from "socket.io-client";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import MessageBox from "./MessageBox";
import { useParams } from "react-router-dom";
import { serverUrl } from "../../redux/modules";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//socket 연결
const socket = io.connect(`${serverUrl}/api/chat`, {
  path: "/socket.io",
});

const ChatRoom = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [content, setContent] = useState("");
  const [chatData, setChatData] = useState({
    chatId: 1,
    nickname: "susu",
    content,
    updatedAt: "2022.08.20.",
    roomId,
  });
  const [chats, setChats] = useState([]);

  //socket에 메시지 수신 socket.on()
  const ChatRoom = async () => {
    socket.on("ChatData", ({ chatId, nickname, content, updatedAt }) => {
      setChats([...chats, { chatId, nickname, content, updatedAt }]);
    });
    try {
      await axios.get(`${serverUrl}/api/chat/${roomId}`);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  //socket에 메시지 전송 socket.emit(이름, 내용)
  const onMessageSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === "") {
      return alert("채팅을 입력해주세요");
    } else {
      try {
        socket.emit(
          "chatData"
          // {chatId, nickname, content, updatedAt}
        );

        await axios.post(`${serverUrl}/api/chat/${roomId}`, chatData, {
          headers: {},
        });
        return;
      } catch (err) {
        console.log(err);
      }
    }
    setContent("");
  };

  //채팅방입장시
  const enterRoom = () => {
    socket.emit("room:enter");
  };

  //user가 채팅방 퇴장시
  const leaveRoom = () => {
    socket.emit("room:leave");
  };

  useEffect(() => {
    ChatRoom();
  }, []);

  const onTextChangeHandler = (e) => {
    setContent(e.target.value);
    setChatData({ ...chatData, content });
  };

  return (
    <Container onSubmit={(e) => onMessageSubmit(e)}>
      <div>
        <h1>#채팅방 이름</h1>
        <button onClick={() => navigate("/")}>채팅방 나가기</button>
      </div>
      <p>🟢online 378</p>
      <MessageBox />
      {chats?.map((chat) => {
        <MessageBox key={chat.chatId} chat={chat} />;
      })}

      <TextField
        className="text"
        onChange={(e) => onTextChangeHandler(e)}
        variant="outlined"
        label="#메시지 보내기"
        value={content}
      />
    </Container>
  );
};

const Container = styled.form`
  max-width: 1200px;
  max-height: 800px;
  width: 100vw;
  height: 100vh;
  background-color: #495057;
  margin: 0px auto;
  color: white;

  div {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    color: white;
    font-size: 30px;
  }

  button {
    background-color: #495057;
    border: 0px;
    color: white;
  }
  .text {
    background-color: #6c757d;
    border-radius: 10px;
    margin: 30px;
  }
`;

export default ChatRoom;
