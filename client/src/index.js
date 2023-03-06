import React from 'react';

import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from 'styled-components';

import './localization';
import Router from './pages';
import {AuthProvider} from './services/authState/authProvider';
import store, {persistor} from './store/store';
import {theme} from './theme';
import ScrollToTop from './utils/autoScrollToTop';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <ScrollToTop>
                <Router />
              </ScrollToTop>
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
