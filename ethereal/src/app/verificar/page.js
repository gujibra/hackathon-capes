'use client';

import { readText } from "@/app/features/textUtils";
import { useState } from "react";
import Header from "../components/header";


export default function SeeText() {
  const [text, setText] = useState('');

  async function handleClick() {
    try {
      console.log("clicando");
      let extractedText = "oiii";
      extractedText += await readText();
      setText(extractedText);
    } catch (error) {
      setText("Erro ao ler o PDF");
    }
  }

  return (
    <div>
      <Header/>

      <div>
      <button
        onClick={handleClick}
        className="px-6 py-2 text-black font-semibold shadow-md hover:shadow-lg focus:outline-none transition-transform transform hover:scale-105"
      >
        Ler Texto
      </button>

      <h1>Texto Extraído do PDF:</h1>
      <p>{text}</p>
      </div> 
    </div>
  );
}
