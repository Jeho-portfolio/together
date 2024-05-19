import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyRoom() {
  const navigate = useNavigate();
  const [createdRooms, setCreatedRooms] = useState([]);
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCreatedRooms = async () => {
      try {
        const response = await fetch('http://localhost:8020/My_Room', {
          credentials: 'include',
        });
        if (response.status === 401) {
          alert('로그인을 해주세요');
          navigate('/login'); // 로그인 페이지로 이동
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch created rooms');
        }
        const data = await response.json();
        setCreatedRooms(data);
      } catch (error) {
        console.error('Error fetching created rooms:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8020/', {
          credentials: 'include',
        });
        if (response.status === 401) {
          alert('로그인을 해주세요');
          navigate('/login'); // 로그인 페이지로 이동
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
        setJoinedRooms(data.Rooms);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCreatedRooms();
    fetchUser();
  }, [navigate]);

  const handleRoomClick = (id) => {
    navigate(`/room_detail/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen text-left">
      {/* 네비게이션 바 */}
      <div className="z-10"><Navbar /></div>

      {/* 메인 */}
      <div className="flex z-5">
        {/* 개인 정보칸 */}
        <div className="w-1/4 m-5 p-5 bg-gray-100 border-2 border-gray">
          <div className='flex justify-center'>
            <img className='w-2/3 h-auto' src={`${process.env.PUBLIC_URL}/default_profile.png`} alt="프로필 이미지" />
          </div>
          
          {/* 이름 */}
          {user && (
            <>
              <p className='mt-10 mb-10 text-4xl font-bold'> {user.name} </p>

              {/* 개인 정보들 */}
              <div className='mx-2'>
                <div className='w-full'>
                  <p className='text-base mt-1'> {user.major} </p>
                </div>

                <div className='w-full my-5 text-base'>
                  <p className=''> 학번: {user.user_id} </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 참가한 방들 목록 */}
        <div className="w-3/4 flex-col m-5 p-5 h-screen overflow-auto bg-gray-100 border-2 border-gray">
          <h2 className="text-2xl font-bold mb-4">내가 만든 방</h2>
          {createdRooms.map(room => (
            <div key={room.id} className='flex flex-row h-auto w-auto m-5 p-5 bg-white border-2 border-gray items-center overflow-auto cursor-pointer' onClick={() => handleRoomClick(room.id)}>
              {/* 방 제목 */}
              <div className='w-1/4 mx-5 py-3'>
                <p className='font-bold text-xl'>방 제목</p>
                <p className='text-base px-2'>{room.project_name}</p>
              </div>

              {/* 방 정보들 */}
              <div className='flex flex-row flex-1 justify-center items-center'>
                {/* 방장 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className='font-bold text-xl'>방장</p>
                  <p className='text-base px-2'>{room.leader}</p>
                </div>

                {/* 최대인원수 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className='font-bold text-xl'>최대인원수</p>
                  <p className='text-base px-2'>{room.occupancy}명</p>
                </div>

                {/* 시작일 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className="font-bold text-xl">시작일</p> 
                  <p className='text-base px-2'>{room.project_start.split('T')[0]}</p>
                </div>

                {/* 마감일 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className="font-bold text-xl">종료일</p> 
                  <p className='text-base px-2'>{room.project_end.split('T')[0]}</p>
                </div>
              </div>
            </div>
          ))}

          <h2 className="text-2xl font-bold mb-4">내가 참가한 방</h2>
          {joinedRooms.map(room => (
            <div key={room.id} className='flex flex-row h-auto w-auto m-5 p-5 bg-white border-2 border-gray items-center overflow-auto cursor-pointer' onClick={() => handleRoomClick(room.id)}>
              {/* 방 제목 */}
              <div className='w-1/4 mx-5 py-3'>
                <p className='font-bold text-xl'>방 제목</p>
                <p className='text-base px-2'>{room.project_name}</p>
              </div>

              {/* 방 정보들 */}
              <div className='flex flex-row flex-1 justify-center items-center'>
                {/* 방장 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className='font-bold text-xl'>방장</p>
                  <p className='text-base px-2'>{room.leader}</p>
                </div>

                {/* 최대인원수 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className='font-bold text-xl'>최대인원수</p>
                  <p className='text-base px-2'>{room.occupancy}명</p>
                </div>

                {/* 시작일 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className="font-bold text-xl">시작일</p> 
                  <p className='text-base px-2'>{room.project_start.split('T')[0]}</p>
                </div>

                {/* 마감일 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className="font-bold text-xl">종료일</p> 
                  <p className='text-base px-2'>{room.project_end.split('T')[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}

export default MyRoom;
