import React from "react";
import styled from "styled-components";
import { Modal, Box } from "@mui/material";
import { BatterySlider } from "../reusables/BatterySlider";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled(Box)`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;

export const BatterySliderModal = ({ open, handleClose, id }) => {
  return (
    <StyledModal open={open} onClose={handleClose}>
      <ModalBox>
        <BatterySlider showConfirmButton={true} size="large" />
      </ModalBox>
    </StyledModal>
  );
};
