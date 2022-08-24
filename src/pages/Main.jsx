import styled from "styled-components";
import Header from "../components/main/Header";
import RoomList from "../components/main/RoomList";

import backgroundTop from "../src_assets/backgroundTop.png"

const Main = () => {
  return (
    
    <StContainer>
      <StbackgroundTop/>
      <Header/>
      <RoomList/>
    </StContainer>

    )
};

export default Main;

const StContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #363E59;
`

const StbackgroundTop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 200px;
  background: url(${backgroundTop});
  background-repeat: repeat-x;
`