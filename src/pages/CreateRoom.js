import React, { useState } from 'react';
//네이게이트 훅
import { useNavigate } from 'react-router-dom';



// CreateRoomForm 컴포넌트 정의
const CreateRoom = () => {
// useState를 사용한 상태 관리 코드는 여기 있음
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    Roomtitle: '',
    majorCategory: '',
    subCategory: '',
    Maxpeople: '',
    Opentalk: '',
    startDate: '',
    endDate: '',
    description: '',
  });
   const [formError, setFormError] = useState({
    endDate: '',
  });

  // 카테고리에 따른 하위 카테고리 옵션
  const categoryOptions = {
    학업: ["스터디", "공모전", "과제", "동아리"],
    취업: ["면접", "자격증", "자기소개서"],
    스포츠: ["헬스", "레저"],
    문화예술: ["전시회", "공연", "영화"],
    여가: ["여행", "맛집", "게임"],
    사회활동: ["봉사", "교내모임"],
  };

  // 폼 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // 입력값이 변경될 때 에러 상태를 업데이트
    if (name === "endDate" && formData.startDate && value < formData.startDate) {
      setFormError({
        ...formError,
        endDate: '마감일은 시작일 이후여야 합니다.',
      });
    } else {
      setFormError({
        ...formError,
        endDate: '',
      });
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 메인 카테고리 변경시 하위 카테고리 업데이트
  const handleMajorCategoryChange = (e) => {
    const majorCategory = e.target.value;
    setFormData({ ...formData, majorCategory, subCategory: '' });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // API 호출을 위한 URL
    const apiUrl = 'http://localhost:8020/api/rooms';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('방 생성 실패');

        const result = await response.json();
        console.log('Form Data Submitted', result);
        
        // 방 생성 후, 다른 페이지로 이동하거나 사용자에게 알림을 표시할 수 있습니다.
        navigate('/rooms'); // 예시: 방 목록 페이지로 이동
    } catch (error) {
        console.error(error);
        navigate('/rooms');
    }
};

  


  return (
    <div className="bg-gray-200 p-5">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-5 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-bold mb-4">방만들기</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Roomtitle">방 제목</label>
            <input
              type="text"
              id="Roomtitle"
              name="Roomtitle"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              placeholder="방 제목을 입력해주세요!"
              value={formData.Roomtitle} 
             onChange={handleInputChange}
          />
        </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="majorCategory">분야</label>
              <select
                id="majorCategory"
                name="majorCategory"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                value={formData.majorCategory}
                onChange={handleMajorCategoryChange}
              >
                <option value="">분야를 선택해주세요!</option>
                {Object.keys(categoryOptions).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subCategory">활동</label>
              <select
                id="subCategory"
                name="subCategory"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                value={formData.subCategory}
                onChange={handleInputChange}
                disabled={!formData.majorCategory || !categoryOptions[formData.majorCategory].length}
                >
                  <option value="">활동을 선택해주세요!</option>
                  {formData.majorCategory && categoryOptions[formData.majorCategory].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

            {/* 여기에 나머지 폼 요소들을 포함시키세요. */}
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Maxpeople">최대 인원수</label>
            <input
              type="text"
              id="Maxpeople"
              name="Maxpeople"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              placeholder="최대 인원수를 입력해주세요!"
              value={formData.Maxpeople} 
             onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Opentalk">오픈카톡방 주소</label>
            <input
              type="text"
              id="Opentalk"
              name="Opentalk"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              placeholder="오픈카톡방 주소를 입력해주세요!"
              value={formData.Opentalk} 
             onChange={handleInputChange}
          />
        </div>

    
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between space-x-4">
          <div className="w-1/2">
            <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">시작일</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">마감일</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              value={formData.endDate}
              min={formData.startDate} // 시작일을 min 속성으로 설정
              onChange={handleInputChange}
            />
              {formError.endDate && <p className="text-red-500 text-sm">{formError.endDate}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">방 소개</label>
          <textarea
            id="description"
            name="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            rows="5"
            placeholder="간단한 방 소개를 입력해주세요!"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </form>
   

            <div className="flex justify-around mt-4">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
                확인
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="reset">
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
