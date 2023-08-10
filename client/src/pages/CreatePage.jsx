import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../hooks';
import { AuthContext } from '../context/AuthContext';

const CreatePage = () => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  const keyDownHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/links/generate',
          'POST',
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        navigate(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2 create">
        <div className="input-field">
          <input
            id="link"
            type="text"
            name="link"
            className="validate"
            value={link}
            onChange={({ target }) => setLink(target.value)}
            onKeyDown={keyDownHandler}
          />
          <label htmlFor="link">Enter your link</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
