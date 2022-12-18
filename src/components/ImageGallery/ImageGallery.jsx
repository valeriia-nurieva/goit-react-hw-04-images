import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import {
  ImageGalleryStyled,
  ImageGalleryItemStyled,
} from './ImageGallery.styled';

export const ImageGallery = ({ photos, onSelect }) => {
  return (
    <ImageGalleryStyled>
      {photos.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItemStyled key={id}>
            <ImageGalleryItem
              photos={photos}
              onSelect={onSelect}
              smallImg={webformatURL}
              largeImg={largeImageURL}
              tags={tags}
            />
          </ImageGalleryItemStyled>
        );
      })}
    </ImageGalleryStyled>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};
