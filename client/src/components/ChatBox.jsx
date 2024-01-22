import styled from "styled-components";
import ChatInput from "./ChatInput";
import { useDispatch } from "react-redux";
import { sendUserMessage } from "../redux/MessagesReducer/actions";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { getMessages } from "../Api/apis";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function ChatBox({
  currentUser,
  currentChat,
  socket,
  setIsChatting,
}) {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const GetAllMessages = async () => {
      const data = {
        from: currentUser._id,
        to: currentChat._id,
      };
      const response = await axios.post(getMessages, data);
      setMessages(response.data);
    };
    if (currentChat) {
      GetAllMessages();
    }
  }, [currentChat]);

  const handleSendMessage = async (message) => {
    const UserMessage = {
      from: currentUser._id,
      to: currentChat._id,
      message: message,
    };
    dispatch(sendUserMessage(UserMessage));

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: message,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: message });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMsg({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    console.log(arrivalMsg);
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <Header>
            <UserDetails>
              <IoIosArrowRoundBack
                className="backIcone"
                onClick={() => setIsChatting(false)}
              />
              <Avatar
                src={`data:image/svg+xml;base64,${currentChat.avatarImg}`}
                alt="UserAvatar"
              />
              <UserName>{currentChat.username}</UserName>
            </UserDetails>
          </Header>
          <MessagesList>
            {messages.map((msg, i) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      msg.fromSelf ? "sended" : "received"
                    }`}
                  >
                    <div className="content">{msg.message}</div>
                  </div>
                </div>
              );
            })}
          </MessagesList>
          <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  border-radius: 5px;
  display: grid;
  grid-template-rows: 15% 73% 12%;
  gap: 0.1rem;
  overflow: hidden;
  
  @media (max-width: 650px) {
    grid-template-rows: 10% 78% 12%;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: start;
  border-radius: 5px;
  padding: 1.5rem;
`;
const UserDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .backIcone {
    display: none;

    @media (max-width: 650px) {
      color: white;
      font-size: 30px;
      display: block;
    }
  }
`;
const Avatar = styled.img`
  width: 50px;

  @media (max-width: 650px) {
    width: 30px;
  }
`;
const UserName = styled.h3`
  color: white;
  @media (max-width: 650px) {
    font-size: medium;
  }
`;
const MessagesList = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #2db285;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }

  .message {
    display: flex;
    align-items: center;

    .content {
      max-width: 60%;
      width: max-content;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: white;

      @media (max-width: 780px) {
        padding: 10px;
        font-size: 16px;
      }
    }
  }

  .sended {
    justify-content: flex-end;

    .content {
      background-color: #2db285;
      text-align: left;
    }
  }

  .received {
    justify-content: flex-start;

    .content {
      background-color: #2e2e38;
      text-align: left;
    }
  }
`;
