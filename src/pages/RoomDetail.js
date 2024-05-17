import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { format } from 'date-fns';

const RoomDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { imageSeed } = location.state || {};
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`http://localhost:8020/rooms/${id}`);
        if (!response.ok) {
          throw new Error('Room not found');
        }
        const data = await response.json();
        console.log("Fetched room data:", data);
        setRoom(data);
      } catch (error) {
        console.error('Failed to fetch room details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const deleteRoom = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:8020/rooms/delete/${roomId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the room');
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const formatDate = (dateStr) => format(new Date(dateStr), 'yyyy-MM-dd');

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 이 방을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const response = await deleteRoom(id);
      if (response.ok) {
        alert('방이 성공적으로 삭제되었습니다.');
        navigate(`/${room.main_type}`); // 삭제 후 main_type 페이지로 리디렉션
      } else {
        alert('방 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to delete room:', error);
      alert('방 삭제에 실패했습니다.');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!room) return <p>No room.</p>;

  return (
    <div className="flex flex-col min-h-screen text-left">
      {/* Navigation Bar */}
      <div className="z-10"><Navbar /></div>

      {/* Main Content */}
      <div className="flex flex-row z-5">
        <div className="flex-1 p-4 mt-5">
          <div className="relative">
            <img src={`https://source.unsplash.com/800x600/?${imageSeed}`} alt={room.project_name} className="w-full h-64 object-cover rounded-lg mb-4 blur-sm" />
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <span className="text-white text-lg font-bold text-5xl">{room.project_name}</span>
              <span className="text-white text-lg font-bold text-2xl">{room.main_type} - {room.sub_type}</span>
            </div>
          </div>

          <div className='flex flex-row mx-auto justify-center'>
            <div className='flex flex-col p-5 w-1/2'>
              {/* 방 세부사항 */}
              <div className='p-5 justify-center'>
                <p className='font-bold text-2xl'>방장</p>
                <p className='text-lg pl-5'>{room.leader}</p>
              </div>
              <div className='p-5 justify-center'>
                <p className='font-bold text-2xl'>최대 인원수</p>
                <p className='text-lg pl-5'>{room.occupancy}명</p>
              </div>
              <div className='p-5 flex flex-row'>
                <div className='mr-5'>
                  <p className="font-bold text-2xl">시작일</p> 
                  <p className='text-lg pl-5'>{formatDate(room.project_start)}</p>
                </div>
                <div className='ml-5'>
                  <p className="font-bold text-2xl">마감일</p> 
                  <p className='text-lg pl-5'>{formatDate(room.project_end)}</p>
                </div>
              </div>
              <div className='m-5 justify-center'>
                <p className='font-bold text-2xl'>방 소개 및 방장 프로필</p>
                <div className="overflow-auto h-48">
                  <p className="pl-5">{room.contents}</p>
                </div>
              </div>
            </div>

            {/* 참여자 목록 및 오픈채팅 링크 */}
            <div className='p-5 w-1/2 justify-center'>
              <div className='m-5 justify-center'>
                <p className='font-bold text-2xl'>오픈카톡방 주소</p>
                <a href={room.kakao_chat} className="text-blue-500 hover:text-blue-700 pl-5" target="_blank" rel="noopener noreferrer">{room.kakao_chat}</a>
              </div>
              <div className='m-5 justify-center'>
                <h2 className="text-xl font-bold">참가자</h2>
                {room.Users && room.Users.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {room.Users.map((user, index) => (
                      <li key={index} className="my-2">
                        {`학번: ${user.user_id}  / 이름: ${user.name}  / 전공: ${user.major}`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg">참여자가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button Group */}
      <div className="flex justify-center my-5">
        <button className="bg-[#42cec8] text-white font-bold py-2 px-4 m-1 rounded">참가</button>
        <button className="bg-[#42cec8] text-white font-bold py-2 px-4 m-1 rounded">탈퇴</button>
        <button onClick={() => navigate(`/room_update/${room.id}`, { state: { imageSeed: room.imageSeed } })} className="bg-[#42cec8] text-white font-bold py-2 px-4 m-1 rounded">수정</button>
        <button onClick={handleDelete} className="bg-[#42cec8] text-white font-bold py-2 px-4 m-1 rounded">삭제</button>
      </div>

      <Footer />
    </div>
  );
}

export default RoomDetail;
