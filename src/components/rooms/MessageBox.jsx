import styled from "styled-components";
import axios from "axios";
import { serverUrl } from "../../redux/modules";
import { useState } from "react";
import discordLogo from "../../src_assets/discordLogo.png";

const MessageBox = ({ chat, socket }) => {
  const [del, setDel] = useState(false);
  //const { chatId, nickname, content, updatedAt, chatOwner } = chat;
  //const token = localStorage.getItem("token");
  //const payload = decodeToken(token);

  const chatOwner = true;

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
            {/* {payload.nickname === nickname ? null : ( */}
            <p className="nickname">
              {/* {nickname} */}
              수수
            </p>
            {/* )} */}

            <p className="time">
              {/* {updatedAt} */}
              2022.08.20.
            </p>
            {chatOwner ? (
              <button type="button" onClick={() => onClickDelBtnHandler()}>
                ✕
              </button>
            ) : null}
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
  width: 100vw;
  height: 60px;
  flex-wrap: wrap;
  flex-flow: column;
  justify-content: flex-start;
  display: block;

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
    margin-bottom: 0;
  }

  .time {
    margin-top: 4px;
    font-size: 14px;
  }

  .content {
    font-size: 18px;
    height: 20px;
    margin-left: 20px;
    margin-top: 0;
    flex: 1 1 100%;
  }
`;

const ImgBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url(${discordLogo});
  background-position: center;
  background-size: cover;
  margin-right: 10px;
`;
export default MessageBox;
