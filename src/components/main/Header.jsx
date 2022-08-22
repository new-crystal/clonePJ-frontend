import styled from "styled-components";
import headerImg from "../../src_assets/headerImg.JPG";
import loginBtnImg from "../../src_assets/loginBtnImg.png";

import { useNavigate } from "react-router";
import Category from "./Category";

const Header = () => {
  const navigate = useNavigate();

  return (
    <StHeader>
      <StNavContainer>
        <StNavUl>
          <StHeaderLeft onClick={() => navigate("/")} />
          <StHeaderRight onClick={() => navigate("/login")} />
        </StNavUl>
        <Category />
      </StNavContainer>
    </StHeader>
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
