import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios"
import {serverUrl} from "../../redux/modules/index.js"

import discordLogo from "../../src_assets/discordLogo.png"
import Swal from "sweetalert2";

const RoomList = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [category, setCategory] = useState("");
  
  const categories = [
    {buttonName:"전체", location:""},
    {buttonName:"게임", location:"game"},
    {buttonName:"커뮤니티", location:"community"},
    {buttonName:"애니/만화", location:"animation"},
    {buttonName:"음악", location:"music"},
    {buttonName:"기술", location:"tech"},
    {buttonName:"언어", location:"language"},
    {buttonName:"영화", location:"movie"},
    {buttonName:"기타", location:"etc"}
  ]

  const categoryHandler = (location) =>{
    setCategory(location)
  }

  const getRoomList = async () => {
    await axios.get(`${serverUrl}/room?category=${category}`)
    .then(res=> {
      setRooms(res.data.result)
    })
    .catch(error=>{
      console.log(error)
    })
  }

  useEffect(()=>{getRoomList()}, [category])

return (
    <>
      <StCategoryWrap>
        <h1>카테고리 : </h1>
        {
          categories.map((category, location)=>{
            return(
              <StCategoryBtn key={location}
                onClick={()=>categoryHandler(category.location)}
              >
                {category.buttonName}
              </StCategoryBtn>
            )
          })
        }
      </StCategoryWrap>
      <StRoomWrap>
      {
        [...rooms].map((room, roomId)=>{
          return(
            <StRoomList key={roomId}>
              <StRoomCard>
                <StRoomHead>
                  <StRoomHeadImg src={discordLogo}/>
                  <div>
                    <StRoomName>
                      {room.roomName}
                    </StRoomName>
                    <StRoomCategory>
                      {room.category}
                    </StRoomCategory>
                  </div>
                </StRoomHead>
                <StRoomContent>
                  {room.content}
                </StRoomContent>
                <StRoomBtn onClick={()=>{
                  if (window.localStorage.getItem('token') !== null) {
                    navigate(`/room/${room.roomId}`)
                  } else {
                    Swal.fire(
                      '로그인 이후 이용해주세요',
                    )
                    navigate('/login')
                  }
                }}>
                  💬 이 룸에 참가하기
                </StRoomBtn>
              </StRoomCard>
            </StRoomList>
          )
        })
      }
      </StRoomWrap>
    </>
  );
};

export default RoomList;

const StCategoryWrap = styled.div`
  margin: 100px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  & h1{
    color: white;
  }
  & > div{
    display: flex;
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
  z-index: 1;
`;

const StRoomWrap = styled.div`
  max-width: 1320px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: space-between;
`

const StRoomList = styled.div`
`

const StRoomCard = styled.div`
  background-color: #42414b;
  width: 350px;
  height: 430px;
  border-radius: 4px;
  overflow: hidden;
  margin: 10px 15px;
  position: relative;
  `;

const StRoomHead = styled.div`
  background-color: #2e2c34;
  height: 80px;
  display: flex;
`

const StRoomHeadImg = styled.img`
  width: 80px;
  height: 80px;
  display: flex;
`

const StRoomName = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin: 7px 10px;
`

const StRoomCategory = styled.div`
  width: fit-content;
  height: 30px;
  padding: 5px;
  margin: 0px 0px 5px 10px;
  text-align: inherit;
  background-color: #00807a;
  border-radius: 5px;
  color: white;
  font-weight: 900;
`

const StRoomContent = styled.div`
  width: 300px;
  margin: 10px auto;
  font-size: 20px;
  color: #adadad;
`

const StRoomBtn = styled.button`
  width: 260px;
  height: 35px;
  background-color: #2e2c34;
  color: #adadad;
  border: none;
  border-radius: 30px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  position: absolute;
  left: 40px;
  bottom: 20px;
`