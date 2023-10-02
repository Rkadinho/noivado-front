import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import ListGuests from '../pages/listGuests';
import ControlPanel from '../pages/controlPanel';
import ListGifts from '../pages/IistGifts';


const RoutesPages: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listGuests" element={<ListGuests/>} />
        <Route path="/controlPanel" element={<ControlPanel />} />
        <Route path="/listGifts/:guestName" element={<ListGifts />} />
      </Routes>
    </Router>
  );
};

export default RoutesPages;