import { useEffect, useState } from 'react';
import Login from './login/Login';
import ProductsPage from './productsPage/ProductsPage';
import { JwtPayload, extractJwtPayload, jwtLocalStorageKey } from './utils/jwtUtils';
import { Container, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#FF4081',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#333333',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#e0e0e0',
          width: 'auto',
          maxWidth: '100%',
        },
      },
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <Container maxWidth={false}>
        {
        jwtExpired ? (
          <Login checkExpiration={checkTokenExpiration}/>
        ) : (
          <ProductsPage />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
