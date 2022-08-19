import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import MessageBox from "./MessageBox";
import { useParams } from "react-router-dom";

//socket 연결
const socket = io.connect("http://localhost:3001");

const ChatRoom = () => {
  const { roomId } = useParams();
  const [content, setContent] = useState("");
  const [chatData, setChatData] = useState({
    chatId: 1,
    nickname: "susu",
    content,
    createdAt: "2022.08.20.",
    roomId,
  });
  const [chats, setChats] = useState([]);

  //socket에 메시지 수신 socket.on()
  const ChatRoom = () => {
    socket.on("ChatData", ({ chatId, nickname, content, createdAt }) => {
      setChats([...chats, { chatId, nickname, content, createdAt }]);
    });
  };

  //socket에 메시지 전송 socket.emit(이름, 내용)
  const onMessageSubmit = (e) => {
    e.preventDefault();
    const content = chatData.content;
    socket.emit("content", content);
    setContent("");
  };

  //socket에 채팅방입장시
  const enterRoom = () => {
    socket.emit("room:enter");
  };

  //user가 채팅방 퇴장시
  const leaveRoom = () => {
    socket.emit("room:leave");
  };

  useEffect(() => {
    ChatRoom();
    return () => {
      socket.close();
    };
  }, []);

  const onTextChangeHandler = (e) => {
    setContent(e.target.value);
    setChatData({ ...chatData, content });
  };

  return (
    <Container onSubmit={onMessageSubmit}>
      <h1>#채팅방 이름</h1>
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
  height: 800px;
  background-color: #495057;
  margin: 0px auto;
  color: white;

  h1 {
    color: white;
    font-size: 30px;
  }

  .text {
    background-color: #ddd;
    border-radius: 10px;
    max-width: 1000px;
    width: 80vw;
    height: 50px;
    margin: 600px auto 20px 60px;
  }
`;

// const Input = styled.input`
//   background-color: #eee;
//   border: 1px solid gray;
//   border-radius: 5px;
//   max-width: 1000px;
//   width: 80vw;
//   height: 50px;
//   margin: 600px auto 20px 60px;
// `;

// const Button = styled.button`
//   background-color: #eee;
//   border: 1px solid gray;
//   border-radius: 10px;
// `;

export default ChatRoom;
