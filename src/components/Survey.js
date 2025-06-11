import React, { useState } from 'react';
import './Survey.css';

const Survey = () => {
  const [painLevel, setPainLevel] = useState(7);
  
  // 통증 부위 체크박스 상태
  const [painAreas, setPainAreas] = useState({
    rightPelvis: true,
    back: false,
    neck: false,
    shoulders: false,
    legs: false,
    head: false,
    waist: true,
    arms: false,
    hips: false
  });

  // 통증 부위 체크박스 핸들러
  const handlePainAreaChange = (area) => {
    setPainAreas({
      ...painAreas,
      [area]: !painAreas[area]
    });
  };

  // 통증 정도 슬라이더 핸들러
  const handlePainLevelChange = (e) => {
    setPainLevel(e.target.value);
  };

  // 임시 데이터 - 병력 및 주요 증상
  const medicalHistory = [
    '2019년 허리디스크 수술 이력',
    '최근 2-3주 컨디션 저하 동통 제한',
    '오래 앉아 있거나 장시간 허리 불편감'
  ];

  // 임시 데이터 - 기타 증상
  const otherSymptoms = '통증은 1개월 이상 지속되고 있으며, 앉아있을 때 통상히 악화되는 경향 있음. 이전에 OOO병원에서 도수치료 2-3번 정도 받은 경험 있음.';

  return (
    <div className="survey-component">
      <div className="section">
        <h3 className="section-title">병력 및 주요 증상</h3>
        <div className="symptoms-list">
          <ul>
            {medicalHistory.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="section">
        <h3 className="section-title">남아있는 호소 증상</h3>
        
        <div className="pain-level">
          <p className="slider-label">환자 통증 정도는 어느 정도인가요? (0-10)</p>
          <div className="slider-container">
            <input 
              type="range" 
              min="0" 
              max="10" 
              value={painLevel} 
              onChange={handlePainLevelChange}
              className="pain-slider"
            />
            <div className="slider-value">현재 값: {painLevel}</div>
          </div>
          <div className="slider-labels">
            <span>통증 거의 없음</span>
            <span>참을 수 없는 통증</span>
          </div>
        </div>
        
        <div className="pain-areas">
          <div className="checkbox-grid">
            <div className="checkbox-row">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={painAreas.rightPelvis}
                  onChange={() => handlePainAreaChange('rightPelvis')}
                />
                오른쪽/골반
              </label>
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={painAreas.head}
                  onChange={() => handlePainAreaChange('head')}
                />
                머리
              </label>
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={painAreas.hips}
                  onChange={() => handlePainAreaChange('hips')}
                />
                엉덩이
              </label>
            </div>
            <div className="checkbox-row">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={painAreas.neck}
                  onChange={() => handlePainAreaChange('neck')}
                />
                목
              </label>
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={painAreas.waist}
                  onChange={() => handlePainAreaChange('waist')}
                />
                허리
              </label>
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={painAreas.arms}
                  onChange={() => handlePainAreaChange('arms')}
                />
                팔
              </label>
            </div>
            <div className="checkbox-row">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={painAreas.shoulders}
                  onChange={() => handlePainAreaChange('shoulders')}
                />
                어깨
              </label>
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={painAreas.legs}
                  onChange={() => handlePainAreaChange('legs')}
                />
                다리(하체가)
              </label>
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={painAreas.back}
                  onChange={() => handlePainAreaChange('back')}
                />
                등
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section">
        <h3 className="section-title">기타증상</h3>
        <div className="other-symptoms">
          <textarea 
            className="symptoms-textarea"
            value={otherSymptoms}
            onChange={(e) => {}}
            rows={4}
          />
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="save-btn">저장</button>
      </div>
    </div>
  );
};

export default Survey; 