import styled from "styled-components";
import { serverUrl } from "../../redux/modules";
import { io } from "socket.io-client";
import { useState } from "react";

const CreateRoom = ({ setAddRoom }) => {
  const [roomName, setRoomName] = useState("");
  const [category, setCategory] = useState("");
  const [roomData, setRoomData] = useState({
    roomName: "",
    category: "",
  });

  const socket = io.connect(`${serverUrl}/api/chat`, {
    path: "/socket.io",
  });

  const onChangeRoomNameHandler = (e) => {
    setRoomName(e.target.value);
    setRoomData({ ...roomData, roomName });
  };

  const onClickCreateChat = (roomName) => {
    socket.emit("roomData", roomData, () => {});
  };

  return (
    <Wrap>
      <input type="radio" name="category" value="game" />
      <label for="game">게임</label>
      <input type="radio" name="category" value="community" />
      <label for="community">커뮤니티</label>
      <input type="radio" name="category" value="anime-manga" />
      <label for="anime-manga">애니/만화</label>
      <input type="radio" name="category" value="music" />
      <label for="music">음악</label>
      <input type="radio" name="category" value="technology" />
      <label for="technology">기술</label>
      <input type="radio" name="category" value="language" />
      <label for="language">언어</label>
      <input type="radio" name="category" value="movies" />
      <label for="movies">영화</label>
      <input type="radio" name="category" value="other" />
      <label for="other">기타</label>
      <br />
      <input
        type="text"
        placeholder="채팅방 이름을 적어주세요"
        value={roomName}
        onChange={(e) => {
          onChangeRoomNameHandler(e);
        }}
      />
      <button onClick={() => setAddRoom(false)}>룸 생성하기</button>
    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: #6c757d;
  width: 500px;
  height: 500px;
  position: relative;
  top: -200px;
  left: 50px;
`;

export default CreateRoom;
