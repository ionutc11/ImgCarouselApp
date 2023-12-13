import styled from "styled-components";

export const StyledImageContainer = styled.li`
  padding: 0.5rem;
  z-index: 0;
  transition: all 0.3s;
  user-select: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    z-index: 10;
  }
`;

export const StyledImage = styled.img<{ width: string, height: string }>`
  @keyframes fade {
    0% {
      opacity: 0.4;
      transform: scale(1.05);
    }

    50% {
      opacity: 0.6;
      transform: scale(0.95);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  height: 100%;
  object-fit: fill;
  animation-name: fade;
  animation-duration: 1s;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s;
  position: relative;
  // user-drag: none;
  pointer-events: none;

  ${({ width }) => `width: ${width};`}
  ${({ height }) => `height: ${height};`}
`;
