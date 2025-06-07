import React, { useState } from 'react';
import './Program.css';

const Program = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // 치료 프로그램 데이터
  const treatmentData = [
    { id: 1, date: '11/19/2020', treatment: '도수치료', status: 'good' },
    { id: 2, date: '11/08/2020', treatment: '도수치료 + 체외충격파', status: 'bad' },
    { id: 3, date: '11/05/2020', treatment: '도수 + 슈로스', status: 'good' },
    { id: 4, date: '10/29/2020', treatment: '자세교정', status: 'good' },
    { id: 5, date: '10/20/2020', treatment: '슈로스', status: 'bad' },
  ];

  // 차트 데이터 - 실제로는 API에서 가져오거나 props로 전달 받을 것
  const chartData = {
    months: ['2020-1', '2020-2', '2020-3', '2020-4', '2020-5', '2020-6', '2020-7', '2020-8', '2020-9', '2020-10', '2020-11', '2020-12'],
    patient: [140, 110, 200, 150, 170, 140, 180, 190, 140, 210, 180, 240],
    average: [50, 80, 120, 100, 160, 120, 140, 150, 130, 180, 100, 180]
  };

  return (
    <div className="program-page">
      <div className="program-header">
        <h1>이전 치료 프로그램</h1>
        <div className="pagination">
          <button className={`page-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
          <button className={`page-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
          <button className={`page-btn ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
          <button className="page-btn next-btn">›</button>
        </div>
      </div>

      <div className="treatment-table">
        <div className="table-header">
          <div className="col date-col">
            <span>일자</span>
          </div>
          <div className="col treatment-col">
            <span>치료 내용</span>
          </div>
          <div className="col status-col">
            <span>수행률</span>
          </div>
        </div>

        <div className="table-body">
          {treatmentData.map(item => (
            <div className="table-row" key={item.id}>
              <div className="col date-col">{item.date}</div>
              <div className="col treatment-col">{item.treatment}</div>
              <div className="col status-col">
                <span className={`status-badge ${item.status}`}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="performance-chart">
        <div className="chart-header">
          <h2>이전 프로그램 수행률</h2>
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-color average"></span>
              <span>평균</span>
            </div>
            <div className="legend-item">
              <span className="legend-color patient"></span>
              <span>환자</span>
            </div>
          </div>
        </div>
        
        <div className="chart-wrapper">
          <div className="chart-container">
            <svg width="100%" height="300" viewBox="0 0 1200 300" preserveAspectRatio="none">
              {/* 배경 그리드 */}
              <g className="grid-lines">
                <line x1="0" y1="50" x2="1200" y2="50" stroke="#eee" strokeWidth="1" />
                <line x1="0" y1="100" x2="1200" y2="100" stroke="#eee" strokeWidth="1" />
                <line x1="0" y1="150" x2="1200" y2="150" stroke="#eee" strokeWidth="1" />
                <line x1="0" y1="200" x2="1200" y2="200" stroke="#eee" strokeWidth="1" />
                <line x1="0" y1="250" x2="1200" y2="250" stroke="#eee" strokeWidth="1" />
              </g>
              
              {/* 환자 데이터 채우기 */}
              <path
                d="M0,140 C100,100 200,60 300,120 S500,220 600,150 S800,80 900,120 S1100,80 1200,40 L1200,300 L0,300 Z"
                fill="#e8eaff"
                opacity="0.5"
              />
              
              {/* 환자 데이터 선 */}
              <path
                d="M0,140 C100,100 200,60 300,120 S500,220 600,150 S800,80 900,120 S1100,80 1200,40"
                fill="none"
                stroke="#4a57e5"
                strokeWidth="2"
              />
              
              {/* 평균 데이터 선 */}
              <path
                d="M0,220 C100,200 200,150 300,180 S500,210 600,180 S800,160 900,190 S1100,200 1200,160"
                fill="none"
                stroke="#e9c46a"
                strokeWidth="2"
              />
              
              {/* 수직 가이드라인 */}
              <line x1="700" y1="0" x2="700" y2="300" stroke="#ddd" strokeWidth="1" strokeDasharray="5,5" />
              
              {/* 마커 */}
              <g className="marker" transform="translate(700, 100)">
                <circle cx="0" cy="0" r="6" fill="white" stroke="#4a57e5" strokeWidth="2" />
                <text x="0" y="-15" textAnchor="middle" fill="#4a57e5" fontSize="12" fontWeight="bold">180</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Program; 