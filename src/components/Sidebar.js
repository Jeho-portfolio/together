import React, { useState, useEffect } from 'react';

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [data, setData] = useState([]);

  // 모의 데이터베이스 조회 함수
  const fetchData = (category) => {
    console.log(`데이터베이스에서 ${category}에 대한 데이터를 조회합니다.`);
    // 실제 데이터베이스 조회 로직을 여기에 구현
    // 예시를 위해 간단한 모의 데이터 사용
    const mockData = {
      스터디: ["스터디 A", "스터디 B"],
      공모전: ["공모전 A", "공모전 B"],
      과제: ["과제 A", "과제 B"],
      동아리: ["동아리 A", "동아리 B"]
    };
    return mockData[category] || [];
  };

  // 활성화된 카테고리가 변경될 때마다 데이터 조회
  useEffect(() => {
    if (activeCategory) {
      const newData = fetchData(activeCategory);
      setData(newData);
    }
  }, [activeCategory]);

  const categories = [
    "스터디", "공모전", "과제", "동아리"
  ];

  return (
    <aside className="w-64 h-full bg-gray-100 p-5">
      <h2 className="text-xl font-semibold mb-4">학업</h2>
      <div className="flex flex-col">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`text-left py-2 px-4 text-sm hover:bg-gray-200 rounded ${activeCategory === category ? 'bg-blue-200' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">선택된 카테고리 데이터:</h3>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
