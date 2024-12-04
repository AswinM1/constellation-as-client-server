import { createContext, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SigninContext, SigninProvider } from './components/SigninContext';
import { Provider } from 'react-redux';
import store from './components/redux/store';





function Root() {


  // Toggle theme between light and dark
 
  return (
    <StrictMode>
      <Provider store={store}>
    <BrowserRouter>
        <SigninProvider>
          
            <App />
         
        </SigninProvider>
    </BrowserRouter>
    </Provider>
  </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Root />);
