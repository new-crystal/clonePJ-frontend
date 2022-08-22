import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { serverUrl } from "../../redux/modules";
import CreateRoom from "./CreateRoom";

const Category = () => {
  const [addRoom, setAddRoom] = useState(false);
  const [chatRoom, setChatRoom] = useState("");

  const getChatRoom = async () => {
    const res = await axios.get(`${serverUrl}/api/room`);
    setChatRoom(res);
  };

  useEffect(() => {
    getChatRoom();
  }, []);

  return (
    <>
      <CategoryWrap>
        <h1>카테고리: </h1>
        <CategoryBtn>게임</CategoryBtn>
        <CategoryBtn>커뮤니티</CategoryBtn>
        <CategoryBtn>애니/만화</CategoryBtn>
        <CategoryBtn>음악</CategoryBtn>
        <CategoryBtn>기술</CategoryBtn>
        <CategoryBtn>언어</CategoryBtn>
        <CategoryBtn>영화</CategoryBtn>
        <CategoryBtn>기타</CategoryBtn>
      </CategoryWrap>
      <button>최근갱신</button>
      <button onClick={() => setAddRoom(!addRoom)}>서버생성하기</button>
      {addRoom ? <CreateRoom setAddRoom={setAddRoom} /> : null}
    </>
  );
};

const CategoryWrap = styled.div`
  margin: 100px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    color: white;
  }
`;

const CategoryBtn = styled.button`
  background-color: #495057;
  color: white;
  border: 0px;
  margin: 5px;
  padding: 5px;
  font-size: large;
`;
export default Category;
