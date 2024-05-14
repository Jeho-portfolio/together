import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { format } from 'date-fns';

const UpdateRoom = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { imageSeed } = location.state || {};
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // 수정할 필드 상태 추가
  const [leader, setLeader] = useState('');
  const [occupancy, setOccupancy] = useState('');
  const [projectStart, setProjectStart] = useState('');
  const [projectEnd, setProjectEnd] = useState('');
  const [contents, setContents] = useState('');
  const [kakaoChat, setKakaoChat] = useState('');

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
        // 초기 상태 설정
        setLeader(data.leader);
        setOccupancy(data.occupancy);
        setProjectStart(format(new Date(data.project_start), 'yyyy-MM-dd'));
        setProjectEnd(format(new Date(data.project_end), 'yyyy-MM-dd'));
        setContents(data.contents);
        setKakaoChat(data.kakao_chat);
      } catch (error) {
        console.error('Failed to fetch room details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8020/rooms/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leader,
          occupancy,
          project_start: projectStart,
          project_end: projectEnd,
          contents,
          kakao_chat: kakaoChat,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update the room');
      }
      alert('방이 성공적으로 수정되었습니다.');
      navigate(`/${room.main_type}`); // 수정 후 main_type 페이지로 리디렉션
    } catch (error) {
      console.error('Failed to update room:', error);
      alert('방 수정에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!room) return <p>No room details available.</p>;

  const inputStyle = {
    backgroundColor: '#333', // 어두운 배경색
    color: '#fff', // 밝은 텍스트색
    border: '1px solid #555', // 어두운 테두리색
    padding: '10px',
    borderRadius: '4px',
    width: '100%',
  };

  const textareaStyle = {
    ...inputStyle,
    height: '100px',
  };

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
              {/* 방 세부사항 입력 필드 */}
              <div className='p-5 justify-center'>
                <p className='font-bold text-2xl'>방장</p>
                <input
                  type="text"
                  value={leader}
                  onChange={(e) => setLeader(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div className='p-5 justify-center'>
                <p className='font-bold text-2xl'>최대 인원수</p>
                <input
                  type="number"
                  value={occupancy}
                  onChange={(e) => setOccupancy(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div className='p-5 flex flex-row'>
                <div className='mr-5'>
                  <p className="font-bold text-2xl">시작일</p>
                  <input
                    type="date"
                    value={projectStart}
                    onChange={(e) => setProjectStart(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div className='ml-5'>
                  <p className="font-bold text-2xl">마감일</p>
                  <input
                    type="date"
                    value={projectEnd}
                    onChange={(e) => setProjectEnd(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>
              <div className='m-5 justify-center'>
                <p className='font-bold text-2xl'>방 소개 및 방장 프로필</p>
                <textarea
                  value={contents}
                  onChange={(e) => setContents(e.target.value)}
                  style={textareaStyle}
                />
              </div>
            </div>

            {/* 참여자 목록 및 오픈채팅 링크 */}
            <div className='p-5 w-1/2 justify-center'>
              <div className='m-5 justify-center'>
                <p className='font-bold text-2xl'>오픈카톡방 주소</p>
                <input
                  type="text"
                  value={kakaoChat}
                  onChange={(e) => setKakaoChat(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div className='m-5 justify-center'>
                <h2 className="text-xl font-bold">참가자</h2>
                {room.Users && room.Users.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {room.Users.map((user, index) => (
                      <li key={index} className="my-2">
                        {`학번: ${user.user_id} / 이름: ${user.name} / 전공: ${user.major}`}
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
        <button onClick={handleUpdate} className="bg-[#42cec8] text-white font-bold py-2 px-4 m-1 rounded">확인</button>
        <button onClick={handleCancel} className="bg-[#42cec8] text-white font-bold py-2 px-4 m-1 rounded">취소</button>
      </div>

      <Footer />
    </div>
  );
}

export default UpdateRoom;
