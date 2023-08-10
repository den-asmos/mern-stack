import { useContext, useEffect, useState } from 'react';
import { useHttp, useMessage } from '../hooks';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearErrors } = useHttp();
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    message(error);
    clearErrors();
  }, [error, message, clearErrors]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const formHandler = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const registrationHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 className="center">Shorten the link</h1>
        <div className="card grey lighten-5">
          <div className="card-content">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  className="validate"
                  value={form.email}
                  onChange={formHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                  value={form.password}
                  onChange={formHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>

          <div className="card-action">
            <button
              onClick={loginHandler}
              disabled={loading}
              className="btn green lighten-2 auth-btn"
            >
              Log In
            </button>
            <button
              onClick={registrationHandler}
              disabled={loading}
              className="btn green lighten-5 black-text auth-btn"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
