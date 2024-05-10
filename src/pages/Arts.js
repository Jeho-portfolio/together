import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Arts() {
  const navigate = useNavigate();

  // 취업 관련 방 데이터
  // 백엔드 API 호출을 통해 데이터를 가져올 경우, 예를 들어 GetRooms('employment') 같은 함수를 사용할 수 있습니다.
  const rooms = [
    { id: 1, title: "전시회방 1", manager: "임세종", category: "exhibition", imageSeed: 'exhibition' },
    { id: 2, title: "공연방 1", manager: "한세종", category: "concert", imageSeed: 'concert' },
    { id: 3, title: "영화방 1", manager: "오세종", category: "movie", imageSeed: 'movie' },
    // 여기에 더 많은 취업 관련 방 데이터를 추가
  ];

  // 취업 관련 하위 항목 정의
  const artsSubCategories = [
    { name: "전시회", key: "exhibition" },
    { name: "공연", key: "concert" },
    { name: "영화", key: "movie" },
  ];

  // 선택된 항목에 따라 방 정보 필터링
  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredRooms = selectedCategory === 'all' ? rooms : rooms.filter(room => room.category === selectedCategory);

  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
  };
  return (
    <div className="flex flex-col min-h-screen">
      
      <div className='z-10'><Navbar /></div>

      <div className="flex flex-row z-5">

        <aside className="w-64 pt-4 pb-4 pl-4 pr-4 bg-gray-200 h-screen absolute">
          <button onClick={() => handleCategoryClick('all')} className="block text-left text-xl font-bold mb-4 py-1 px-2 w-full hover:bg-blue-500 hover:text-white rounded mt-2">
            문화예술
          </button>
          {artsSubCategories.map((category) => (
            <button key={category.key} onClick={() => handleCategoryClick(category.key)} className="block text-left text-sm py-1 px-2 w-full hover:bg-blue-500 hover:text-white rounded mt-2">
              {category.name}
            </button>
          ))}
        </aside>

        <main className="flex-grow pt-4 pl-80 pr-4 pb-4 h-screen overflow-auto">
          <div className="p-5 flex flex-wrap gap-4 justify-start">
            {filteredRooms.map((room) => (
              <div key={room.id} className="w-80 h-80 bg-gray-100 m-2 border-black-900 border-2 flex flex-col justify-center items-center cursor-pointer rounded" onClick={() => navigate(`/room_detail/${room.id}`)}>
                <img src={`https://source.unsplash.com/800x600/?${room.imageSeed}`} alt={room.title} className="w-full px-3 h-2/3 object-cover" />
                <div className="p-2 text-center">
                  <h3 className="text-lg font-bold">{room.title}</h3>
                  <p>{room.manager}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      
      <div className='z-10'>
      <Footer />
      </div>
    </div>
  );
}

export default Arts;