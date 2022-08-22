import styled from "styled-components";
import headerImg from "../../src_assets/headerImg.JPG";
import loginBtnImg from "../../src_assets/loginBtnImg.png";
import bot222 from "../../src_assets/bot222.png"

import { useNavigate } from "react-router";

const Header = (props) => {
  const navigate = useNavigate();


  const user = "123"

  return (
    <>
      <StHeader>
        <StNavContainer>
          <StNavUl>
            <StHeaderLeft onClick={() => navigate("/")} />
            { {user} == null ? 
              <StHeaderRight onClick={() => navigate("/login")} /> :
              <StHeaderRightUser>
                <p>닉네임</p>
              </StHeaderRightUser>
            }
          </StNavUl>
        </StNavContainer>
      </StHeader>
      <StDropdown/>
    </>
  );
};

export default Header;

const StHeader = styled.header`
  max-width: 1350px;
  min-width: 400px;
  height: 45px;
  margin: auto;
  z-index: 1;
  position: sticky;
  top: 0;
`;
const StNavContainer = styled.nav``;

const StNavUl = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StHeaderLeft = styled.li`
  width: 140px;
  height: 45px;
  background-image: url(${headerImg});
  background-size: contain;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
`;

const StHeaderRight = styled.li`
  width: 140px;
  height: 45px;
  background-image: url(${loginBtnImg});
  background-size: contain;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
`;

const StHeaderRightUser = styled.li`
  width: 140px;
  height: 45px;
  background-image: url(${bot222});
  background-size: contain;
  border-radius: 0 0 10px 10px;
  background-repeat: no-repeat;
  cursor: pointer;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  & p{
    color: white;
    display: flex;
    font-weight: 700;
    padding-left: 10px;
    position: relative;
  }
`;

const StDropdown = styled.div`
  background-color: green;
  width: 100px;
  height: 100px;
  position: absolute;
  display: block;
`
