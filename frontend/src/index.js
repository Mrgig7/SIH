import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
// import OrganizationSignup from './pages/OrganizationSignup';
import JobSeekerSignup from './pages/JobSeekerSignup';
import JobSeekerLogin from './pages/JobSeekerLogin';
import OrganizationSignup from './pages/OrganizationSignup';
import OrganizationLogin from './pages/OrganizationLogin';
import Organization from './pages/Organizationjobs';
import OrganizationRouter from './pages/OrganizationRouter';
import User from './pages/UserJobs';
import {store} from './store/store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/organization/signup" element={<OrganizationSignup />} /> */}
        <Route path="/jobseeker/signup" element={<JobSeekerSignup />} />
        <Route path="/jobseeker/login" element={<JobSeekerLogin />} />
        <Route path="/organization/login" element={<OrganizationLogin/>}/>
        <Route path="/organization/signup" element={<OrganizationSignup/>}/>
        <Route path="/user/*" element={<User/>}/>
        <Route path="/organization/*" element={<OrganizationRouter/>} />
        
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
