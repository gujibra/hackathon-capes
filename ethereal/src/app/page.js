'use client';

import React, { useState } from 'react';
import Overlay from './overlay'; 

export default function App() {
  const [overlayState, setOverlayState] = useState(false);  

  return (    
    <div className="flex items-center justify-center min-h-screen">
      {overlayState && <Overlay setOverlayState={setOverlayState} />}
      <button 
        onClick={() => setOverlayState(true)}
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Começe agora!
      </button>
    </div>
  );
}
