import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserPopOver from "./UserPopOver";
import Logout from "./Logout";
import { HiDotsVertical } from "react-icons/hi";
import UserInfoDrawer from "./UserInfoDrawer";

export default function Contacts({
  contacts,
  currentUser,
  avatarImage,
  handleChatChange,
}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelectedChat, setCurrentSelectedChat] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser, avatarImage]);

  const handleChangeCurrentChat = (index, contact) => {
    setCurrentSelectedChat(index);
    handleChatChange(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <Header>
            <CurrentUser>
              <CurrUserImageNameContainer>
                <CurrentUserAvatar
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                />
                <CurrentUserName>{currentUserName}</CurrentUserName>
              </CurrUserImageNameContainer>
             <UserInfoDrawer logo={<HiDotsVertical color="#2db285"/>}>
                <Logout />
             </UserInfoDrawer>
            </CurrentUser>
            {/* <SearchUser type="search" placeholder="Search User" /> */}
          </Header>
          <ContactsList>
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelectedChat ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleChangeCurrentChat(index, contact)}
                >
                  <AvatarImage
                    src={`data:image/svg+xml;base64,${contact.avatarImg}`}
                    alt="avatar"
                  />
                  <UserName>{contact.username}</UserName>
                </div>
              );
            })}
          </ContactsList>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #2e2e38;
  border-radius: 5px 0px 0px 5px;
`;

const Header = styled.div`
  padding-bottom: 10px;
  padding: 0px 10px;
`;

const CurrentUser = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 15px 15px;
  background-color: #0d0d13;
  margin: 12px auto;
  border-radius: 5px;
`;

const CurrUserImageNameContainer = styled.div` 
  width: max-content;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CurrentUserAvatar = styled.img`
  width: 60px;
  border-radius: 50%;
  border: solid black 5px;
`;

const CurrentUserName = styled.p`
  font-size: 20px;
  color: white;
  font-weight: 900;

  @media (max-width: 880px) {
    font-size: 16px;
  }
`;

const SearchUser = styled.input`
  width: 92%;
  height: 35px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 17px;
`;

const ContactsList = styled.div`
  padding: 0px 10px;
  height: 85vh;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #8c52fe;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }

  .contact {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
    padding: 10px 10px;
    margin: 10px 0px;
    border-radius: 5px;
    background-color: #191924;
    color: white;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: #0d0d13;
    }
  }

  .selected {
    /* background-color: #ffffff39; */
    background-color: #0d0d13;
    border: solid #2db285 1px;
  }
`;

const AvatarImage = styled.img`
  width: 50px;
  border-radius: 50%;
`;

const UserName = styled.p`
  font-size: 16px;
`;
