import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Room from '../components/Room';

function Arts() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>
      <div className="flex flex-grow mt-16">
        <main className="flex-grow ml-64 pt-4 pb-4 pl-4 pr-4">
          <Room />
        </main>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Arts;
