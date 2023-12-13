export interface IImageItem {
  src: string;
  index: number;
  alt?: string;
}

export interface IImage {
    image: IImageItem;
    imageWidth: string;
    imageHeight: string;
    imageStyle?: React.CSSProperties;
    onImageClick?: () => void;
}