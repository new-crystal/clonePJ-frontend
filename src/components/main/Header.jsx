import styled from "styled-components";
import headerImg from "../../src_assets/headerImg.JPG";
import loginBtnImg from "../../src_assets/loginBtnImg.png";
import bot222 from "../../src_assets/bot222.png"

import CreateRoom from "./CreateRoom";

import Swal from "sweetalert2";
import axios from "../../shared/axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isLog, setIslog] = useState(false);
  const [addRoom, setAddRoom] = useState(false);

  const checkLoginHandler = () => {
    if (window.localStorage.getItem('token') !== null) {
      setIslog(true)
    }
  }

  const userQuitHandler = () => {
    Swal.fire({
      title: '회원 탈퇴',
      input: 'password',
      inputPlaceholder: "비밀번호 제출 시 계정이 영구 삭제됩니다",
      inputAttributes: {
        autocapitalize: 'off'
      },
      showDenyButton: true,
      denyButtonText: `취소`,
      confirmButtonText: '제출하기',
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        return axios.post('/quit', password)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            Swal.showValidationMessage(
              `요청 실패: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "계정이 삭제되었습니다."
        })
      }
    })
  }

  const logoutHandler = () => {
    return(
      Swal.fire({
        title: '로그아웃 하시겠습니까?',
        showDenyButton: true,
        confirmButtonText: '로그아웃',
        denyButtonText: `취소`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          localStorage.removeItem('token')
          .then(Swal.fire('로그아웃', '', 'success'))
        } 
      })
    )
  }

  useEffect(()=>{checkLoginHandler()})

  return (
    <>
      <StHeader>
        <StNavContainer>
          <StNavUl>
            <StHeaderLeft onClick={() => navigate("/")} />
            { {isLog} == false ? 
              <StHeaderRight onClick={() => navigate("/login")} /> :
              <StHeaderRightUser>
                <div>
                  <StDropdown>
                    <p>유저닉네임여덟글</p>
                    <StSelect onClick={() => setAddRoom(!addRoom)}>
                      ♪ 방만들기
                    </StSelect>
                    <StSelect onClick={userQuitHandler}>
                      ◌ 회원탈퇴
                    </StSelect>
                    <StSelect onClick={logoutHandler}>
                      ↩ 로그아웃
                    </StSelect>
                  </StDropdown>
                </div>
              </StHeaderRightUser>
            }
          </StNavUl>
        </StNavContainer>
      </StHeader>
      {addRoom ? <CreateRoom setAddRoom={setAddRoom} /> : null}
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
  background-color: #363E59;
  z-index: 1000;
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
  width: 45px;
  height: 45px;
  background-image: url(${bot222});
  background-size: contain;
  border-radius: 0 0 10px 10px;
  background-repeat: no-repeat;
  cursor: pointer;
  & > div{
    display: none;
  }
  :hover > div{
    color: white;
    font-weight: 700;
    padding-left: 10px;
    position: relative;
    display: block;
  }
  `;

const StDropdown = styled.div`
  background-color: #000000;
  width: 160px;
  height: 170px;
  position: absolute;
  top: 45px;
  left: -125px;
  display: block;
  border-radius: 0 0 10px 10px;
  & p {
    height: 25%;
    font-size: 16px;
    padding: 15px;
  }
`

const StSelect = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  font-size: 15px;
  font-weight: 300;
  :hover{
    transition: 0.3s ease-out;
    background-color: #52b6a8;
    color: black;
    font-weight: 500;
  }
`
