import { IImageItem } from "../Image/interfaces";

export interface ICarousel {
    images?: IImageItem[];
    onImageClick?: () => void;
    containerStyle?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    imageStyle?: React.CSSProperties;
    imageContainerStyle?: React.CSSProperties;
    showSettings?: boolean;
} 