import React, { useState, useEffect } from 'react';
import './Survey.css';

// 기본 JSON 데이터 예시
const defaultPainData = {
  'pain_areas': ['목', '등', '어깨', '허리', '골반'],
  'period': '1개월 이상'
};

const Survey = ({ painData = defaultPainData }) => {
  // 통증 부위 체크박스 상태
  const [painAreas, setPainAreas] = useState({
    '머리/얼굴': false,
    '턱': false,
    '목': false,
    '등': false,
    '어깨': false,
    '팔꿈치': false,
    '손목': false,
    '손가락': false,
    '허리': false,
    '골반': false,
    '엉덩이': false,
    '다리(허벅지)': false,
    '무릎': false,
    '발목': false,
    '발가락': false
  });

  // JSON 데이터를 통해 체크박스 초기화
  useEffect(() => {
    if (painData && painData.pain_areas) {
      const updatedPainAreas = { ...painAreas };
      
      // 모든 체크박스 초기화
      Object.keys(updatedPainAreas).forEach(area => {
        updatedPainAreas[area] = false;
      });
      
      // JSON에 포함된 부위만 체크
      painData.pain_areas.forEach(area => {
        if (updatedPainAreas.hasOwnProperty(area)) {
          updatedPainAreas[area] = true;
        }
      });
      
      setPainAreas(updatedPainAreas);
    }
  }, [painData]);

  // 통증 부위 체크박스 핸들러
  const handlePainAreaChange = (area) => {
    setPainAreas({
      ...painAreas,
      [area]: !painAreas[area]
    });
  };

  // 임시 데이터 - 병력 및 주요 증상
  const medicalHistory = [
    '전신 관련 증상으로는 아침에 일어났을 때 피곤하고 상쾌하지 않음 · 신체 활동 후 쉽게 피로함 · 몸 전체에서 통증을 느낌 · 에너지가 없음 등이 있습니다.',
    '근골격 관련 증상으로는 근육이 뻣뻣하고 쑤심 · 목이나 어깨 근육이 긴장되는 편임 · 골반통증을 가짐 등이 있습니다.',
    '감각 관련 증상으로는 잦은 두통이 있음 등이 있습니다.',
    '수면 관련 증상으로는 잠을 잘 자지 못함 등이 있습니다.',
    '인지 관련 증상으로는 집중하는 데 어려움이 있음 등이 있습니다.',
    '정신 관련 증상으로는 스트레스가 증상을 더욱 악화시킴 등이 있습니다.'
  ];

  // 임시 데이터 - 기타 증상
  const otherSymptoms = '목 · 등 · 어깨 · 허리 및 골반 부위에 통증이 있으며, 해당 통증은 1개월 이상 동안 지속되었습니다. 앉아있을 때 특히 악화되는 경향 있음.';

  // 체크박스를 5개씩 그룹화하여 렌더링
  const renderCheckboxGroups = () => {
    const allAreas = Object.keys(painAreas);
    const groups = [];
    
    // 5개씩 그룹화
    for (let i = 0; i < allAreas.length; i += 5) {
      const group = allAreas.slice(i, i + 5);
      groups.push(group);
    }
    
    return groups.map((group, groupIndex) => (
      <div className="checkbox-row" key={groupIndex}>
        {group.map((area) => (
          <label className="checkbox-label" key={area}>
            <input 
              type="checkbox" 
              checked={painAreas[area]}
              onChange={() => handlePainAreaChange(area)}
            />
            {area}
          </label>
        ))}
      </div>
    ));
  };

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
        <h3 className="section-title">호소 증상</h3>
        
        <div className="pain-areas">
          <div className="checkbox-grid">
            {renderCheckboxGroups()}
          </div>
          
          {painData && painData.period && (
            <div className="pain-period">
              <p>통증 지속 기간: <strong>{painData.period}</strong></p>
            </div>
          )}
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