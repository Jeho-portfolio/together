import React, { useState } from 'react';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // 에러 메시지 초기화

    try {
      const response = await fetch('/auth/auth_sejong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, pw }),
      });

      console.log('Server response:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        window.location.href = '/'; // 사용자를 홈페이지로 리디렉션
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData.message);
        setError(errorData.message || '로그인에 실패하였습니다.');
      }
    } catch (error) {
      setError('아이디 비밀번호를 확인해주세요.');
      console.error(error);
    } finally {
      setIsLoading(false); // 요청 완료 후 로딩 종료
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <form className="p-10 bg-white rounded shadow-lg" onSubmit={handleLogin}>
        <div className="flex justify-center mb-4">
          <a href="/">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="h-12" />
          </a>
        </div>
        <p className="text-center text-gray-700 mb-8">
          대양휴머니티칼리지에 로그인하여 인증합니다.<br />같이할래?는 사용자 정보를 서버에 저장하지 않습니다.
        </p>
        <div className="space-y-4">
          <label htmlFor="id-input" className="block text-sm font-medium text-gray-700">아이디</label>
          <input id="id-input" type="text" placeholder="아이디" className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
            value={id} onChange={(e) => setId(e.target.value)} />
          <label htmlFor="pw-input" className="block text-sm font-medium text-gray-700">비밀번호</label>
          <input id="pw-input" type="password" placeholder="비밀번호" className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
            value={pw} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition-colors">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full" role="status">
                <span className="visually-hidden">--</span>
              </div>
            </div>
          ) : '로그인'}
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        
      </form>
    </div>
  );
};

export default Login;
