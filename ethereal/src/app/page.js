'use client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import Overlay from './components/dragPdf';
import Header from './components/header';


export default function App() {
  const [overlayState, setOverlayState] = useState(false);
 

  return (
    <div className="main">
      <Header />
      <div className="flex flex-col items-center justify-start min-h-screen space-y-6 mt-10 pt-4">
        
        {overlayState && <Overlay setOverlayState={setOverlayState} />}
        <div className="person">
          <i className="fa-solid fa-address-book text-9xl" style={{ color: '#1a3269' }}></i>
        </div>
        <div>
          <a
            className="text-[#fffff] text-3xl font-bold text-justify"
          >
            Verifique seu texto <br/> agora mesmo!
          </a>
        </div>
        <button
          onClick={() => setOverlayState(true)}
          className="mt-4 px-6 py-3 text-white rounded-md hover:bg-[#141447] bg-[#1c1c5e] transition-colors duration-300 text-xl font-bold"
        >
          Comece agora
        </button>
      </div>
    </div>
  );
  
}
