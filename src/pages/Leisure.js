import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Leisure() {
  const navigate = useNavigate();
  const rooms = [
    { id: 1, title: "여행방 1", manager: "서세종", category: "taveling", imageSeed: 'travel' },
    { id: 2, title: "맛집방 1", manager: "신세종", category: "restaurant", imageSeed: 'restaurant' },
    { id: 3, title: "게임방 1", manager: "권세종", category: "game", imageSeed: 'video_game' },
    // Add more rooms with unique imageSeeds
  ];

  const leisureSubCategories = [
    { name: "여행", key: "taveling" },
    { name: "맛집", key: "restaurant" },
    { name: "게임", key: "game" },
  ];

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
            여가
          </button>
          {leisureSubCategories.map((category) => (
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

export default Leisure;