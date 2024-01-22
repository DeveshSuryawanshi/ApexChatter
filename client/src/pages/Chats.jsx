import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/UserReducer/actions";
import Contacts from "../components/Contacts";
import GetCookie from "../cookiesAndLocalStroage/GetCookie";
import GetFromLocalStroage from "../cookiesAndLocalStroage/GetFromLS";
import WelCome from "../components/WelCome";
import ChatBox from "../components/ChatBox";
import { io } from "socket.io-client";
import { Host } from "../Api/apis";

export default function Chats() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState({});
  const [avatarImage, setAvatarImage] = useState("");
  const [currentChat, setCurrentChat] = useState(undefined);
  const contacts = useSelector((store) => store.UsersReducer.users);
  const socket = useRef();
  const [isChatting, setIsChatting] = useState(false);

  useEffect(() => {
    let user = GetCookie("apex-chatter-app");
    setAvatarImage(GetFromLocalStroage("apex-chatter-user-avatar"));
    if (!user) {
      navigate("/login");
    } else {
      const data = JSON.parse(user);
      setCurrentUser(data);
      if (data.isAvatar) {
        const data = JSON.parse(user);
        dispatch(getUsers(data._id));
      } else {
        navigate("/setUserAvatar");
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(Host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    setIsChatting((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <MobilChatBoxContainer>
            {isChatting ? (
              <Span>
                <ChatBox
                  currentUser={currentUser}
                  currentChat={currentChat}
                  socket={socket}
                  setIsChatting={setIsChatting}
                />
              </Span>
            ) : (
              <Contacts
                contacts={contacts}
                currentUser={currentUser}
                avatarImage={avatarImage}
                handleChatChange={handleChatChange}
              />
            )}
          </MobilChatBoxContainer>
          <ContactContainer>
            <Contacts
              contacts={contacts}
              currentUser={currentUser}
              avatarImage={avatarImage}
              handleChatChange={handleChatChange}
            />
          </ContactContainer>

          <ChatContainer>
            {currentChat !== undefined ? (
              <ChatBox
                currentUser={currentUser}
                currentChat={currentChat}
                socket={socket}
              />
            ) : (
              <WelCome currentUser={currentUser} />
            )}
          </ChatContainer>
        </Wrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const Wrapper = styled.div`
  width: 95vw;
  height: 90vh;
  background-color: #00000076;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 25% 75%;

  @media (max-width: 1554px) {
    grid-template-columns: 27% 73%;
  }
  @media (max-width: 1355px) {
    grid-template-columns: 28% 72%;
  }
  @media (max-width: 1280px) {
    grid-template-columns: 30% 70%;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 33% 67%;
  }
  @media (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
  @media (max-width: 1020px) {
    grid-template-columns: 38% 62%;
  }
  @media (max-width: 935px) {
    grid-template-columns: 40% 60%;
  }
  @media (max-width: 790px) {
    grid-template-columns: 45% 55%;
  }
  @media (max-width: 690px) {
    width: 100vw;
    height: 100vh;
  }
  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const ContactContainer = styled.div`
  overflow: hidden;
  @media (max-width: 650px) {
    display: none;
  }
`;

const ChatContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: grid;

  @media (max-width: 690px) {
    height: 100vh;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;

const MobilChatBoxContainer = styled.div`
  display: none;
  @media (max-width: 650px) {
    display: block;
    width: 100%;
    height: 100vh;
    display: grid;
    overflow: hidden;
  }
`;

const Span = styled.span`
  width: 100%;
  display: grid;
  overflow: hidden;
  @media (max-width: 650px) {
    animation: sideAnim 0.2s ease-in-out;
    @keyframes sideAnim {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(0%);
      }
    }
  }
`;
