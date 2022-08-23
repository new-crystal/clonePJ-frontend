import styled from "styled-components";
import { serverUrl } from "../../redux/modules";
import { useState } from "react";
import axios from "axios";
import { InputLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Box } from "@material-ui/core";

const CreateRoom = ({ setAddRoom }) => {
  const [roomName, setRoomName] = useState("");
  const [category, setCategory] = useState("");

  const onChangeRoomNameHandler = (e) => {
    setRoomName(e.target.value);
  };

  const onChangeSelectHandler = (e0) => {
    setCategory(e0.target.value);
  };

  const onClickCreateChat = async (roomName) => {
    if (roomName.trim() === "") {
      return alert("채팅방 이름을 입력해주세요!");
    } else {
      try {
        await axios.post(
          `${serverUrl}/api/room`,
          {
            roomName,
            category,
          },
          { headers: {} }
        );
        return setAddRoom(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Wrap>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="category">채팅방 카테고리</InputLabel>
          <Select
            labelID="category"
            value={category}
            onChange={(e0) => onChangeSelectHandler(e0)}
          >
            <MenuItem value="game">게임</MenuItem>
            <MenuItem value="community">커뮤니티</MenuItem>
            <MenuItem value="animation">애니/만화</MenuItem>
            <MenuItem value="music">음악</MenuItem>
            <MenuItem value="tech">기술</MenuItem>
            <MenuItem value="language">언어</MenuItem>
            <MenuItem value="movie">영화</MenuItem>
            <MenuItem value="etc">기타</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <input
        type="text"
        placeholder="채팅방 이름을 적어주세요"
        value={roomName}
        onChange={(e) => {
          onChangeRoomNameHandler(e);
        }}
      />
      <button onClick={() => onClickCreateChat()}>채팅방 생성하기</button>
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

  input {
    width: 300px;
    height: 40px;
    border-radius: 5px;
    border: 0px;
    display: block;
    margin: 10px auto;
  }

  button {
    display: block;
    margin: 20px auto;
  }
`;

export default CreateRoom;
