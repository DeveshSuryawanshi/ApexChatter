import styled from "styled-components";
import { IoMdLogOut } from "react-icons/io";
import {useNavigate} from "react-router-dom";
import RemoveCookie from "../cookiesAndLocalStroage/RemoveCookie";
import RemoveFromLS from "../cookiesAndLocalStroage/RemoveFromLS";

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = async() =>{
        RemoveCookie('apex-chatter-app');
        RemoveFromLS('apex-chatter-user-avatar');
        navigate('/login');
    }

  return (
    <>
      <Container onClick={handleLogout}>
        <IoMdLogOut className="icon"/>
        <LogoutText>Logout</LogoutText>
      </Container>
    </>
  );
}

const Container = styled.div`
width: max-content;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
padding: 10px 20px;
border-radius: 5px;
background-color: #8c52fe;
color: white;
cursor: pointer;
transition: .5s ease-in-out;

&:hover{
    color: black;
    background-color: #EDF2F7;
}

.icon{
    font-size: larger;
}

`;
const LogoutText = styled.div``;
