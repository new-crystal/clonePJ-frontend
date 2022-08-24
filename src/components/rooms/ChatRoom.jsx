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
  const [connected, setConnected] = useState(false);
  const [chatData, setChatData] = useState("");
  const [roomData, setRoomData] = useState("");
  const [chats, setChats] = useState([]);
  const token = localStorage.getItem("token");

  //socket 연결
  const socket = io.connect("http://localhost:3000", {
    path: "/socket.io",
  });

  //socket에 방 전체 기존 메시지 수신
  const chatRoom = async () => {
    socket.emit("newChat", roomId);
    const response = await axios.get(`${serverUrl}/chat/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRoomData(response.data.data.roomData);
    setChats(response.data.data.chatData);
  };

  useEffect(() => {
    chatRoom();
  }, [connected, chats]);

  useEffect(() => {
    socket.on("chatData", (chatData) => {
      axios.post(`${serverUrl}/chat/${roomId}`, chatData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  }, [socket]);

  //input 값 content에 넣어주고 chatData에 content 넣기
  const onTextChangeHandler = (e) => {
    setContent(e.target.value);
    setChatData({ ...chatData, content });
  };

  // 메시지 전송
  const onMessageSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === "") {
      return alert("채팅을 입력해주세요");
    } else {
      await axios.post(`${serverUrl}/chat/${roomId}`, chatData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConnected(!connected);
    }

    setContent("");
  };

  //user가 채팅방입장시
  socket.on("join-room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket
      .to(roomName)
      .emit("join-msg", `${socket["nickname"]}님께서 막 등장하셨습니다!`);
  });

  //user 채팅방 입장시
  useEffect(() => {
    socket.on("join-msg", (msg) => {
      alert(msg);
      //setContent(msg);
    });
  }, [socket]);

  //채팅방 나갈시 확인
  const onClickHomeBtnHandler = () => {
    const result = window.confirm("채팅방을 나가시겠습니까?");
    if (result) {
      navigate("/");
      socket.on("disconnect");
    }
  };

  //채팅방 삭제하기
  const onClickDelBtnHandler = async () => {
    const result = window.confirm("채팅방을 삭제하시겠습니까?");
    if (result) {
      await axios
        .delete(`${serverUrl}/room/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(navigate("/"));
    }
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, []);

  return (
    <Container onSubmit={(e) => onMessageSubmit(e)}>
      <div>
        {roomData.roomName === undefined ? (
          <>
            <h1>삭제된 방입니다 !</h1>
            <h1>홈으로 이동해주세요!</h1>
            <button type="button" onClick={() => navigate("/")}>
              HOME
            </button>
          </>
        ) : (
          <>
            <h1># {roomData.roomName}</h1>
            {roomData.owner ? (
              <button type="button" onClick={() => onClickDelBtnHandler()}>
                채팅방 삭제하기
              </button>
            ) : null}
            <button type="button" onClick={() => onClickHomeBtnHandler()}>
              채팅방 나가기
            </button>
          </>
        )}
      </div>
      <p>🟢online {chats.nickname}</p>
      <Messages>
        {chats?.map((chat) => {
          return <MessageBox key={chat.chatId} chat={chat} socket={socket} />;
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
    cursor: pointer;
  }
  .text {
    background-color: #6c757d;
    border-radius: 10px;
    margin: 30px;
  }
`;

const Messages = styled.section`
  background-color: #495057;
  color: white;
  margin-top: 20px;
  height: 550px;
  flex-wrap: wrap;
  flex-flow: column;
  overflow-y: scroll;
  justify-content: flex-start;
  column-gap: 0px;
  flex-direction: column;
`;

export default ChatRoom;