import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';


function MyRoom() {

  const [roomDetail, setRoomDetail] = useState(null);
  const personal_info = {
    user_id: "유저아이디", name: "김세종", major: "컴퓨터공학과", phone_number: "010-0000-0000", email: "sejong@sejong.ac.kr", profile: "개인 프로필정보 어쩌구 저쩌구 아무거나 적는 이상한 소리들 주저리주저리하는 글을ㄹ ㅁㄴ어ㅏ럼ㄴ이ㅏ럼니ㅏㅇ렄니ㅏㅇ"
  };

  return (
    <div className="flex flex-col min-h-screen text-left">

      {/* 네비게이션 바 */}
      <div className="z-10"><Navbar /></div>
      
      {/* 메인 */}
      <div className="flex z-5">

        {/* 개인 정보칸 */}
        <div className="w-1/4 m-5 p-5 bg-gray-100 border-2 border-gray">
          <div className='flex justify-center'><img className='w-2/3 h-auto' src={`${process.env.PUBLIC_URL}/default_profile.png`}></img></div>
          
          {/* 이름 */}
          <p className='mt-10 text-4xl font-bold'> {personal_info.name} </p>

          {/* 개인 정보들 */}
          <div className='mx-2'>
            <div className='w-full'>
              <p className='text-base mt-1'> {personal_info.major} </p>
            </div>

            <div className='w-full my-5 text-base'>
              <p className=''> {personal_info.phone_number} </p>
              <p className=''> {personal_info.email} </p>
            </div>
            
            <div className='w-full overflow-y-auto'>
              <p className='my-2'> {personal_info.profile} </p>
            </div>
          </div>

        </div>

        {/* 참가한 방들 목록 */}
        <div className="w-3/4 flex-col m-5 p-5 h-screen overflow-auto bg-gray-100 border-2 border-gray">

          <div className='flex flex-row h-auto w-auto m-5 p-5 bg-white border-2 border-gray items-center overflow-auto'>
            {/* 방장, 최대 인원수, 시작일, 마감일 */}
            
            {/* 가상의 화면이미지 */}
            <div className='h-48 w-48 bg-gray-100'></div>

            {/* 방 정보들 */}
            <div className='flex flex-row flex-1 justify-center items-center'>

                {/* 방장 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className='font-bold text-xl'>방장</p>
                  <p className='text-base px-2'>방장이름</p>
                </div>

                {/* 최대인원수 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className='font-bold text-xl'>최대인원수</p>
                  <p className='text-base px-2'>n명</p>
                </div>

                {/* 시작일 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className='font-bold text-xl'>시작일</p>
                  <p className='text-base px-2'>2024-05-30</p>
                </div>

                {/* 마감일 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className='font-bold text-xl'>종료일</p>
                  <p className='text-base px-2'>2024-06-30</p>
                </div>
            </div>

          </div>


          <div className='flex flex-row h-auto w-auto m-5 p-5 bg-white border-2 border-gray items-center overflow-auto'>
            {/* 방장, 최대 인원수, 시작일, 마감일 */}
            
            {/* 가상의 화면이미지 */}
            <div className='h-48 w-48 bg-gray-100'></div>

            {/* 방 정보들 */}
            <div className='flex flex-row flex-1 justify-center items-center'>

                {/* 방장 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className='font-bold text-xl'>방장</p>
                  <p className='text-base px-2'>방장이름</p>
                </div>

                {/* 최대인원수 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className='font-bold text-xl'>최대인원수</p>
                  <p className='text-base px-2'>n명</p>
                </div>

                {/* 시작일 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className='font-bold text-xl'>시작일</p>
                  <p className='text-base px-2'>2024-05-30</p>
                </div>

                {/* 마감일 */}
                <div className='w-1/4 mx-5 py-3'>
                  <p className='font-bold text-xl'>종료일</p>
                  <p className='text-base px-2'>2024-06-30</p>
                </div>
            </div>
            
          </div>
        </div>
                
      </div>

      {/* footer */}
      <Footer />
      
    </div>
  );
}

export default MyRoom;