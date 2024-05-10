import React from 'react';
import { useNavigate } from 'react-router-dom';

function Room({ rooms }) {
  const navigate = useNavigate();

  // 방 목록 데이터 확장
  // 예를 들어, 각 방에 description과 image를 추가합니다.

  // 방 클릭 핸들러
  const handleRoomClick = (roomId) => {
    navigate(`/room_detail/${roomId}`);
  };

  return (
    <div className="p-5 flex flex-wrap gap-4 justify-start">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="w-96 h-96 bg-gray-200 m-2 flex flex-col justify-center items-center cursor-pointer"
          onClick={() => handleRoomClick(room.id)}
        >
          {/* 이미지 추가 */}
          <img src={room.image} alt="Room" className="w-full h-2/3 object-cover" />
          {/* 제목 및 설명 추가 */}
          <div className="p-2 text-center">
            <h3 className="text-lg font-bold">{room.title}</h3>
            <p>{room.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Room;