import React from 'react';
import { useParams } from 'react-router-dom';

function RoomDetail() {
  const { roomId } = useParams(); // URL에서 roomId 파라미터를 추출

  return (
    <div>
      <h1>방 상세 정보</h1>
      <p>방 ID: {roomId}</p>
      {/* 여기에 방 상세 정보를 렌더링 */}
    </div>
  );
}

export default RoomDetail;
