import styled from "styled-components";
import { BREAKPOINTS } from "../../theme";

export const StyledContainer = styled.div`
  background-color: rgba(60, 60, 60, 0.2);
  box-shadow: 0 0.5rem 2rem 0.5rem rgb(60, 60, 60, 0.3);
  padding: 1.5rem 2rem;
  margin: 0 auto;
  border-radius: 3px;
  position: relative;
  width: fit-content;

  @media (max-width: ${BREAKPOINTS.M}) {
    width: fit-content;
  }
`;

export const StyledContainerHeading = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

export const StyledGrid = styled.div`
  width: 100%;
  text-align: center;
  overflow: hidden;

  // &:hover .image_container:not(:hover) {
  //   transform: scale(.9);
  // }
`;

export const StyledGridItem = styled.ul<{ width: string }>`
  list-style: none;

  ${({ width }) => `width: ${width}`};
`;
