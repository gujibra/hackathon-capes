'use client';

import Header from "../components/header";
import React, { useState, useEffect } from 'react';
import { getResposta } from '@/app/components/options';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Optinons from '@/app/components/options'


let textosResultado = false; 
let dadosResultado = false;  
let incertezasResultado = false; 
let escolha = '';

export default function SeeText() {
  const [resultadoDado, setResultadoDado] = useState('');
  const [resultadoTexto, setResultadoTexto] = useState('');
  const [resultadoIncerteza, setResultadoIncerteza] = useState('');
  const [opcao, setOpcao] = useState('');
  const [opcaoTela, setOpcaoTela] = useState('');
  const [overlayState, setOverlayState] = useState(false);

  useEffect(() => {
    console.log("oi")
    setOpcao(escolha);
    console.log(escolha);
  }, [opcaoTela]);

   useEffect(() => {
    if (opcao === "incertezas") {
      setResultadoIncerteza(getResposta());
    } else if (opcao === "dados") {
      setResultadoDado(getResposta());
    } else if (opcao === "texto") {
      setResultadoTexto(getResposta());
    }
  }, [opcao]); 

  return (
    <div>
      <Header />
      {overlayState && <Optinons setOverlayState={setOverlayState} />}
      <div className="flex pr-16"> 
        <div className="w-max h-screen pr-5 pl-5 bg-[#E9E6E6] backdrop-blur-md text-[#2b2b2b] flex flex-col">
          <div className="p-4 text-lg font-bold shadow-lg hover:shadow-lg">
            <div className='flex items-center pt-5'>
              <i className="fa-solid fa-square-poll-horizontal mr-2 h-5 w-5"></i>
              <h1 className='br-5'>Resultados</h1>
            </div>
          </div>
          <nav className="flex-grow">
            <ul className="mt-4">
              {textosResultado && (
                <div className='flex items-center cursor-pointer hover:bg-[#DEDADA]' onClick={() => { setOpcaoTela("texto")}}>
                  <i className="fa-solid fa-pencil pl-2 mr-2 w-0"></i>
                  <li className="p-4 font-semibold">Textos</li>
                </div>
              )}
              {dadosResultado && (
                <div className='flex items-center cursor-pointer hover:bg-[#DEDADA]' onClick={() => setOpcaoTela("dados")}>
                  <i className="fa-solid fa-chart-line pl-2 mr-2 w-0"></i>
                  <li className="p-4 font-semibold">Dados</li>
                </div>
              )}
              {incertezasResultado && (
                <div className='flex items-center cursor-pointer hover:bg-[#DEDADA]' onClick={() => {  setOpcaoTela("incertezas") }}>
                  <i className="fa-solid fa-flask pl-2 mr-2 w-0"></i>
                  <li className="p-4 font-semibold">Incertezas e Hipóteses</li>
                </div>
              )}
              <div className='flex items-center cursor-pointer hover:bg-[#DEDADA]' onClick={() => setOverlayState(true)}>
                <i className="fa-solid fa-plus pl-2 mr-2 w-0"></i>
                <li className="p-4 font-semibold">Analise seu texto</li>
              </div>
            </ul>
          </nav>
        </div>
        <div className="flex-1 p-6"> 
          <h1 className="text-3xl font-bold border-b-2 border-[#F5D649] mb-2">
            Resultado da verificação
          </h1>
          <div className="rounded-lg mt-5 text-left px-5 pt-5 w-full h-full bg-[#E9E6E6]">
            {opcaoTela === 'dados' && (
              <div>
                <h2 className="text-2xl font-bold">Dados</h2>
                <p>{resultadoDado}</p>
              </div>
            )}
            {opcaoTela === 'texto' && (
              <div>
                <h2 className="text-2xl font-bold">Textos</h2>
                <p>{resultadoTexto}</p>
              </div>
            )}
            {opcaoTela === 'incertezas' && (
              <div>
                <h2 className="text-2xl font-bold">Incertezas e Hipóteses</h2>
                <p>{resultadoIncerteza}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function setEscolhaPage(str){
  escolha = str;
}

export function setTexto(){
  textosResultado = true;
}
export function setDados(){
  dadosResultado = true;
}
export function setIncertezas(){
  incertezasResultado = true;
}