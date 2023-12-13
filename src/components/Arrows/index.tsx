import { ArrowProps } from "./interfaces";
import { StyledArrowContainer } from "./style";

const Arrow = ({ onClick, position, disabled, buttonStyle }: ArrowProps) => (
  <StyledArrowContainer position={position}>
    <button style={buttonStyle ?? {}} disabled={disabled} onClick={onClick}>
      {position === "left" ? <>&#x2190;</> : <>&#x2192;</>}
    </button>
  </StyledArrowContainer>
);

export default Arrow;
