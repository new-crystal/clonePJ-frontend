import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../shared/axios"

import discordLogo from "../../src_assets/discordLogo.png"


const RoomList = () => {

  const [rooms, setRooms] = useState();
  const [category, setCategory] = useState();

  const getRoomList = async () => {
    // const data = await axios.get(`/room?category=${category}`)
    const data = await axios.get('/room?category=')
    
  }

  useEffect(()=>{getRoomList()}, [])


<<<<<<< Updated upstream
const Category = () => {
  const [addRoom, setAddRoom] = useState(false);
=======

>>>>>>> Stashed changes
  return (
    <> 
      <StCategoryWrap>
        <h1>카테고리: </h1>
        <StCategoryBtn>게임</StCategoryBtn>
        <StCategoryBtn>커뮤니티</StCategoryBtn>
        <StCategoryBtn>애니/만화</StCategoryBtn>
        <StCategoryBtn>음악</StCategoryBtn>
        <StCategoryBtn>기술</StCategoryBtn>
        <StCategoryBtn>언어</StCategoryBtn>
        <StCategoryBtn>영화</StCategoryBtn>
        <StCategoryBtn>기타</StCategoryBtn>
      </StCategoryWrap>

      <StRoomList>
        <StRoomCard>
          <StRoomHead>
            <StRoomHeadImg src={discordLogo}/>
          </StRoomHead>
        </StRoomCard>
        <StRoomCard>
          <StRoomHead>
            <StRoomHeadImg src={discordLogo}/>
          </StRoomHead>
        </StRoomCard>
         <StRoomCard>
          <StRoomHead>
            <StRoomHeadImg src={discordLogo}/>
          </StRoomHead>
        </StRoomCard>
      </StRoomList>
    </>
  );
};

export default RoomList;

const StCategoryWrap = styled.form`
  margin: 100px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  & h1{
    color: white;
  }
`;

const StCategoryBtn = styled.button`
  background-color: #495057;
  color: white;
  border: 0px;
  margin: 5px;
  padding: 5px;
  font-size: large;
  cursor: pointer;
`;

const StRoomList = styled.div`
  max-width: 80%;
  min-width: 450px;
  margin: auto;
`

const StRoomCard = styled.div`
  background-color: #42414b;
  max-width: 300px;
  height: 430px;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  margin: 30px;
  `;

const StRoomHead = styled.div`
  background-color: #2e2c34;
  max-width: 450px;
  height: 80px;
`

const StRoomHeadImg = styled.img`
  width: 80px;
  height: 80px
`