import React from 'react';
import Navbar from '../components/Navbar'; 
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Room from '../components/Room';

function Rooms() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar 고정 */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="flex flex-grow mt-16"> {/* Navbar의 높이만큼 marginTop을 줘서 컨텐츠가 Navbar 아래 시작하도록 합니다. */}
        {/* Sidebar 고정 */}
        

        {/* Main 컨텐츠에는 Sidebar 너비만큼 marginLeft를 주어야 합니다. */}
        <main className="flex-grow ml-64 pt-4 pb-4 pl-4 pr-4"> {/* Sidebar의 너비에 맞춰 조정 */}
          <Room />
        </main>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Rooms;
