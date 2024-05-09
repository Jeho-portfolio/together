import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  // Event handler for the "Create Room" button
  const handleCreateRoom = () => {
    navigate('/create-room'); // Navigate to the /create-room path
  };

  return (
    <div className="flex flex-wrap justify-between items-center p-4 shadow-md" style={{ minWidth: '320px' }}>
      <div style={{ flex: 1, minWidth: '150px', marginRight: '10px' }}>  
        <input type="text" placeholder="검색..." className="input input-bordered input-primary w-full" />
      </div>
      <button onClick={handleCreateRoom} className="btn btn-primary" style={{ minWidth: '100px', whiteSpace: 'nowrap' }}>방 만들기</button>  
    </div>
  );
}

export default Header;
