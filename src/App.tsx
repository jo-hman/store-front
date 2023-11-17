import { useEffect, useState } from 'react';
import './App.css';
import Login from './login/Login';
import ProductsPage from './productsPage/ProductsPage';
import { JwtPayload, extractJwtPayload, jwtLocalStorageKey } from './utils/jwtUtils';

function App() {

  const [jwtExpired, setJwtExpired] = useState(true);

  const checkTokenExpiration = () => {
    const jwt = localStorage.getItem(jwtLocalStorageKey);
    if (jwt) {

      const decoded: JwtPayload = extractJwtPayload(jwt);
      const expiration = decoded.exp * 1000;

      if (Date.now() > expiration) {
        setJwtExpired(true);
      } else {
        setJwtExpired(false);
      }
    } else {
      setJwtExpired(true);
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  });

  return (
    <div>
      {
       jwtExpired ? (
        <Login checkExpiration={checkTokenExpiration}/>
      ) : (
        <ProductsPage />
      )}
    </div>
  );
}

export default App;
