import styled from "styled-components";
import io from "socket.io-client";
import axios from "axios";
import { serverUrl } from "../../redux/modules";
import { useState } from "react";

const socket = io.connect("http://localhost:3001");

const MessageBox = ({ chat }) => {
  const [del, setDel] = useState(false);
  //const { chatId, nickname, content, updatedAt } = chat;
  //const token = localStorage.getItem("token");

  //메시지 삭제시
  const onClickDelBtnHandler = async () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      try {
        socket.emit("chatId", chat.chatId);
        await axios.delete(`${serverUrl}/api/chat/${chat.chatId}`, {
          headers: {},
        });
        return setDel(true);
      } catch (err) {
        return console.log(err);
      }
    }
  };

  return (
    <Message
    //key={chatId}
    >
      <div className="name">
        {del ? (
          <p> 삭제된 메시지입니다.</p>
        ) : (
          <>
            <ImgBox></ImgBox>
            <p className="nickname">
              {/* {nickname} */}
              수수
            </p>
            <p className="time">
              {/* {updatedAt} */}
              2022.08.20.
            </p>
            <button type="button" onClick={() => onClickDelBtnHandler()}>
              ✕
            </button>
          </>
        )}
      </div>
      <p className="content">
        채팅성공하자 파이팅!
        {/* {content} */}
      </p>
    </Message>
  );
};

const Message = styled.div`
  background-color: #495057;
  color: white;
  margin-top: 20px;
  margin-left: 20px;
  display: block;
  height: 550px;
  flex-wrap: wrap;
  flex-flow: column;
  justify-content: flex-start;
  overflow-y: scroll;

  .wrap {
    height: 600px;
  }

  .name {
    margin: 10px;
    display: flex;
    padding: 0px;
    height: 25px;
    justify-content: flex-start;
  }

  & button {
    color: white;
    background-color: #495057;
    border: 0px;
    margin-left: 50px;
  }

  .nickname {
    font-weight: bold;
    font-size: 20px;
    margin-right: 30px;
  }

  .time {
    margin-top: 4px;
    font-size: 14px;
  }

  .content {
    font-size: 18px;
    height: 20px;
    margin: 0;
    flex: 1 1 100%;
  }
`;

const ImgBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-image: url("");
  background-position: center;
  background-size: cover;
`;
export default MessageBox;
