import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
// import { FirebaseContext } from './store/Context.jsx';
import { UserProvider } from './store/Context.jsx'; // Import UserProvider
import firebase from 'firebase/compat/app';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* <FirebaseContext.Provider value={{ firebase }}> */}
        <UserProvider>
          <App />
        </UserProvider>
      {/* </FirebaseContext.Provider> */}
    </BrowserRouter>
  </StrictMode>,
);
