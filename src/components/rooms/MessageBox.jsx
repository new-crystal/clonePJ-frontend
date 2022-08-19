import styled from "styled-components";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const MessageBox = ({ chat }) => {
  //const { chatId, nickname, content, createdAt } = chat;
  //const token = localStorage.getItem("token");
  //const payload = decodeToken(token);

  //메시지 삭제시
  const onClickDelBtnHandler = () => {
    socket.emit("chatId", chat.chatId);
  };

  return (
    <Message>
      <div
      //key={chatId}
      >
        <p className="nickname">
          susu
          {/* {nickname} */}
        </p>
        <p className="time">
          2022.08.20.
          {/* {createdAt} */}
        </p>
        <button>✕</button>
      </div>
      <p className="content">
        채팅내용입니다 채팅성공하자 파이어!
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
  div {
    margin: 10px;
    display: flex;
    padding: 0px;
  }
  button {
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
    margin-left: 10px;
    font-size: 18px;
  }
`;

const ImgBox = styled.div`
  border-radius: 50%;
  background-image: url("");
  background-position: center;
  background-size: cover;
`;
export default MessageBox;
