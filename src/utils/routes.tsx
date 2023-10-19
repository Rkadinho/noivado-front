import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import ListGuests from '../pages/listGuests';
import ControlPanel from '../pages/controlPanel';
import ListGifts from '../pages/IistGifts';
import LoginAdmin from '../pages/loginAdm';


const RoutesPages: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listGuests" element={<ListGuests/>} />
        <Route path="/listGifts/:guestName/:code" element={<ListGifts />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/controlPanel/:guestName/:code" element={<ControlPanel />} />
      </Routes>
    </Router>
  );
};

export default RoutesPages;