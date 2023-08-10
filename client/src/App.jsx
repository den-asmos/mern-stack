import 'materialize-css';
import useRoutes from './Routes';
import { useAuth } from './hooks';
import { AuthContext } from './context/AuthContext';
import { Navbar, Loader } from './components';

const App = () => {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
      {isAuthenticated && <Navbar />}
      <div className="container">{routes}</div>
    </AuthContext.Provider>
  );
};

export default App;
