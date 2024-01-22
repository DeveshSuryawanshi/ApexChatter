import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import styled from "styled-components";

export default function UserInfoDrawer({ children, logo }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };
  return (
    <>
      <Container>
        <div onClick={toggleDrawer(true)}>{logo}</div>
        <Drawer
          anchor="bottom"
          open={openDrawer}
          onClose={toggleDrawer(false)}
          className="drawer"
        >
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Content>{children}</Content>
          </div>
        </Drawer>
      </Container>
    </>
  );
}

const Container = styled.div`
`;

const Content = styled.div`
  height: 200px;
  background-color: #2e2e38;
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
