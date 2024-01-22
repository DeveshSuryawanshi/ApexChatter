import { useState } from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import styled from "styled-components";

export default function UserPopOver({children, logo, transformOrigin, anchorOrigin, anchorPosition}) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Container>
        <div aria-describedby={id} variant="contained" onClick={handleClick}>
        {logo}
        </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <Typography >
            {children}
        </Typography>
      </Popover>
      </Container>
    </>
  );
}

const Container = styled.div`
margin-top: 6px;
&:hover{
    cursor: pointer;
}

.emoji-picker-react{
  background-color: black;
}
`;


