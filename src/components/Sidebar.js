import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo">온누리</div>
        <div className="subtitle">마취통증의학과의원</div>
      </div>
      
      <div className="menu-header">HOSPITAL</div>
      
      <ul className="menu-list">
        <li>
          <span className="icon user-icon"></span>
          <Link to="/info">환자정보</Link>
        </li>
        <li>
          <span className="icon history-icon"></span>
          <Link to="/history">병력 / 주요 증상</Link>
        </li>
        <li>
          <span className="icon diagnosis-icon"></span>
          <Link to="/diagnosis">진단 내용</Link>
        </li>
        <li>
          <span className="icon treatment-icon"></span>
          <Link to="/program">이전 치료 프로그램</Link>
        </li>
        <li>
          <span className="icon recommendation-icon"></span>
          <Link to="/recommend">유사 환자 기반 치료 추천</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar; 