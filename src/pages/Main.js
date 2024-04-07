import React from 'react';
import Navbar from '../components/Navbar'; // Navbar 컴포넌트의 경로에 맞게 조정하세요.
import Footer from '../components/Footer'; // Footer 컴포넌트의 경로에 맞게 조정하세요.

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
      <div className="container mx-auto px-6 py-8">
  <div className="flex justify-center"> {/* 이 div를 사용하여 이미지를 가운데 정렬합니다. */}
    <img 
      src={`${process.env.PUBLIC_URL}/banner.png`} 
      alt="배너 이미지"
      style={{ width: '600px', height: 'auto' }} // 원하는 크기 지정
      className="rounded-lg shadow-lg"
    />
  </div>
    </div>
      </main>
      <Footer />
    </div>
  );
};

export default Main;
