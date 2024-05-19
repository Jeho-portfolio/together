import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { name: "학업", path: "/academic", activities: ["스터디", "공모전", "과제", "동아리"] },
    { name: "취업", path: "/employment", activities: ["면접", "자격증", "자기소개서"] },
    { name: "스포츠", path: "/sports", activities: ["헬스", "레저"] },
    { name: "문화예술", path: "/arts", activities: ["전시회", "공연", "영화"] },
    { name: "여가", path: "/leisure", activities: ["여행", "맛집", "게임"] },
    { name: "사회활동", path: "/social", activities: ["봉사", "아르바이트"] },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
    } catch (error) {
      console.error('Error fetching login status:', error);
      setIsLoggedIn(false);
      setUserData({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoggedIn(false); // 컴포넌트가 마운트될 때 로그인 상태를 초기화
    checkLoginStatus();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'GET', // 또는 POST, 서버 구현에 따라 달라질 수 있습니다.
        credentials: 'include' // 쿠키를 포함시키기 위해 필요
      });
      if (!response.ok) {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout', error);
    } finally {
      // 상태 업데이트 및 리다이렉션 (로그아웃 실패 시에도 동일하게 처리)
      setIsLoggedIn(false);
      window.location.href = '/'; 
    }
  };

  if (isLoading) {
    return null;  // 로딩 중이면 아무것도 표시하지 않음
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <Link to="/" className="flex items-center">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="h-8" />
        </Link>
        <nav className="flex">
          {categories.map((category, index) => (
            <div key={index} 
                 className="relative"
                 onMouseEnter={() => setActiveDropdown(category.name)}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => navigate(category.path)}
                className="font-bold text-gray-600 hover:text-blue-500 px-4 py-2 w-32"
              >
                {category.name}
              </button>
              {activeDropdown === category.name && (
                <div className="absolute top-full left-0 w-32 bg-white shadow-md">
                  {category.activities.map((activity, activityIndex) => (
                    <button
                      key={activityIndex}
                      onClick={() => navigate(category.path, { state: { subCategory: activity } })}
                      className="block w-full px-4 py-2 text-gray-600 text-center hover:bg-blue-500 hover:text-white"

                    >
                      {activity}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <h1>{userData.name}</h1>
            <button 
              onClick={() => navigate('/my_room')}
              className="bg-[#42cec8] text-white font-bold py-2 px-4 rounded hover:bg-blue-400 transition-colors duration-300">
              마이페이지
            </button>
            <button onClick={logout} className="bg-[#42cec8] text-white font-bold py-2 px-4 rounded hover:bg-blue-400 transition-colors duration-300">
              로그아웃
            </button>
            <Link to="/create-room" className="bg-[#42cec8] text-white font-bold py-2 px-4 rounded hover:bg-blue-400 transition-colors duration-300">방 만들기</Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="bg-[#42cec8] text-white font-bold py-2 px-4 rounded hover:bg-blue-400 transition-colors duration-300">로그인</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
