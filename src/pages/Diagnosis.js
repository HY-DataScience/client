import React, { useState, useRef, useEffect } from 'react';
import './Diagnosis.css';

const Diagnosis = () => {
  // 진단 내용 수정 상태
  const [isEditing, setIsEditing] = useState(false);
  
  // 내용 변경 감지 상태
  const [hasChanges, setHasChanges] = useState(false);
  
  // 의사 소견 상태 관리
  const [doctorNote, setDoctorNote] = useState('');
  const [recommendedProgram, setRecommendedProgram] = useState('');
  const [precautions, setPrecautions] = useState('');
  const [privateNote, setPrivateNote] = useState('');
  
  // 클릭한 항목 피드백 상태
  const [clickedItem, setClickedItem] = useState(null);
  
  // textarea refs
  const doctorNoteRef = useRef(null);
  const recommendedProgramRef = useRef(null);
  const precautionsRef = useRef(null);
  const privateNoteRef = useRef(null);
  
  // 첫 렌더링 감지용 ref
  const isInitialRender = useRef(true);

  // 작성/수정 모드 전환
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // 변경사항 감지
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    
    setHasChanges(true);
  }, [doctorNote, recommendedProgram, precautions, privateNote]);

  // 저장 핸들러
  const handleSave = () => {
    // 여기에 저장 로직 구현 (API 연동 등)
    alert('진단 내용이 저장되었습니다.');
    setHasChanges(false);
  };
  
  // 진단 항목 클릭 핸들러
  const handleItemClick = (text, fieldType, index) => {
    // 클릭 효과를 위한 상태 설정
    setClickedItem({ index, fieldType });
    setTimeout(() => setClickedItem(null), 1000);
    
    // 필드 타입에 따라 텍스트 추가
    switch(fieldType) {
      case 'doctorNote':
        setDoctorNote(prev => prev ? `${prev}\n${text}` : text);
        if (doctorNoteRef.current) doctorNoteRef.current.focus();
        break;
      case 'recommendedProgram':
        setRecommendedProgram(prev => prev ? `${prev}\n${text}` : text);
        if (recommendedProgramRef.current) recommendedProgramRef.current.focus();
        break;
      case 'precautions':
        setPrecautions(prev => prev ? `${prev}\n${text}` : text);
        if (precautionsRef.current) precautionsRef.current.focus();
        break;
      case 'privateNote':
        setPrivateNote(prev => prev ? `${prev}\n${text}` : text);
        if (privateNoteRef.current) privateNoteRef.current.focus();
        break;
      default:
        break;
    }
  };

  // 진단 결과 데이터
  const diagnosisItems = [
    "환자 id #######(여, 58세)는",
    "복부지방율(32.5 %)이 정상 상한(28 %)을 초과하여 과다 소견입니다.",
    "골격근량(24.3 kg)은 참조치 하한(18 kg)을 상회해 양호합니다.",
    "총 근육량(38.9 kg)은 참조치 하한(30 kg)에 근접하니 다소 낮은 수준입니다.",
    "Lookinbody 검사 결과 민첩성이 0.48로 표준 이하로 나타나 전반적인 움직임 기능 저하가 의심됩니다.",
    "Imoove 검사 결과 역시 강도 1, 민감도 2로 나타나 활동량 부족 및 근력 약화가 복합적으로 작용한 것으로 판단됩니다.",
    "이에 복부비만 관리 프로그램 및 근력강화 재활 프로그램 참여를 권장드립니다."
  ];

  return (
    <div className="diagnosis-page">
      <h1>진단 내용</h1>
      
      <div className="diagnosis-content">
        
        <div className="diagnosis-section">
          <h3>검사 결과 기반의 진단</h3>
          <div className="diagnosis-result">
            {diagnosisItems.map((item, index) => (
              <div 
                key={index} 
                className={`diagnosis-item ${clickedItem && clickedItem.index === index ? 'clicked' : ''}`}
              >
                {index === 0 ? (
                  <p>{item}</p>
                ) : index === diagnosisItems.length - 1 ? (
                  <div className="diagnosis-item-with-buttons">
                    <li>{item}</li>
                    <div className="copy-buttons">
                      <button 
                        onClick={() => handleItemClick(item, 'doctorNote', index)}
                        className={clickedItem && clickedItem.index === index && clickedItem.fieldType === 'doctorNote' ? 'active' : ''}
                      >
                        소견
                      </button>
                      <button 
                        onClick={() => handleItemClick(item, 'recommendedProgram', index)}
                        className={clickedItem && clickedItem.index === index && clickedItem.fieldType === 'recommendedProgram' ? 'active' : ''}
                      >
                        추천
                      </button>
                      <button 
                        onClick={() => handleItemClick(item, 'precautions', index)}
                        className={clickedItem && clickedItem.index === index && clickedItem.fieldType === 'precautions' ? 'active' : ''}
                      >
                        주의
                      </button>
                      <button 
                        onClick={() => handleItemClick(item, 'privateNote', index)}
                        className={clickedItem && clickedItem.index === index && clickedItem.fieldType === 'privateNote' ? 'active' : ''}
                      >
                        메모
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="diagnosis-item-with-buttons">
                    <li>{item}</li>
                    <div className="copy-buttons">
                      <button 
                        onClick={() => handleItemClick(item, 'doctorNote', index)}
                        className={clickedItem && clickedItem.index === index && clickedItem.fieldType === 'doctorNote' ? 'active' : ''}
                      >
                        소견
                      </button>
                      <button 
                        onClick={() => handleItemClick(item, 'recommendedProgram', index)}
                        className={clickedItem && clickedItem.index === index && clickedItem.fieldType === 'recommendedProgram' ? 'active' : ''}
                      >
                        추천
                      </button>
                      <button 
                        onClick={() => handleItemClick(item, 'precautions', index)}
                        className={clickedItem && clickedItem.index === index && clickedItem.fieldType === 'precautions' ? 'active' : ''}
                      >
                        주의
                      </button>
                      <button 
                        onClick={() => handleItemClick(item, 'privateNote', index)}
                        className={clickedItem && clickedItem.index === index && clickedItem.fieldType === 'privateNote' ? 'active' : ''}
                      >
                        메모
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <button 
            className="edit-btn" 
            onClick={toggleEditMode}
          >
            {isEditing ? '취소' : '작성 수정'}
          </button>
        </div>
        
        <div className="doctor-note-section">
          <h3>의사소견</h3>
          
          <div className="note-field">
            <label>소견</label>
            <textarea
              ref={doctorNoteRef}
              value={doctorNote}
              onChange={(e) => setDoctorNote(e.target.value)}
              disabled={!isEditing}
              placeholder="소견을 입력하세요"
            />
          </div>
          
          <div className="note-field">
            <label>추천 프로그램</label>
            <textarea
              ref={recommendedProgramRef}
              value={recommendedProgram}
              onChange={(e) => setRecommendedProgram(e.target.value)}
              disabled={!isEditing}
              placeholder="추천 프로그램을 입력하세요"
            />
          </div>
          
          <div className="note-field">
            <label>주의사항</label>
            <textarea
              ref={precautionsRef}
              value={precautions}
              onChange={(e) => setPrecautions(e.target.value)}
              disabled={!isEditing}
              placeholder="주의사항을 입력하세요"
            />
          </div>
        </div>
        
        <div className="private-note-section">
          <p className="private-note-label">의사 환자 메모용, 환자용에는 제공X</p>
          <textarea
            ref={privateNoteRef}
            className="private-note"
            value={privateNote}
            onChange={(e) => setPrivateNote(e.target.value)}
            disabled={!isEditing}
            placeholder="환자에게 표시되지 않는 메모를 입력하세요"
          />
        </div>
        
        <div className="action-buttons">
          <button 
            className="save-btn" 
            onClick={handleSave} 
            disabled={!hasChanges}
          >
            저장
          </button>
        </div>
        
        {hasChanges && (
          <div className="changes-indicator">
            <span>* 저장되지 않은 변경사항이 있습니다</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diagnosis; 