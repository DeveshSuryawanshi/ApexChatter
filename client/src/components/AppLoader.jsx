import React from "react";
import styled from "styled-components";
import Logo from "../utils/app-logo.png";
import { Triangle } from "react-loader-spinner";

export default function AppLoader() {
  return (
    <>
      <Container>
        <BackGroundImage src={Logo} alt="error" />
        <BlureBackground>
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="white"
            ariaLabel="triangle-loading"
            wrapperClass=""
          />
          <SubLine>
            <span className="first">Apex</span>
            <span className="slide">
              <span className="second">Chatter</span>
            </span>
          </SubLine>
        </BlureBackground>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #191924;
`;

const BackGroundImage = styled.img`
  position: absolute;
  top: 30%;
  bottom: 50%;
  width: 300px;
  z-index: 100;
  opacity: 0.3;
`;

const BlureBackground = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 200;
  background-color: #0005;
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SubLine = styled.div`
  color: white;
  font-size: 22px;
  letter-spacing: 2px;
  display: inline-block;
  animation: fadeIn 1.5s forwards;
  opacity: 0;
  transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);

  .first{
    display: inline-block;
    animation: firstspan 1.5s forwards cubic-bezier(0.785, 0.135, 0.15, 0.86);
    z-index: 1;
    position: relative;
    font-weight: 500;
  }

  .slide{
    display: inline-flex;
    overflow: hidden;
  }

  .second{
    display: inline-block;
    font-weight:  100;
    z-index: -1;
    animation: secondspan 1.5s forwards cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }

  @keyframes fadeIn {
    0%{
      opacity: 0;
      transform: scale(1);
    }
    50%{
      opacity: 1;
      transform: scale(1.1);
    }
    100%{
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes firstspan {
    0%{
      transform: translateX(65%);
    }
    60%{
      transform: translateX(65%);
    }
    100%{ 
      transform: translateX(0%);
    }
  }
  
  @keyframes secondspan {
    0%{
      transform: translateX(-100%);
    }
    60%{
      transform: translateX(-100%);
    }
    100%{
      transform: translateX(0%);
    }
  }
`;
