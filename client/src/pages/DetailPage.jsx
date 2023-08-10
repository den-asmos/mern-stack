import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks';
import { AuthContext } from '../context/AuthContext';
import { Loader, LinkCard } from './../components';

const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const { id } = useParams();

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/links/${id}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setLink(fetched);
    } catch (error) {}
  }, [token, id, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
};

export default DetailPage;
