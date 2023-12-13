import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  //   backdrop-filter: blur(1px);
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Content = styled.div`
  background: rgba(0, 0, 0, 0.7);
  width: 50%;
  min-width: 400px;
  height: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  color: yellowgreen;

  h2 {
    margin: 1.5rem 0;
  }
`;

const InputContainer = styled.div`
  padding: 0.5rem;

  label {
    margin-right: 0.5rem;
  }

  input {
    background: rgba(0, 0, 0, 0.2);
    color: white;

    &:focus {
      outline: none;
    }
  }
`;

interface IModal {
  imgWidth: number;
  imgHeight: number;
  setImageWidth: (imgWidth: number) => void;
  setImgHeight: (imgHeight: number) => void;
  close: () => void;
}

const Modal = (props: IModal) => {
  const { imgWidth, setImageWidth, imgHeight, setImgHeight, close } = props;
  return (
    <ModalContainer onClick={() => close()}>
      <Content onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>
        <InputContainer>
          <label htmlFor="image_width">Image width (px):</label>
          <input
            value={imgWidth}
            onChange={(e) => setImageWidth(+e.target.value)}
            type="number"
            name="image_width"
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="image_height">Image height (px):</label>
          <input
            value={imgHeight}
            onChange={(e) => setImgHeight(+e.target.value)}
            type="number"
            name="image_height"
          />
        </InputContainer>
      </Content>
    </ModalContainer>
  );
};

export default Modal;
