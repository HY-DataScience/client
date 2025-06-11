import React, { useState, useEffect } from 'react';
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

  // 치료 데이터를 날짜순으로 정렬 (내림차순 - 최신 날짜가 먼저)
  const sortedData = [...treatmentData].sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('/'));
    const dateB = new Date(b.date.split('/').reverse().join('/'));
    return dateB - dateA; // 내림차순 정렬
  });
  
  // SVG 경로 계산을 위한 상태
  const [pathData, setPathData] = useState({
    patientPath: '',
    fillPath: '',
    dates: []
  });
  
  // 그래프 경로 계산
  useEffect(() => {
    // SVG 캔버스 크기
    const svgWidth = 1200;
    const svgHeight = 300;
    const padding = 20;
    
    // x축과 y축 크기 계산
    const graphWidth = svgWidth - (padding * 2);
    const graphHeight = svgHeight - (padding * 2) - 50; // 아래쪽 여백 추가
    
    // 데이터 포인트 계산 (역순으로 표시하여 최신 날짜가 오른쪽에 오도록 함)
    const points = sortedData.map((item, index) => {
      // x 좌표 계산 (날짜 기반) - 역순으로 계산하여 최신 날짜가 오른쪽에 오도록 함
      const reversedIndex = sortedData.length - 1 - index; // 인덱스를 역순으로 변경
      const x = padding + (reversedIndex * (graphWidth / (sortedData.length - 1 || 1)));
      
      // y 좌표 계산 (status 기반)
      // good = 높은 수행률 (그래프 상단), bad = 낮은 수행률 (그래프 하단)
      const y = item.status === 'good' 
        ? padding + graphHeight * 0.2 // 상단 20% 위치
        : padding + graphHeight * 0.7; // 하단 70% 위치
      
      return { x, y, status: item.status, date: item.date };
    });
    
    // SVG 경로 생성
    let patientPath = '';
    let fillPath = '';
    
    points.forEach((point, i) => {
      if (i === 0) {
        patientPath = `M${point.x},${point.y}`;
        fillPath = `M${point.x},${svgHeight - padding} L${point.x},${point.y}`;
      } else {
        // 곡선 경로로 포인트 연결
        const prevPoint = points[i - 1];
        const cpX1 = prevPoint.x + (point.x - prevPoint.x) / 2;
        const cpX2 = prevPoint.x + (point.x - prevPoint.x) / 2;
        
        patientPath += ` C${cpX1},${prevPoint.y} ${cpX2},${point.y} ${point.x},${point.y}`;
        fillPath += ` C${cpX1},${prevPoint.y} ${cpX2},${point.y} ${point.x},${point.y}`;
      }
    });
    
    // 채우기 경로 닫기
    fillPath += ` L${points[points.length - 1].x},${svgHeight - padding} L${points[0].x},${svgHeight - padding} Z`;
    
    // 날짜 라벨 생성
    const dates = points.map(point => {
      const [month, day, year] = point.date.split('/');
      return `${month}/${day}`;
    });
    
    setPathData({
      patientPath,
      fillPath,
      dates
    });
  }, [sortedData]);

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
              <span className="legend-color patient"></span>
              <span>수행률</span>
            </div>
          </div>
        </div>
        
        <div className="chart-wrapper">
          <div className="chart-container">
            {/* SVG 그래프 */}
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
                d={pathData.fillPath}
                fill="#e8eaff"
                opacity="0.5"
              />
              
              {/* 환자 데이터 선 */}
              <path
                d={pathData.patientPath}
                fill="none"
                stroke="#4a57e5"
                strokeWidth="2"
              />
              
              {/* 데이터 포인트 */}
              {sortedData.map((item, index) => {
                // 실제 데이터 위치 계산
                const svgWidth = 1200;
                const svgHeight = 300;
                const padding = 20;
                const graphWidth = svgWidth - (padding * 2);
                const graphHeight = svgHeight - (padding * 2) - 50;
                
                // 인덱스를 역순으로 계산하여 최신 날짜가 오른쪽에 오도록 함
                const reversedIndex = sortedData.length - 1 - index;
                const x = padding + (reversedIndex * (graphWidth / (sortedData.length - 1 || 1)));
                const y = item.status === 'good' 
                  ? padding + graphHeight * 0.2 
                  : padding + graphHeight * 0.7;
                
                return (
                  <g key={item.id} className="data-point" transform={`translate(${x}, ${y})`}>
                    <circle 
                      cx="0" 
                      cy="0" 
                      r="5" 
                      fill={item.status === 'good' ? '#4a57e5' : '#e03131'} 
                      stroke="#fff" 
                      strokeWidth="2"
                    />
                  </g>
                );
              })}
            </svg>
            
            {/* 날짜 라벨 */}
            <div className="month-labels">
              {pathData.dates.map((date, index) => (
                <div key={index} className="month-label">
                  {date}
                </div>
              )).reverse()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Program; 