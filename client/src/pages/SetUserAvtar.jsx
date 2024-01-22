import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { multiAvatarApi, setAvatarApi } from "../Api/apis";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { Bars } from "react-loader-spinner";
import GetCookie from "../cookiesAndLocalStroage/GetCookie";
import SetCookie from "../cookiesAndLocalStroage/SetCookie";
import SetToLocalStroage from "../cookiesAndLocalStroage/SetToLS";

export default function SetUserAvtar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    let user = GetCookie("apex-chatter-app");
    if (!user) {
      navigate("/login");
    }
  });

  const handleSetProfile = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an Avatar", ToastOptions);
    } else {
      let user = JSON.parse(GetCookie("apex-chatter-app"));
      try {
        const { data } = await axios.post(`${setAvatarApi}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
        if (data.isSet) {
          SetToLocalStroage("apex-chatter-user-avatar", data.image);
          user.isAvatar = true;
          SetCookie("apex-chatter-app", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("Error setting avatar. Please try again", ToastOptions);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getAvatars = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${multiAvatarApi}/${Math.random() * 1000}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAvatars();
  }, []);

  return (
    <>
      <Container>
        <Header>
          <Heading>Pick an avatar as your profile picture</Heading>
        </Header>
        <Avatars>
          {isLoading ? (
            <Bars
              height="50"
              width="50"
              color="white"
              ariaLabel="bars-loading"
              visible={true}
            />
          ) : (
            avatars?.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAvatar(index)}
                >
                  <Image
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="error"
                  />
                </div>
              );
            })
          )}
        </Avatars>
        <SetProfileBtn onClick={handleSetProfile}>
          Set as your Profile Picture
        </SetProfileBtn>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const Header = styled.div``;

const Heading = styled.div`
  color: white;
  font-size: 30px;
  font-weight: 600;
  border: solid #8c52fe 1px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #2e2e38;
  animation: fadeIn 1.5s forwards;

  @media (max-width: 830px){
    font-size: 23px;
  }

  @media (max-width: 450px){
    font-size: 18px;
  }
  
  @media (max-width: 350px){
    font-size: 15px;
  }

  @media (max-width: 300px){
    font-size: 12px;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const Avatars = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  
  @media (max-width: 300px){
    gap: 10px;
  }

  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: solid 5px transparent;
    padding: 10px;
    transition: 0.5s ease-in-out;
    animation: fadeIn 1.5s forwards;

    &:hover {
      border: solid 5px #8c52fe;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .selected {
    border: solid 5px #38a169;
  }
`;

const Image = styled.img`
  width: 150px;
  cursor: pointer;

  @media (max-width: 830px){
    width: 100px;
  }
  
  @media (max-width: 350px){
    width: 80px;
  }
  
  @media (max-width: 300px){
    width: 50px;
  }
`;

const SetProfileBtn = styled.button`
  padding: 10px 20px;
  font-size: larger;
  border: none;
  border-radius: 5px;
  background-color: #8c52fe;
  color: white;
  font-weight: 600;
  transition: 0.5s ease-in-out;
  animation: fadeIn 1.5s forwards;

  @media (max-width: 350px){
    font-size: medium;
  }

  @media (max-width: 300px){
    font-size: 12px;
  }

  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
