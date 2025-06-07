import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import PatientReport from './pages/PatientReport';
import Info from './pages/Info';
import History from './pages/History';
import Diagnosis from './pages/Diagnosis';
import Program from './pages/Program';
import Recommend from './pages/Recommend';

function App() {
  return (
    <Router>
      <div className="App">
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/info" />} />
            <Route path="/info" element={<Info />} />
            <Route path="/history" element={<History />} />
            <Route path="/diagnosis" element={<Diagnosis />} />
            <Route path="/program" element={<Program />} />
            <Route path="/recommend" element={<Recommend />} />
          </Routes>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;
