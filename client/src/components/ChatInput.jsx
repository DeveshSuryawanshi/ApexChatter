import styled from "styled-components";
import Picker from "emoji-picker-react";
import { MdSend } from "react-icons/md";
import { FaSmileBeam } from "react-icons/fa";
import { useState } from "react";
import UserPopOver from "./UserPopOver";

export default function ChatInput({handleSendMessage}) {
  const [message, setMessage] = useState("");

  const handleEmojiClick = (emoji, event) => {
    let msg = message;
    msg += emoji.emoji;
    setMessage(msg);
  };

  const sendChat = (event) =>{
    event.preventDefault();
    if(message.length > 0){
      handleSendMessage(message);
      setMessage('');
    }
  }

  return (
    <>
      <Container>
        <ButtonContainer>
          <UserPopOver
            logo={<FaSmileBeam className="smile" />}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            anchorPosition={{ top: 530, left: 430 }}
          >
            {
              <Picker
                onEmojiClick={handleEmojiClick}
                width={300}
                height={400}
              />
            }
          </UserPopOver>
        </ButtonContainer>
        <Form onSubmit={sendChat}>
          <InputContainer>
            <Input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <SubmitBtn type="submit">
              <MdSend className="send" />
            </SubmitBtn>
          </InputContainer>
        </Form>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  padding: 10px;
  @media (max-width: 1080px) {
    grid-gap: 5px;
  }
  @media (max-width: 780px) {
    grid-gap: 10px;
  }
  @media (max-width: 430px) {
    grid-gap: 15px;
  }
`;
const ButtonContainer = styled.div`
  .smile {
    font-size: 1.5rem;
    color: #ffff00c8;
    cursor: pointer;
  }

  .emoji-picker-react{
    border-radius: 50%;
  }
`;

const Form = styled.form``;

const InputContainer = styled.div`
  width: 100%;
  border-radius: 2rem;
  display: flex;
  align-content: center;
  gap: 2rem;
  background-color: #2e2e38;

  @media (max-width: 780px) {
    width: 95%;
  }
`;
const Input = styled.input`
  width: 90%;
  height: 40px;
  background-color: transparent;
  color: white;
  border: none;
  padding-left: 1rem;
  font-size: 1.2rem;
  &::selection {
    background-color: #9186f3;
  }
  &:focus {
    outline: none;
  }

  @media (max-width: 650px) {
    font-size: 16px;
  }
`;
const SubmitBtn = styled.button`
  padding: 0.3rem 2rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8c52fe;
  border: none;

  .send {
    font-size: 2rem;
    color: white;
  }
`;
