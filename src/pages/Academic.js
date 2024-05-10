import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Academic() {
  const navigate = useNavigate();
  const rooms = [
    { id: 1, title: "스터디방 1", manager: "김세종", category: "study", imageSeed: 'study' },
    { id: 2, title: "공모전방 1", manager: "이세종", category: "contest", imageSeed: 'cooperation' },
    { id: 3, title: "과제방 1", manager: "박세종", category: "assignment", imageSeed: 'homework' },
    { id: 4, title: "동아리방 1", manager: "최세종", category: "club", imageSeed: 'school_club' },
    // Add more rooms with unique imageSeeds
  ];

  const academicSubCategories = [
    { name: "스터디", key: "study" },
    { name: "공모전", key: "contest" },
    { name: "과제", key: "assignment" },
    { name: "동아리", key: "club" },
  ];
  window.AcademicSubCategories = academicSubCategories;

  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredRooms = selectedCategory === 'all' ? rooms : rooms.filter(room => room.category === selectedCategory);

  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
  };

  return (
    <div className="flex-col min-h-screen" >

      {/* 네비게이션바 수정됨 */}
      <div className='z-10'><Navbar /></div>

      <div className="flex flex-row z-5">

        {/* 사이드바 */}
        <aside className="w-64 pt-4 pb-4 pl-4 pr-4 bg-gray-200 h-screen absolute z-1">

          {/* 사이드바 제목 */}
          <button onClick={() => handleCategoryClick('all')} className="block text-left text-xl font-bold mb-4 py-1 px-2 w-full hover:bg-blue-500 hover:text-white rounded mt-2">
            학업
          </button>

          {/* 사이드바 내용들 */}
          {academicSubCategories.map((category) => (
            <button key={category.key} onClick={() => handleCategoryClick(category.key)} className="block text-left text-sm py-1 px-2 w-full hover:bg-blue-500 hover:text-white rounded mt-2">
              {category.name}
            </button>
          ))}
        </aside>

        {/* 메인 내용들 */}
        <main className="flex-grow pt-4 pl-80 pr-4 pb-4 h-screen overflow-auto">

          {/* 각 방들 */}
          <div className="p-5 flex flex-wrap gap-4 justify-evenly">
            {filteredRooms.map((room) => (

              /* 스타일 수정 */
              <div key={room.id} className="w-80 h-80 bg-gray-100 m-2 border-black-900 border-2 flex flex-col justify-center items-center cursor-pointer rounded" onClick={() => navigate(`/room_detail/${room.id}`)}>
                <img src={`https://source.unsplash.com/800x600/?${room.imageSeed}`} alt={room.title} className="w-full px-3 h-2/3 object-cover rounded" />
                <div className="p-2 text-center">
                  <h3 className="text-lg font-bold">{room.title}</h3>
                  <p>{room.manager}</p>
                </div>
              </div>
            ))}

          </div>
        </main>

      </div>
      
      {/* footer */}
      <div className='z-10'> <Footer /> </div>
    </div>
  );
}

export default Academic;