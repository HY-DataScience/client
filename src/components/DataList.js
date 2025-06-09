import React, { useState } from 'react';
import './DataList.css';

const DataList = () => {
  // 각 검사 결과의 표시 상태를 관리하는 상태
  const [expandedResults, setExpandedResults] = useState({
    inbody: false,
    exboby: false,
    lookInbody: false,
    Imoove: false
  });

  // 결과 확인 버튼 핸들러
  const toggleResult = (testId) => {
    setExpandedResults({
      ...expandedResults,
      [testId]: !expandedResults[testId]
    });
  };

  // 임시 검사 데이터
  const examData = [
    {
      id: 'inbody',
      title: '인바디 결과(특이사항)',
      summary: '근육항 적절치나 체지방 불균형이 다소 높게 관찰됩니다.',
      images: [
        {
          url: '/images/inbody-composition.png',
          title: '인바디 체성분 예시 데이터'
        },
        {
          url: '/images/inbody-water.png',
          title: '인바디 체수분 예시 데이터'
        }
      ]
    },
    {
      id: 'exboby',
      title: '보행분석 결과(특이사항)',
      summary: '근육항 적절치나 체지방 불균형이 다소 높게 관찰됩니다.',
      images: [
        {
          url: '/images/exboby-example.png',
          title: 'exboby 예시 데이터'
        }
      ]
    },
    {
      id: 'lookInbody',
      title: 'lookInbody 결과(특이사항)',
      summary: '근육항 적절치나 체지방 불균형이 다소 높게 관찰됩니다.',
      images: [
        {
          url: '/images/lookinbody-example.png',
          title: "Lookin's Boby 예시 데이터"
        }
      ]
    },
    {
      id: 'Imoove',
      title: 'Imoove 결과(특이사항)',
      summary: '근육항 적절치나 체지방 불균형이 다소 높게 관찰됩니다.',
      images: [
        {
          url: '/images/imoove-both-feet.png',
          title: 'imoove 예시 데이터 양발'
        },
        {
          url: '/images/imoove-right-foot.png',
          title: 'imoove 예시 데이터 오른발앞'
        },
        {
          url: '/images/imoove-left-foot.png',
          title: 'imoove 예시 데이터 왼발앞'
        }
      ]
    }
  ];

  return (
    <div className="datalist-component">
      {examData.map((exam) => (
        <div className="exam-item" key={exam.id}>
          <h3 className="exam-title">{exam.title}</h3>
          <div className="exam-summary-box">
            <p className="exam-summary">{exam.summary}</p>
          </div>
          
          <button 
            className="result-btn" 
            onClick={() => toggleResult(exam.id)}
          >
            결과 확인 <span className="arrow">{expandedResults[exam.id] ? '▲' : '▶'}</span>
          </button>
          
          {expandedResults[exam.id] && (
            <div className="exam-result-images">
              {exam.images.map((image, index) => (
                <div className="exam-result-image" key={index}>
                  <h4 className="image-title">{image.title}</h4>
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    onError={(e) => {
                      console.log('이미지 로딩 오류:', e.target.src);
                      e.target.onerror = null;
                      e.target.src = '/images/placeholder.png';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DataList; 