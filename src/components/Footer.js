import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 h-full">
      <div className="container mx-auto text-center">
        <p className="text-white text-sm">
          연락처 이메일: <a href="mailto:contact@example.com" className="underline">contact@example.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;