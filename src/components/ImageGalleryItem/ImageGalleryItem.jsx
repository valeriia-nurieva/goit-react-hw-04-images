import PropTypes from 'prop-types';
import { ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImg, largeImg, tags, onSelect }) => {
  return (
    <ImageGalleryItemImage
      src={smallImg}
      alt={tags}
      onClick={() => {
        onSelect(largeImg);
      }}
    />
  );
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
