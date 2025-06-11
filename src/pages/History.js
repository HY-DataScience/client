import React from 'react';
import './History.css';
import Survey from '../components/Survey';
import DataList from '../components/DataList';

const History = () => {
  return (
    <div className="history-page">
      <h1>병력 / 주요 증상</h1>
      <div className="history-content">
        <Survey />
        <DataList />
      </div>
    </div>
  );
};

export default History; 