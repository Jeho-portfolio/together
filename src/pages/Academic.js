import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';

function Academic() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rooms, setRooms] = useState([]);

  const academicCategories = useMemo(() => [
    { name: "학업", key: "academic" },
    { name: "스터디", key: "study" },
    { name: "공모전", key: "cooperation" },
    { name: "과제", key: "homework" },
    { name: "동아리", key: "school_club" },
  ], []);

  const findKeyBySubType = useCallback((subType) => {
    const category = academicCategories.find(category => category.name === subType);
    return category ? category.key : 'academic';
  }, [academicCategories]);

  const fetchRooms = useCallback(async (type, name) => {
    try {
      const url = `/rooms/${type}/${name}`; // URL은 실제 API에 맞게 수정
      const response = await fetch(url);
      const data = await response.json();
      const updatedRooms = data.map(room => ({
        ...room,
        imageSeed: findKeyBySubType(room.sub_type)
      }));
      setRooms(updatedRooms);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }, [findKeyBySubType]);

  useEffect(() => {
    const subCategory = location.state?.subCategory;
    if (subCategory) {
      fetchRooms('sub', subCategory);
    } else {
      fetchRooms('main', '학업'); // 기본적으로 '학업' 카테고리의 방들을 불러옵니다.
    }
  }, [fetchRooms, location.state]);

  const handleCategoryClick = (type, name) => {
    if (type === "main") {
      fetchRooms("main", name); // main_type에 대한 API 호출
    } else if (type === "sub") {
      fetchRooms("sub", name); // sub_type에 대한 API 호출
    }
  };

  return (
    <div className="flex-col min-h-screen">
      {/* 네비게이션바 */}
      <div className='z-10'><Navbar /></div>
   
      <div className="flex flex-row z-5">
        {/* 사이드바 */}
        <aside className="w-64 pt-4 pb-4 pl-4 pr-4 bg-gray-200 h-screen absolute z-1">
          {academicCategories.map((category) => (
            <button
              key={category.key}
              onClick={() => handleCategoryClick(category.key === 'academic' ? 'main' : 'sub', category.name)}
              className="block text-left text-sm py-1 px-2 w-full hover:bg-blue-500 hover:text-white rounded mt-2">
              {category.name}
            </button>
          ))}
        </aside>
    
        {/* 메인 내용 */}
        <main className="flex-grow pt-4 pl-80 pr-4 pb-4 h-screen overflow-auto">
          {/* 각 방들 */}
          <div className="p-5 flex flex-wrap gap-4 justify-start">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="w-80 h-80 bg-gray-100 m-2 border-black-900 border-2 flex flex-col justify-center items-center cursor-pointer rounded" 
                onClick={() => navigate(`/room_detail/${room.id}`, { state: { imageSeed: room.imageSeed } })}>
                <img src={`https://source.unsplash.com/800x600/?${room.imageSeed}`} alt={room.project_name} className="w-full h-2/3 object-cover" />
                <div className="p-2 text-center">
                  <h3 className="text-lg font-bold">{room.project_name}</h3>
                  <p>{room.leader}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    
      {/* 푸터 */}
      <div className='z-10'> <Footer /> </div>
    </div>
  );
}

export default Academic;
