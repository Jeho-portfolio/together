import React, { useState ,useEffect } from 'react';
//네이게이트 훅
import { useNavigate } from 'react-router-dom';



// CreateRoomForm 컴포넌트 정의
const CreateRoom = () => {

  
// useState를 사용한 상태 관리 코드는 여기 있음
  const navigate = useNavigate();

  const Categories = [
    { name: "학업", key: "Academic" },
    { name: "취업", key: "Employment" },
    { name: "스포츠", key: "Sports" },
    { name: "문화예술", key: "Arts" },
    { name: "여가", key: "Leisure" },
    { name: "사회활동", key: "Social" },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:8020/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include'  // 쿠키를 포함시킬 경우
        });
        if (response.status === 200) {  // 로그인 성공
          const data = await response.json();
          setIsLoggedIn(true);
          setUserData(data);
        } else if (response.status === 401) {  // 로그인 실패
          setIsLoggedIn(false);
          setUserData({});
        } else {
          throw new Error('Unexpected status code: ' + response.status);
        }
        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching login status:', error);
        setIsLoggedIn(false);
        setUserData({});
      }
    };

    checkLoginStatus();
  }, []);


  const [formData, setFormData] = useState({
    project_name: '',
    leader: '',
    contents: '',
    project_start: '',
    project_end: '',
    occupancy: '',
    main_type: '',
    sub_type: '',
    kakao_chat: ''
  });
   const [formError, setFormError] = useState({
    project_end: '',
  });

  // userData가 로드되면 leader 필드를 업데이트
  useEffect(() => {
    if (userData.name) {
      setFormData(prevFormData => ({
        ...prevFormData,
        leader: userData.name
      }));
    }
  }, [userData]);

  // 카테고리에 따른 하위 카테고리 옵션
  const categoryOptions = {
    학업: ["스터디", "공모전", "과제", "동아리"],
    취업: ["면접", "자격증", "자기소개서"],
    스포츠: ["헬스", "레저"],
    문화예술: ["전시회", "공연", "영화"],
    여가: ["여행", "맛집", "게임"],
    사회활동: ["봉사", "아르바이트"],
  };

  // 폼 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "project_end" && formData.project_start && value < formData.project_start) {
      setFormError({
        ...formError,
        project_end: '마감일은 시작일 이후여야 합니다.',
      });
    } else {
      setFormError({
        ...formError,
        project_end: '',
      });
    }

      setFormData({
        ...formData,
        [name]: value,
      });
  };

  // 메인 카테고리 변경시 하위 카테고리 업데이트
  const handleMajorCategoryChange = (e) => {
    const main_type = e.target.value;
    setFormData({ ...formData, main_type, sub_type: '' });
  };

  

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8020/New_Room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            credentials: 'include',
            body: JSON.stringify(formData),
        });

        const data = await response.json();  // 응답을 JSON으로 파싱
        console.log('Server response:', data);

        if (response.ok) {
            // 성공적으로 방이 생성되면, 카테고리에 따라 리디렉트
            const category = Categories.find(category => category.name === formData.main_type);
            if (category) {
                navigate(`/${category.key}`);
            } else {
                console.error('Category key not found');
                navigate('/');
            }
        } else {
            throw new Error(data.message || '방 생성 실패');
        }
    } catch (error) {
        console.error(error);
        navigate('/');  // 에러 발생 시 기본 페이지로 이동
    }
};


if (isLoading) {
  return null;  // 로딩 중이면 아무것도 표시하지 않음
}


  return (
    isLoggedIn ? (
      <div className="bg-gray-200 p-5">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-5 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-bold mb-4">방만들기</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="project_name">방 제목</label>
            <input
              type="text"
              id="project_name"
              name="project_name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              placeholder="방 제목을 입력해주세요!"
              value={formData.project_name} 
             onChange={handleInputChange}
          />
        </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="main_type">분야</label>
              <select
                id="main_type"
                name="main_type"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                value= {formData.main_type}
                onChange={handleMajorCategoryChange}
              >
                <option value="">분야를 선택해주세요!</option>
                {Object.keys(categoryOptions).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sub_type">활동</label>
              <select
                id="sub_type"
                name="sub_type"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                value={formData.sub_type}
                onChange={handleInputChange}
                disabled={!formData.main_type || !categoryOptions[formData.main_type].length}
                >
                  <option value="">활동을 선택해주세요!</option>
                  {formData.main_type && categoryOptions[formData.main_type].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

            {/* 여기에 나머지 폼 요소들을 포함시키세요. */}
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="occupancy">최대 인원수</label>
            <input
              type="text"
              id="occupancy"
              name="occupancy"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              placeholder="최대 인원수를 입력해주세요!"
              value={formData.occupancy} 
             onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kakao_chat">오픈카톡방 주소</label>
            <input
              type="text"
              id="kakao_chat"
              name="kakao_chat"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              placeholder="오픈카톡방 주소를 입력해주세요!"
              value={formData.kakao_chat} 
             onChange={handleInputChange}
          />
        </div>


    
        <div className="flex justify-between space-x-4">
          <div className="w-1/2">
            <label htmlFor="project_start" className="block text-gray-700 text-sm font-bold mb-2">시작일</label>
            <input
              type="date"
              id="project_start"
              name="project_start"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              value={formData.project_start}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="project_end" className="block text-gray-700 text-sm font-bold mb-2">마감일</label>
            <input
              type="date"
              id="project_end"
              name="project_end"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              value={formData.project_end}
              min={formData.project_start} // 시작일을 min 속성으로 설정
              onChange={handleInputChange}
            />
              {formError.project_end && <p className="text-red-500 text-sm">{formError.project_end}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="contents" className="block text-gray-700 text-sm font-bold mb-2">방 소개 및 방장 프로필</label>
          <textarea
            id="contents"
            name="contents"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            rows="5"
            placeholder="간단한 방 소개와 함께 방장님을 편히 소개해주세요! 예: 안녕하세요! 저는 코딩을 좋아하는 컴퓨터공학과 학생입니다. 같이 목요일마다 코딩 스터디 해봐요!"
            value={formData.contents}
            onChange={handleInputChange}
          ></textarea>
        </div>
      


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
  
    ) : (
      <div>
        <h2>로그인을 해주세요.</h2>
      </div>
    )
  );
};

export default CreateRoom;
