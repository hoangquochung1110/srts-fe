import React from 'react';
import { render } from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import { FBSdkInit } from './service/accountService';
import { ProvideAuth } from './hooks/useAuth';
import { PrivateRoute } from './components/routers/PrivateRoute';
import { Memories } from './components/memories';
FBSdkInit().then(startApp);

function startApp() { 
  render(
  <ProvideAuth>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route 
            path="/memories" 
            element={
              <PrivateRoute>
                <Memories/>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ProvideAuth>,
  document.getElementById('root')
  );
}