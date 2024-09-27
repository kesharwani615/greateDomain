import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './Provider/ContextProvider.jsx'
import {Provider }from 'react-redux';
import store from './redux/store.js';
import { Toaster } from 'react-hot-toast';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <Provider store={store}>
    <Toaster position="bottom-right" reverseOrder={false}/>
    <HashRouter>
    <App />
    </HashRouter>
    </Provider>
  </ContextProvider>
)
