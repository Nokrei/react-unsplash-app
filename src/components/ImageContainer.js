import React, { useState, useEffect, useRef, useCallback } from 'react';
import StackGrid from 'react-stack-grid';
import SearchBar from './SearchBar';
import useImageSearch from './useImageSearch';

const ImageContainer = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [name, setName] = useState('');
  const { images, hasMore, loading, error } = useImageSearch(query, pageNumber);
  const observer = useRef();
  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSearch = () => {
    setQuery(name);
    setPageNumber(1);
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      setQuery(name);
      setPageNumber(1);
    }
  };

  return (
    <div className="main">
      <SearchBar
        value={name}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        handleSearch={handleSearch}
      />

      <div className="container">
        <StackGrid columnWidth={400}>
          {images.map((item, index) => {
            if (images.length === index + 1) {
              return (
                <div ref={lastImageElementRef} key={item.key}>
                  <img src={item.imageURL} />
                </div>
              );
            } else {
              return (
                <div key={item.key}>
                  <img src={item.imageURL} />
                </div>
              );
            }
          })}
        </StackGrid>
      </div>

      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </div>
  );

  /*  
  const [img, setImg] = useState([]);
  const [name, setName] = useState('');
  const [searchImg, setSearchImg] = useState('');
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleClick = () => {
    setSearchImg(name);
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      setSearchImg(name);
    }
  };

  useEffect(() => {
    Axios.get(
      'https://api.unsplash.com/search/photos?query=' +
        searchImg +
        '&client_id=lf8QposODp2WlpEjUNPq5MF8lZDFdkVvKNa3LirDmqE&page=1&per_page=10',
    ).then((response) => {
      const imageData = response.data.results.map((item) => {
        return {
          key: item.id,
          imgURL: item.urls.small,
        };
      });
      setImg(imageData);
    });
  }, [searchImg]);

  return (
    <div className="main">
      <SearchBar
        handleKeyDown={handleKeyDown}
        handleChange={handleChange}
        value={name}
        handleClick={handleClick}
      />
      <div className="imageContainer">
        {img.map((item) => {
          return <ImageCard key={item.key} image={item.imgURL} />;
        })}
      </div>
    </div>
  );
  */
};

export default ImageContainer;
