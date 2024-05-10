import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RoomDetail = () => {
  const { roomId } = useParams();
  const [roomDetail, setRoomDetail] = useState(null);
  const [roomMembers, setRoomMembers] = useState([]);

  useEffect(() => {
    const roomDetailsMock = {
      1: { 
        title: '스터디방 1', 
        majorCategory: '학업', 
        subCategory: '스터디', 
        maxPeople: 5, 
        openTalk: 'http://opentalk.example.com',
        startDate: '2023-10-01',
        endDate: '2023-12-31',
        description: '같이 공부해봐요',
        members: ['Alice', 'Bob', 'Charlie'],
        leader: 'Alice',  // 방장 정보 추가
        image: 'https://source.unsplash.com/random/800x600?study'
      },
      2: { 
        title: '공모전방 1', 
        majorCategory: '학업', 
        subCategory: '공모전', 
        maxPeople: 10, 
        openTalk: 'http://opentalk.example.com',
        startDate: '2023-10-10',
        endDate: '2024-01-10',
        description: '공모전 열심히 준비해봅시다',
        members: ['Dave', 'Eve', 'Frank'],
        leader: 'Dave',  // 방장 정보 추가
        image: 'https://source.unsplash.com/random/800x600?cooperation'
      },
    };

    if (roomDetailsMock[roomId]) {
      setRoomDetail(roomDetailsMock[roomId]);
      setRoomMembers(roomDetailsMock[roomId].members);
    }
  }, [roomId]);

  if (!roomDetail) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen text-left">

      {/* Navigation Bar */}
      <div className="z-10"><Navbar /></div>

      {/* Main Content */}
      <div className="flex flex-row z-5">
        
        <div className="flex-1 p-4 mt-5">
          <div className="relative">
            <img src={roomDetail.image} alt={roomDetail.title} className="w-full h-64 object-cover rounded-lg mb-4 blur-sm" />
            <div className="absolute inset-0 flex flex-col justify-center items-center">

              {/* 폰트 버그 수정 */}
              <span className="p-2 text-white font-bold text-5xl">{roomDetail.title}</span>
              <span className="p-2 text-white font-bold text-2xl">{roomDetail.majorCategory} - {roomDetail.subCategory}</span>
            </div>
          </div>

          <div className='flex flex-row mx-auto justify-center'>
            <div className='flex flex-col p-5 w-1/2'>
              {/* 방 세부사항 */}
              <div className='p-5 justify-center'>
                <p className='font-bold text-2xl'>방장</p>
                <p className='text-lg pl-5'>{roomDetail.leader}</p>
              </div>
              <div className='p-5 justify-center'>
                <p className='font-bold text-2xl'>최대 인원수</p>
                <p className='text-lg pl-5'>{roomDetail.maxPeople}명</p>
              </div>
              <div className='p-5 flex flex-row'>
                <div className='mr-5'>
                  <p className="font-bold text-2xl">시작일</p> 
                  <p className='text-lg pl-5'>{roomDetail.startDate}</p>
                </div>
                <div className='ml-5'>
                  <p className="font-bold text-2xl">마감일</p> 
                  <p className='text-lg pl-5'>{roomDetail.endDate}</p>
                </div>
              </div>
              <div className='m-5 justify-center'>
                <p className='font-bold text-2xl'>방 소개 및 방장 프로필</p>
                <div className="overflow-auto h-48">
                  <p className="pl-5">{roomDetail.description}</p>
                </div>
              </div>
            </div>

            {/* 참여자 목록 및 오픈채팅 링크 */}
            <div className='p-5 w-1/2 justify-center'>
              <div className='m-5 justify-center'>
                <p className='font-bold text-2xl'>오픈카톡방 주소</p>
                <a href={roomDetail.openTalk} className="text-blue-500 hover:text-blue-700 pl-5" target="_blank" rel="noopener noreferrer">{roomDetail.openTalk}</a>
              </div>
              <div className='m-5 justify-center'>
                <h3 className="text-2xl font-bold">참가자</h3>
                <ul className="list-disc pl-5 mx-5">
                  {roomMembers.map(member => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button Group */}
      <div className="flex justify-center my-5">
        <button className="bg-[#42cec8] text-white font-bold py-2 px-4 m-1 rounded">참가</button>
        <button className="bg-[#42cec8] text-white font-bold py-2 px-4 m-1 rounded">탈퇴</button>
        <button className="bg-[#42cec8] text-white font-bold py-2 px-4 m-1 rounded">수정</button>
        <button className="bg-[#42cec8] text-white font-bold py-2 px-4 m-1 rounded">삭제</button>
      </div>

      <Footer />
    </div>
  );
}

export default RoomDetail;
