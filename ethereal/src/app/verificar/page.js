'use client';

import { useState } from "react";
import Header from "../components/header";
import Optinons, { getResposta } from '@/app/components/options'


export default function SeeText() {
  const [overlayState, setOverlayState] = useState(false);    
  let text = getResposta();

  return (
    <div>
      <Header/>
      {overlayState && <Optinons setOverlayState={setOverlayState} />}

      <div>
      <button
        onClick={() => setOverlayState(true)}
        
        className="px-6 py-2 text-black font-semibold shadow-md hover:shadow-lg focus:outline-none transition-transform transform hover:scale-105"
      >
        Ler Texto
      </button>

      <h1>resposta:</h1>
      <p>{text}</p>
      </div> 
    </div>
  );
}
