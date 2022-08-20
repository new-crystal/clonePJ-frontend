import styled from "styled-components";
import Header from "../components/main/Header";

import backgroundTop from "../src_assets/backgroundTop.png"

const Main = () => {
  return (
    
    <StContainer>
      <StbackgroundTop/>
      <Header/>
    </StContainer>

    )
};

export default Main;

const StContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #363E59;
`

const StbackgroundTop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: url(${backgroundTop});
  background-repeat: repeat-x;
`