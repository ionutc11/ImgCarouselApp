import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const StyledSettings = styled.div``;

const SettingsButton = styled.button`
  position: fixed;
  right: 2rem;
  top: 1rem;
  font-size: 3rem;
  font-weight: bold;
  color: green;
  border: none;
  background: transparent;
  transition: all 0.2s;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    color: yellowgreen;
    transform: scale(1.1);
  }

  &:active {
    transform: translateY(3px);
  }
`;

interface ISettings {
  imgWidth: number;
  imgHeight: number;
  setImageWidth: (imgWidth: number) => void;
  setImgHeight: (imgHeight: number) => void;
}

const Settings = (props: ISettings) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <StyledSettings>
      <SettingsButton onClick={() => setShowModal((prevState) => !prevState)}>
        {!showModal && <>&#x2699;</>}
        {showModal && <>&#x2715;</>}
      </SettingsButton>
      {showModal && <Modal {...props} close={() => setShowModal(false)} />}
    </StyledSettings>
  );
};

export default Settings;
