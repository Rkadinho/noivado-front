import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import ListGuests from '../components/list-guests/list-guests';
import ControlPanel from '../pages/controlPanel';


const Routess: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listGuests" element={<ListGuests/>} />
        <Route path="/controlPanel" element={<ControlPanel />} />
      </Routes>
    </Router>
  );
};

export default Routess;