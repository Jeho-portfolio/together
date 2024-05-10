import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="p-10 bg-white rounded shadow-lg">
        <div className="flex justify-center mb-4">
          <a href="/">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="h-12" />
          </a>
        </div>
        <p className="text-center text-gray-700 mb-8">
          대양휴머니티칼리지에 로그인하여 인증합니다<br />같이할래?는 사용자 정보를 서버에 저장하지 않습니다.
        </p>
        <div className="space-y-4">
          <input type="text" placeholder="아이디" className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline" />
          <input type="password" placeholder="비밀번호" className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline" />
        </div>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition-colors">
          로그인
        </button>
        <div className="text-center mt-4">
          <a href="/signin" className="text-blue-500 hover:underline">처음 오셨나요? 회원가입 하기</a>
        </div>
      </div>
    </div>
  );
};

export default Login;