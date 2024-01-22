import styled from "styled-components";
import Applogo from "../utils/app-logo.png"

export default function WelCome({currentUser}) {
  return (
    <>
      <Container>
        <Image src={Applogo} alt="error"/>
        <Wrapper>
            <Heading>Welcome, <Span>{currentUser.username}</Span></Heading>
            <SubTitle>Please select a chat to start messaging</SubTitle>
        </Wrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
const Image = styled.img`
width: 200px;

@media (max-width: 750px) {
  width: 150px;
}
`;
const Wrapper = styled.div`
text-align: center;
`;
const Heading = styled.h1`
color: white;
@media (max-width: 750px) {
  font-size: 22px;
}
`;
const Span = styled.span`
color: #8c52fe;
`;
const SubTitle = styled.p`
color: #2db285;
font-size: larger;
@media (max-width: 750px) {
  font-size: small;
}
`;

