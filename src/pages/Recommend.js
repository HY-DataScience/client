import React, { useState } from 'react';
import './Recommend.css';

const Recommend = () => {
  const [patientId, setPatientId] = useState('');
  const [searchedId, setSearchedId] = useState('');
  const [showResults, setShowResults] = useState(false);

  // 환자 데이터 (임시)
  const patientData = {
    id: '1001',
    name: '김환자',
    age: 28,
    ageGroup: '20대',
    gender: '여성',
    diagnosis: '요추 디스크 탈출증',
    painAreas: '허리, 엉덩이, 다리(허벅지)',
    period: '2개월',
    // 추가 측정 데이터
    trunk_lean_back: 3,
    trunk_side_lean_right: 5,
    trunk_stability: 42,
    hip_rotation_right_out: 7
  };

  // 유사 환자 데이터
  const similarPatients = [
    {
      id: '541',
      age: '28세',
      similarity: '90.0%',
      measurements: {
        trunk_lean_back: 3,
        trunk_side_lean_right: 0,
        trunk_stability: 44,
        hip_rotation_right_out: 6
      },
      treatments: [
        {
          program: 'schroth',
          duration: '13일',
          changes: [
            { 
              metric: 'trunk_stability', 
              before: 44, 
              after: 50, 
              diff: '+6' 
            }
          ]
        },
        {
          program: 'balance',
          duration: '16일',
          changes: [
            { 
              metric: 'trunk_stability', 
              before: 50, 
              after: 62, 
              diff: '+12' 
            }
          ]
        }
      ]
    },
    {
      id: '496',
      age: '27세',
      similarity: '77.0%',
      measurements: {
        trunk_lean_back: 3,
        trunk_side_lean_right: 3,
        trunk_stability: 58,
        hip_rotation_right_out: 7
      },
      treatments: [
        {
          program: 'balance',
          duration: '10일',
          changes: [
            { 
              metric: 'trunk_side_lean_right', 
              before: 3, 
              after: 2, 
              diff: '-1' 
            },
            { 
              metric: 'trunk_stability', 
              before: 58, 
              after: 66, 
              diff: '+8' 
            },
            { 
              metric: 'hip_rotation_right_out', 
              before: 7, 
              after: 6, 
              diff: '-1' 
            }
          ]
        }
      ]
    },
    {
      id: 'A102',
      age: '52세',
      similarity: '65.5%',
      measurements: {
        trunk_lean_back: 4,
        trunk_side_lean_right: 2,
        trunk_stability: 39,
        hip_rotation_right_out: 8
      },
      treatments: [
        {
          program: '도수치료 + 일일 견기',
          duration: '3.8개월',
          changes: [
            { 
              metric: 'trunk_stability', 
              before: 39, 
              after: 45, 
              diff: '+6' 
            }
          ]
        }
      ]
    },
    {
      id: 'B217',
      age: '55세',
      similarity: '62.1%',
      measurements: {
        trunk_lean_back: 2,
        trunk_side_lean_right: 4,
        trunk_stability: 36,
        hip_rotation_right_out: 5
      },
      treatments: [
        {
          program: '복부 강화 루틴 + 체중 관리',
          duration: '4.5개월',
          changes: [
            { 
              metric: 'trunk_stability', 
              before: 36, 
              after: 48, 
              diff: '+12' 
            }
          ]
        }
      ]
    }
  ];

  // 환자 ID 검색 핸들러
  const handleSearch = () => {
    setSearchedId(patientId || '1001'); // 입력이 없으면 기본값 1001 사용
    setShowResults(true);
  };

  // 엔터 키 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 변화 지표 렌더링 함수
  const renderChanges = (changes) => {
    return changes.map((change, index) => (
      <div className="change-item" key={index}>
        <span className="metric">{change.metric}:</span> 
        <span className="values">{change.before} → {change.after}</span>
        <span className={`diff ${change.diff.includes('+') ? 'positive' : 'negative'}`}>
          ({change.diff})
        </span>
      </div>
    ));
  };

  return (
    <div className="recommend-page">
      <h1>유사 환자 기반 치료 추천</h1>
      
      <div className="recommend-content">
        <div className="search-section">
          <div className="search-container">
            <div className="input-group">
              <label htmlFor="patient-id">환자 ID</label>
              <input
                id="patient-id"
                type="text"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="환자 ID를 입력하세요."
                className="patient-id-input"
              />
            </div>
            <button className="search-btn" onClick={handleSearch}>확인</button>
          </div>
        </div>
        
        {showResults && (
          <>
            <div className="patient-info-section">
              <h2 className="section-title">환자 정보</h2>
              <div className="patient-info-card">
                <div className="info-row">
                  <div className="info-item">
                    <span className="info-label">환자 ID</span>
                    <span className="info-value">{patientData.id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">이름</span>
                    <span className="info-value">{patientData.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">연령대</span>
                    <span className="info-value">{patientData.ageGroup}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">나이</span>
                    <span className="info-value">{patientData.age}세</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">성별</span>
                    <span className="info-value">{patientData.gender}</span>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-item">
                    <span className="info-label">진단명</span>
                    <span className="info-value">{patientData.diagnosis}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">통증 부위</span>
                    <span className="info-value">{patientData.painAreas}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">지속 기간</span>
                    <span className="info-value">{patientData.period}</span>
                  </div>
                </div>
                <div className="info-row measurement-data">
                  <div className="info-item">
                    <span className="info-label">trunk_lean_back</span>
                    <span className="info-value">{patientData.trunk_lean_back}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">trunk_side_lean_right</span>
                    <span className="info-value">{patientData.trunk_side_lean_right}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">runk_stability</span>
                    <span className="info-value">{patientData.trunk_stability}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">hip_rotation_right_out</span>
                    <span className="info-value">{patientData.hip_rotation_right_out}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="similar-patients-section">
              <h2 className="section-title">
                <span className="icon">👥</span> 유사 환자 분포
              </h2>
              
              <div className="patient-cards-container">
                {similarPatients.map((patient) => (
                  <div className="patient-card" key={patient.id}>
                    <div className="patient-card-header">
                      <h3>환자 ID: {patient.id} (나이: {patient.age})</h3>
                      <div className="similarity-badge">유사도: {patient.similarity}</div>
                    </div>
                    
                    <div className="patient-card-measurements">
                      <div className="measurement-item">
                        <span className="measurement-label">trunk_lean_back</span>
                        <span className="measurement-value">{patient.measurements.trunk_lean_back}</span>
                      </div>
                      <div className="measurement-item">
                        <span className="measurement-label">trunk_side_lean_right</span>
                        <span className="measurement-value">{patient.measurements.trunk_side_lean_right}</span>
                      </div>
                      <div className="measurement-item">
                        <span className="measurement-label">trunk_stability</span>
                        <span className="measurement-value">{patient.measurements.trunk_stability}</span>
                      </div>
                      <div className="measurement-item">
                        <span className="measurement-label">hip_rotation_right_out</span>
                        <span className="measurement-value">{patient.measurements.hip_rotation_right_out}</span>
                      </div>
                    </div>
                    
                    {patient.treatments.map((treatment, idx) => (
                      <div className="treatment-section" key={idx}>
                        <div className="treatment-info">
                          <div className="treatment-program">
                            <span className="treatment-label">치료 프로그램:</span>
                            <span className="treatment-value">{treatment.program}</span>
                          </div>
                          <div className="treatment-duration">
                            <span className="treatment-label">치료 기간:</span>
                            <span className="treatment-value">{treatment.duration}</span>
                          </div>
                        </div>
                        
                        {treatment.changes.length > 0 && (
                          <div className="changes-section">
                            <span className="changes-label">변화 지표:</span>
                            <div className="changes-list">
                              {renderChanges(treatment.changes)}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recommend; 