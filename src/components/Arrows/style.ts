import styled from "styled-components";

export const StyledArrowContainer = styled.div<{ position?: string }>`
  position: absolute;
  ${({ position }) =>
    position === "left"
      ? "top: 50%; left: 0; transform: translate(0, -50%);"
      : "top: 50%; right: 0; transform: translate(0, -50%);"}

  button {
    background-color: rgba(255, 255, 255, 0.4);
    padding: 0.3rem;
    font-size: 1.25rem;
    border: none;
    transition: all 0.3s;
    box-shadow: 0 0.1rem 1.5rem 0.05rem rgb(60, 60, 60, 0.3);
    cursor: pointer;

    &:active {
      transform: translateY(0.2rem);
      box-shadow: 0 0rem 1.5rem 0rem rgb(60, 60, 60, 0.3);
    }

    &:disabled {
      cursor: not-allowed;
      transform: translateY(0);
    }
  }
`;
