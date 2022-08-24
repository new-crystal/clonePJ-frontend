import styled from "styled-components";
import { serverUrl } from "../redux/modules/index";
import { useState } from "react";
import axios from "axios";
import { InputLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");

  const onChangeRoomNameHandler = (e) => {
    setRoomName(e.target.value);
  };

  const onChangeSelectHandler = (e0) => {
    setCategory(e0.target.value);
    console.log(category);
  };

  const onChangeContentHandler = (e1) => {
    setContent(e1.target.value);
  };

  const onClickCreateChat = async () => {
    try {
      await axios.post(
        `${serverUrl}/room`,
        {
          roomName,
          content,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BackGround>
      <Wrap>
        <h1>채팅방 만들기</h1>
        <Box>
          <FormControl fullWidth>
            <InputLabel className="label" id="category">
              Room Category
            </InputLabel>
            <Select
              className="select"
              labelId="category"
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
          className="roomName"
          type="text"
          placeholder="채팅방 이름을 적어주세요"
          value={roomName}
          onChange={(e) => {
            onChangeRoomNameHandler(e);
          }}
        />
        <input
          className="content"
          type="text"
          placeholder="채팅방 내용을 적어주세요"
          value={content}
          onChange={(e1) => {
            onChangeContentHandler(e1);
          }}
        />
        <button onClick={() => onClickCreateChat()}>채팅방 생성하기</button>
      </Wrap>
    </BackGround>
  );
};
const BackGround = styled.div`
  background-color: rgb(56, 62, 87);
  width: 100vw;
  height: 100vh;
`;

const Wrap = styled.div`
  /* background-color: rgb(50, 60, 80); */
  background-color: aliceblue;
  width: 700px;
  height: 700px;
  border-radius: 10px;
  padding: 20px;
  margin: 100px auto;
  text-align: center;

  .label {
    margin: 5px 80px;
    font-size: 30px;
  }
  .select {
    margin: 30px auto;
    width: 500px;
  }

  .roomName {
    width: 400px;
    height: 40px;
    border-radius: 5px;
    border: 0px;
    display: block;
    margin: 10px auto;
  }

  .content {
    width: 400px;
    height: 400px;
    border-radius: 5px;
    border: 0px;
    display: block;
    margin: 10px auto;
  }

  button {
    display: block;
    margin: 20px auto;
    border: 0px;
    padding: 10px;
    cursor: pointer;
  }
`;

export default CreateRoom;
