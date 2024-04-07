import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Employment() {
  const navigate = useNavigate();

  // 취업 관련 방 데이터
  // 백엔드 API 호출을 통해 데이터를 가져올 경우, 예를 들어 GetRooms('employment') 같은 함수를 사용할 수 있습니다.
  const rooms = [
    { id: 1, title: "취업 워크숍", description: "취업 준비 워크숍", image: "/path/to/image3.jpg", category: "workshop"},
    { id: 2, title: "이력서 클리닉", description: "전문가와 함께하는 이력서 작성", image: "/path/to/image4.jpg", category: "resume"},
    // 여기에 더 많은 취업 관련 방 데이터를 추가
  ];

  // 취업 관련 하위 항목 정의
  const employmentSubCategories = [
    { name: "워크숍", key: "workshop" },
    { name: "이력서", key: "resume" },
    { name: "면접", key: "interview" },
    { name: "네트워킹", key: "networking" },
  ];

  // 선택된 항목에 따라 방 정보 필터링
  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredRooms = selectedCategory === 'all' ? rooms : rooms.filter(room => room.category === selectedCategory);

  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <aside className="w-64 pt-4 pb-4 pl-4 pr-4 bg-gray-200 fixed">
          <button
            onClick={() => handleCategoryClick('all')}
            className="block text-left text-xl font-bold mb-4 py-1 px-2 w-full hover:bg-blue-500 hover:text-white rounded mt-2"
          >
            취업
          </button>
          {employmentSubCategories.map((category) => (
            <button
              key={category.key}
              onClick={() => handleCategoryClick(category.key)}
              className="block text-left text-sm py-1 px-2 w-full hover:bg-blue-500 hover:text-white rounded mt-2"
            >
              {category.name}
            </button>
          ))}
        </aside>
        <main className="flex-grow pt-4 pl-64 pr-4 pb-4">
          <div className="p-5 flex flex-wrap gap-4 justify-start">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="w-96 h-96 bg-gray-200 m-2 flex flex-col justify-center items-center cursor-pointer"
                onClick={() => navigate(`/room_detail/${room.id}`)}
              >
                <img src={room.image} alt={room.title} className="w-full h-2/3 object-cover" />
                <div className="p-2 text-center">
                  <h3 className="text-lg font-bold">{room.title}</h3>
                  <p>{room.description}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Employment;
