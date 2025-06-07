import React, { useState } from 'react';
import './Info.css';

const Info = () => {
  const [patientPhoto, setPatientPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPatientPhoto(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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
            <button className="save-btn">저장</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info; 