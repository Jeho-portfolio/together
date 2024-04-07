import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Academic from './pages/Academic';
import Employment from './pages/Employment'; // 취업 페이지 컴포넌트
import Sports from './pages/Sports'; // 스포츠 페이지 컴포넌트
import Arts from './pages/Arts'; // 문화예술 페이지 컴포넌트
import Leisure from './pages/Leisure'; // 여가 페이지 컴포넌트
import Social from './pages/Social'; // 사회활동 페이지 컴포넌트
import CreateRoom from './pages/CreateRoom';
import RoomDetail from './pages/RoomDetail'; // 방 상세 페이지 컴포넌트 import
import Main from './pages/Main';
import Login from './pages/Login';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/academic" element={<Academic />} />
        <Route path="/employment" element={<Employment />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/arts" element={<Arts />} />
        <Route path="/leisure" element={<Leisure />} />
        <Route path="/social" element={<Social />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/room_detail/:roomId" element={<RoomDetail />} />

      </Routes>
    </Router>
  );
}

export default App;