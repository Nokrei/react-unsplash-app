import { useState, useEffect } from 'react';
import Axios from 'axios';
import 'dotenv/config.js';

export default function useImageSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setImages([]);
  }, [query]);
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    Axios({
      method: 'GET',
      url:
        'https://api.unsplash.com/search/photos?query=' +
        query +
        '&client_id=' +
        process.env.API_KEY,
      params: { query: query, page: pageNumber },
      cancelToken: new Axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setImages((prevImages) => {
          return [
            ...prevImages,
            ...response.data.results.map((item) => {
              return { key: item.id, imageURL: item.urls.small };
            }),
          ];
        });
        setHasMore(response.data.results.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (Axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  return { loading, error, images, hasMore };
}
