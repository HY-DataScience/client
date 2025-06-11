import React, { useState } from 'react';
import './Info.css';

const Info = () => {
  const [patientPhoto, setPatientPhoto] = useState(null);
  const [surveyImage, setSurveyImage] = useState(null);
  const [surveyFileType, setSurveyFileType] = useState(null);
  const [examImages, setExamImages] = useState([]);
  const [saveMessage, setSaveMessage] = useState(null);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPatientPhoto(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSurveyImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type;
      setSurveyFileType(fileType);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSurveyImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExamImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = [];
      const fileCount = e.target.files.length;
      
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push(event.target.result);
          if (newImages.length === fileCount) {
            setExamImages(prevImages => [...prevImages, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSavePatient = () => {
    // 여기서 실제 저장 로직이 구현될 수 있습니다
    // 지금은 단순히 메시지만 표시합니다
    setSaveMessage({
      show: true,
      message: '환자 정보가 ID 1001번으로 저장되었습니다.'
    });
    
    // 3초 후 메시지 숨기기
    setTimeout(() => {
      setSaveMessage(null);
    }, 3000);
  };

  return (
    <div className="info-page">
      <h1>환자정보</h1>
      <div className="info-content">
        <div className="photo-section">
          <div className="photo-container">
            {patientPhoto ? (
              <img src={patientPhoto} alt="환자 사진" className="patient-photo" />
            ) : (
              <div className="default-photo">
                <span className="person-icon">👤</span>
              </div>
            )}
          </div>
          <label className="change-photo-btn">
            <span>Change photo</span>
            <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
          </label>
        </div>

        <div className="form-container">
          <div className="form-group">
            <label>환자명</label>
            <input type="text" placeholder="김철수" className="form-control" />
          </div>

          <div className="form-row">
            <div className="form-group birth-date">
              <label>생년월일</label>
              <div className="select-group">
                <select className="form-select">
                  <option value="2001">2001</option>
                  {Array.from({ length: 100 }, (_, i) => 2024 - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select className="form-select">
                  <option value="01">01</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month.toString().padStart(2, '0')}>
                      {month.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select className="form-select">
                  <option value="01">01</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day.toString().padStart(2, '0')}>
                      {day.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group gender">
              <label>성별</label>
              <select className="form-select">
                <option value="여성">여성</option>
                <option value="남성">남성</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>진료일자</label>
            <div className="select-group">
              <select className="form-select">
                <option value="2025">2025</option>
                {Array.from({ length: 10 }, (_, i) => 2024 + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select className="form-select">
                <option value="02">02</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={month} value={month.toString().padStart(2, '0')}>
                    {month.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
              <select className="form-select">
                <option value="05">05</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day.toString().padStart(2, '0')}>
                    {day.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>담당의</label>
            <input type="text" placeholder="김정훈" className="form-control" />
          </div>

          <div className="form-actions">
            <button className="save-btn" onClick={handleSavePatient}>저장</button>
          </div>
        </div>
      </div>
      
      {/* 저장 알림 메시지 */}
      {saveMessage && saveMessage.show && (
        <div className="save-message">
          <div className="save-message-content">
            <span>✅ {saveMessage.message}</span>
          </div>
        </div>
      )}
      
      <div className="document-section">
        <h2>문서 자료</h2>
        
        <div className="documents-container">
          <div className="document-upload">
            <h3>설문조사 이미지</h3>
            <div className="document-preview">
              {surveyImage ? (
                <div className="document-image-preview">
                  {surveyFileType && surveyFileType === 'application/pdf' ? (
                    <div className="pdf-preview">
                      <div className="pdf-icon">📄 PDF 문서</div>
                      <span className="document-name">설문조사</span>
                      <a 
                        href={surveyImage} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="view-pdf-btn"
                      >
                        PDF 보기
                      </a>
                    </div>
                  ) : (
                    <>
                      <img src={surveyImage} alt="설문조사 이미지" />
                      <span className="document-name">설문조사</span>
                    </>
                  )}
                </div>
              ) : (
                <div className="empty-document">
                  <span className="document-icon">📄</span>
                  <span>이미지 없음</span>
                </div>
              )}
            </div>
            <label className="upload-document-btn">
              <span>설문조사 이미지 업로드</span>
              <input type="file" accept="image/*,application/pdf" onChange={handleSurveyImageChange} style={{ display: 'none' }} />
            </label>
          </div>
          
          <div className="document-upload">
            <h3>검사지 이미지</h3>
            <div className="document-preview">
              {examImages.length > 0 ? (
                <div className="document-images-container">
                  {examImages.map((image, index) => (
                    <div key={index} className="document-image-preview">
                      <img src={image} alt={`검사지 이미지 ${index + 1}`} />
                      <span className="document-name">검사지 {index + 1}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-document">
                  <span className="document-icon">📋</span>
                  <span>이미지 없음</span>
                </div>
              )}
            </div>
            <label className="upload-document-btn">
              <span>검사지 이미지 업로드</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleExamImageChange} 
                style={{ display: 'none' }} 
                multiple 
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info; 