import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Academic() {
  const navigate = useNavigate();


  // 백엔드 api 를 가지고 오게되면
  // rooms = GetRooms()

  // 방 목록 데이터 확장
  const rooms = [
    { id: 1, title: "방 제목 1", description: "방 설명 1", image: "/path/to/image1.jpg", category: "study"},
    { id: 2, title: "방 제목 2", description: "방 설명 2", image: "/path/to/image2.jpg", category: "club"},
    // 여기에 더 많은 방 데이터를 추가
  ];

  // 학업 관련 하위 항목 정의
  const academicSubCategories = [
    { name: "스터디", key: "study" },
    { name: "공모전", key: "competition" },
    { name: "과제", key: "assignment" },
    { name: "동아리", key: "club" },
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
            학업
          </button>
          {academicSubCategories.map((category) => (
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
                <img src={room.image} alt="Room" className="w-full h-2/3 object-cover" />
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

export default Academic;