import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Sports() {
  const navigate = useNavigate();
  const rooms = [
    { id: 1, title: "헬스방 1", manager: "윤세종", category: "gym", imageSeed: 'work_out' },
    { id: 2, title: "레저방 1", manager: "장세종", category: "leisure_sports", imageSeed: 'sports' },
    // Add more rooms with unique imageSeeds
  ];

  const sportsSubCategories = [
    { name: "헬스", key: "gym" },
    { name: "레저", key: "leisure_sports" },
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
            스포츠
          </button>
          {sportsSubCategories.map((category) => (
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

export default Sports;