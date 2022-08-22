import { useEffect, useState } from "react";
import io from "socket.io-client";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import MessageBox from "./MessageBox";
import { useParams } from "react-router-dom";
import { serverUrl } from "../../redux/modules";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatRoom = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [content, setContent] = useState("");
  //const token = localStorage.getItem("token");
  //const payload = decodeToken(token);
  const [chatData, setChatData] = useState({
    chatId: 1,
    nickname: "", //payload.nickname
    content: "",
    updatedAt: "",
    roomId,
    chatOwner: true,
  });
  const [chats, setChats] = useState([]);

  //socket 연결
  const socket = io.connect(`${serverUrl}/api/chat`, {
    path: "/socket.io",
  });

  //socket에 메시지 수신 socket.on()
  const chatRoom = async () => {
    socket.on(
      "ChatData",
      ({ chatId, nickname, content, updatedAt, chatOwner }) => {
        setChats([
          ...chats,
          { chatId, nickname, content, updatedAt, chatOwner },
        ]);
      }
    );
    try {
      await axios.get(`${serverUrl}/api/chat/${roomId}`);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    chatRoom();
  }, [chats]);

  //socket에 메시지 전송 socket.emit()
  const onMessageSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === "") {
      return alert("채팅을 입력해주세요");
    } else {
      try {
        socket.emit(
          "chatData"
          // {nickname, content}
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

  //user가 채팅방입장시
  // socket.on("join-room", (roomName, done) => {
  //   socket.join(roomName);
  //   done();
  //   socket
  //     .to(roomName)
  //     .emit("join-msg", `${socket["nickname"]}님께서 막 등장하셨습니다!`);
  // });

  // //user 채팅방 입장시
  // useEffect(() => {
  //   socket.on("join-msg", (msg) => {
  //     //alert(msg);
  //     setContent(msg);
  //   });
  // }, [socket]);

  //채팅방 나갈시 확인
  const onClickHomeBtnHandler = () => {
    const result = window.confirm("채팅방을 나가시겠습니까?");
    if (result) {
      navigate("/");
    }
  };

  //input 값 content에 넣어주고 chatData에 content 넣기
  const onTextChangeHandler = (e) => {
    setContent(e.target.value);
    setChatData({ ...chatData, content });
  };

  return (
    <Container onSubmit={(e) => onMessageSubmit(e)}>
      <div>
        <h1>#항해하는 3조 힘힘!!</h1>
        <button type="button" onClick={() => onClickHomeBtnHandler()}>
          채팅방 나가기
        </button>
      </div>
      <p>🟢online 378</p>
      <Messages>
        <MessageBox />
        {chats
          ?.sort((a, b) => a.time - b.time)
          .map((chat) => {
            <MessageBox key={chat.chatId} chat={chat} socket={socket} />;
          })}
      </Messages>

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

const Messages = styled.div`
  background-color: #495057;
  color: white;
  margin-top: 20px;
  display: block;
  height: 550px;
  flex-wrap: wrap;
  flex-flow: column;
  justify-content: flex-start;
  overflow-y: scroll;
`;

export default ChatRoom;
