import React from 'react';
import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import LoginProvider from './src/context/LoginProvider';

const Main = () => (
  <Provider theme={theme}>
      <LoginProvider>
        <App />
      </LoginProvider>
  </Provider>
);

export default Main;