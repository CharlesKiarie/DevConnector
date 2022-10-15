import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={ <Landing/> } />
          <Route path='/register' element={ <Register/> } />
          <Route path='/login' element={ <Login/> } />
          {/* 404 <Route path='*' element={} /> */}
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
