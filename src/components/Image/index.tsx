import { useState } from "react";
import { IImage } from "./interfaces";
import { StyledImage, StyledImageContainer } from "./styles";
import noPhoto from "../../assets/no-photo.jpg";

const Image = ({
  image: { src, alt, index },
  onImageClick,
  imageStyle,
  imageWidth,
  imageHeight,
}: IImage) => {
  const [source, setSource] = useState<string>(src);
  const [loading, setLoading] = useState<boolean>(true);

  const handleErr = () => {
    setSource(noPhoto);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <StyledImageContainer
      className="image_container"
      onClick={() => {
        onImageClick?.();
      }}
    >
      <StyledImage
        key={`image_${index}`}
        className="test"
        src={loading ? noPhoto : source}
        alt={alt || "image"}
        onLoad={handleLoad}
        onError={handleErr}
        style={imageStyle ?? {}}
        width={imageWidth}
        height={imageHeight}
        draggable={false}
      />
    </StyledImageContainer>
  );
};

export default Image;
