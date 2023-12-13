import { useState, useMemo, useEffect } from "react";
import useResize from "../../hooks/useResize";
import { ICarousel } from "./interfaces";
import Arrow from "../Arrows";
import Image from "../Image";

import {
  StyledContainer,
  StyledGrid,
  StyledGridItem,
} from "../Container/style";
import { BREAKPOINTS } from "../../theme";
import { mockImages } from "../../mocks/mocks";
import Settings from "../Settings";

const Carousel = ({
  images,
  onImageClick,
  containerStyle,
  buttonStyle,
  imageStyle,
  imageContainerStyle,
  showSettings,
}: ICarousel) => {
  const imageItems =
    images || mockImages.map((img, index) => ({ ...img, index }));
  const [currentImageIdxs, setCurrentImageIdxs] = useState<number[]>([0, 1, 2]);
  const visibleImages = useMemo(
    () => currentImageIdxs.length,
    [currentImageIdxs]
  );

  // started with img padding of 16.5 and imgExtraWidth 16.5
  const imgPadding = 15;
  const imgExtraWidth = 16;

  const [imgWidth, setImgWidth] = useState<number>(300);
  const [imgHeight, setImgHeight] = useState<number>(250);
  const [mousePressed, setMousePressed] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | null>(null);

  const handleArrowLeftClick = (skippedImages: number) => {
    if (currentImageIdxs.includes(0)) {
      return;
    }

    setCurrentImageIdxs((prevState) =>
      prevState.map((value) => value - skippedImages)
    );
  };

  const handleArrowRightClick = (skippedImages: number) => {
    const highestPossibleIndex = imageItems.length - 1;
    if (currentImageIdxs.includes(highestPossibleIndex)) {
      return;
    }
    // prevents skipping too much ( more then available images )
    if (
      currentImageIdxs[currentImageIdxs.length - 1] + skippedImages >
      highestPossibleIndex
    ) {
      setCurrentImageIdxs(
        imageItems
          .map((_, index) => index)
          .slice(imageItems.length - visibleImages)
      );
    } else {
      setCurrentImageIdxs((prevState) =>
        prevState.map((value) => skippedImages + value)
      );
    }
  };

  const handleResize = () => {
    const mediaQueryM = window.matchMedia(`(max-width: ${BREAKPOINTS.M})`);
    const mediaQueryL = window.matchMedia(`(max-width: ${BREAKPOINTS.L})`);
    const mediaQueryXL = window.matchMedia(`(max-width: ${BREAKPOINTS.XL})`);

    if (mediaQueryXL.matches) {
      setCurrentImageIdxs([0, 1, 2]);
    }

    if (mediaQueryL.matches) {
      setCurrentImageIdxs([0, 1]);
    }

    if (mediaQueryM.matches) {
      setCurrentImageIdxs([0]);
    }
  };

  useResize(handleResize);

  const resetMovement = () => setStartX(null);
  const checkMovementMade = () => startX !== null;

  useEffect(() => {
    if (!mousePressed && checkMovementMade()) {
      resetMovement();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePressed, startX]);

  const handleMovement = (stopX: number) => {
    setMousePressed(false);
    const carousel = document.getElementById("carousel_content");
    if (carousel) {
      let bruteSkipValue = (startX! - stopX) / (imgWidth + imgExtraWidth);
      if (bruteSkipValue < 0) {
        bruteSkipValue = -1 * bruteSkipValue;
      }
      const skippedImages = Math.ceil(bruteSkipValue);
      if (startX! > stopX!) {
        handleArrowRightClick(skippedImages);
      } else if (startX! < stopX!) {
        handleArrowLeftClick(skippedImages);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setMousePressed(true);
    setStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!mousePressed) {
      return;
    }
    handleMovement(e.clientX);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!mousePressed) {
      return;
    }
    setMousePressed(false);
    handleMovement(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mousePressed) {
      return;
    }

    const carousel = document.getElementById("carousel_content");

    if (carousel) {
      const swipeTranslateValue: number =
        -currentImageIdxs[0] * (imgWidth + imgExtraWidth) - startX! + e.clientX;

      const movingRightWithoutImage =
        currentImageIdxs.includes(imageItems.length - 1) && startX! > e.clientX;
      if (swipeTranslateValue > 0 || movingRightWithoutImage) {
        return;
      }
      carousel.style.transform = `translateX(${swipeTranslateValue}px)`;
    }
  };

  return (
    <StyledContainer style={containerStyle ?? {}}>
      {showSettings && (
        <Settings
          imgWidth={imgWidth}
          setImageWidth={setImgWidth}
          imgHeight={imgHeight}
          setImgHeight={setImgHeight}
        />
      )}
      <Arrow
        onClick={() => handleArrowLeftClick(1)}
        position="left"
        disabled={currentImageIdxs.includes(0)}
        buttonStyle={buttonStyle}
      />
      <StyledGrid
        style={{ width: (imgWidth + imgPadding) * visibleImages + "px" }}
      >
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <StyledGridItem
            id="carousel_content"
            width={`${imageItems.length * (imgWidth + imgPadding)}px`}
            style={{
              display: "flex",
              transition: "transform 0.5s ease-out",
              transform: `translateX(-${
                currentImageIdxs[0] * (imgWidth + imgExtraWidth)
              }px)`,
              ...(imageContainerStyle ?? {}),
            }}
          >
            {imageItems.map((image, index) => (
              <Image
                key={`container_image_${index}`}
                image={image}
                onImageClick={onImageClick}
                imageStyle={imageStyle}
                imageWidth={imgWidth + "px"}
                imageHeight={imgHeight + "px"}
              />
            ))}
          </StyledGridItem>
        </div>
      </StyledGrid>
      <Arrow
        onClick={() => handleArrowRightClick(1)}
        disabled={currentImageIdxs.includes(imageItems.length - 1)}
        buttonStyle={buttonStyle}
      />
    </StyledContainer>
  );
};

export default Carousel;
