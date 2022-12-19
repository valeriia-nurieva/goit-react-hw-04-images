import { useState, useEffect } from 'react';
import { fetchImages } from 'api';
import toast, { Toaster } from 'react-hot-toast';
import { AppStyled } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { ModalImage } from 'components/Modal/Modal';
import { GlobalStyle } from 'components/GlobalStyle';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function foo() {
      try {
        setIsLoading(true);
        const responce = await fetchImages(query, page);
        if (responce.totalHits === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        const data = responce.hits.map(
          ({ id, largeImageURL, tags, webformatURL }) => {
            return {
              id,
              largeImageURL,
              tags,
              webformatURL,
            };
          }
        );
        setPhotos(prevPhotos => [...prevPhotos, ...data]);
        setIsLoading(false);
      } catch (error) {
        toast.error('Oops! Something went wrong! Please try again.');
      }
    }
    foo();
  }, [page, query]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const searchPhoto = ({ searchQuery }) => {
    setPage(1);
    setPhotos([]);
    setQuery(searchQuery);
  };

  const selectImage = imgUrl => setSelectedImage(imgUrl);

  const resetImage = () => setSelectedImage(null);

  return (
    <>
      <AppStyled>
        <Searchbar onSubmit={searchPhoto} />
        {photos.length > 0 && (
          <ImageGallery photos={photos} onSelect={selectImage} />
        )}
        {photos.length > 11 && !isLoading && <Button onClick={loadMore} />}
        {isLoading && <Loader />}
        <ModalImage selectImage={selectedImage} resetImage={resetImage} />
        <Toaster />
        <GlobalStyle />
      </AppStyled>
    </>
  );
};
