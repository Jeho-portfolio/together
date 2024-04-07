import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  // "방 만들기" 버튼 클릭 이벤트 핸들러
  const handleCreateRoom = () => {
    navigate('/create-room'); // /create-room 경로로 이동합니다.
  };

  return (
    <div className="flex justify-between items-center p-4 shadow-md">
  <input type="text" placeholder="검색..." className="input input-bordered input-primary w-full max-w-xs" />
  <button onClick={handleCreateRoom} className="btn btn-primary">방 만들기</button>
</div>
  );
}

export default Header;
