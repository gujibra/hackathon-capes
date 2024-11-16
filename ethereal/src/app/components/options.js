import React, { useState, useRef, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { readText } from '../features/textUtils';
import { verficarIncertezasiaAI, verficarOrtografiaAI, verificarDadosAi } from '../features/AI';
let resposta = '';
let escolha = '';

export default function Options({ setOverlayState }) {
    const [fadeIn, setFadeIn] = useState(false);
    const overlayRef = useRef(null);    
    
    const [focoVerificacao, setFocoVerificacao] = useState('');
    const [detalhesVerificacao, setDetalhesVerificacao] = useState({
        detalhamentoErros: false,
        linguagemPersonalizada: false,
        verificacaoMixada: false,
    });
    const [verificacaoMixada, setVerificacaoMixada] = useState({
        dadosAnomalos: false,
        aprimoramentoTexto: false,
        incertezasHipoteses: false,
    });

    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (overlayRef.current && !overlayRef.current.contains(event.target)) {
                setOverlayState(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        setFadeIn(true);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setOverlayState]);   

    const handleFocoClick = (foco) => {
        setEscolha(foco);
        setFocoVerificacao(foco);       
    }

    const handleDetalhesChange = (e) => {
        const { name, checked } = e.target;
        setDetalhesVerificacao({ ...detalhesVerificacao, [name]: checked });
    };

    const handleMixadaChange = (e) => {
        const { name, checked } = e.target;
        setVerificacaoMixada({ ...verificacaoMixada, [name]: checked });
    };

    async function callAi() {        
        try {
          const extractedText = await readText();
          let respostaAi = "escolha uma das opções de verificação!"
          if(escolha === "incertezasHipoteses"){
            respostaAi = await verficarIncertezasiaAI(extractedText);    
          }else if(escolha === "dadosAnomalos"){
            respostaAi = await verificarDadosAi(extractedText);    
          }else if(escolha === "aprimoramentoTexto"){
            respostaAi = await verficarOrtografiaAI(extractedText);   
          } 
                
          resposta = respostaAi; 
          setOverlayState(false);
          
        } catch (error) {
            setOverlayState(false);
            resposta = "erro " + error; 
        }
      }

    return (
        <div
            ref={overlayRef}
            className="fixed mt-10 top-auto left-1/2 transform -translate-x-1/2 bg-[#1c1c5e] text-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] h-auto shadow-lg overflow-y-auto"
        >
            <button
          onClick={() => setOverlayState(false)}
          className="absolute top-2 right-2 text-xl text-white-300 hover:text-white-900 font-bold transition-colors duration-300"
        >
          <i className="fa-solid fa-x"></i>
        </button>
            <h2 className="text-3xl text-white font-bold mb-6">Filtro</h2>

           
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Foco da verificação</h3>
                <div className="flex justify-between">
                    <button
                        className={`w-full p-3 rounded-lg mx-1 ${focoVerificacao === 'dadosAnomalos' ? 'bg-[#33337f]' : 'bg-[#1c1c5e]'} hover:bg-[#2e2e7b] shadow-xl hover:shadow-lg`}
                        onClick={() => handleFocoClick('dadosAnomalos')}
                    >
                        <i className="fa-solid fa-chart-line"></i> <br />
                        Dados Anômalos
                    </button>

                    <button
                        className={`w-full p-3 rounded-lg mx-1 ${focoVerificacao === 'aprimoramentoTexto' ? 'bg-[#33337f]' : 'bg-[#1c1c5e]'} hover:bg-[#2e2e7b] shadow-xl hover:shadow-lg`}
                        onClick={() => handleFocoClick('aprimoramentoTexto')}
                    >
                        <i className="fa-solid fa-graduation-cap"></i> <br />
                        Aprimoramento do Texto
                    </button>

                    <button
                        className={`w-full p-3 rounded-lg mx-1 ${focoVerificacao === 'incertezasHipoteses' ? 'bg-[#33337f]' : 'bg-[#1c1c5e]'} hover:bg-[#2e2e7b] shadow-xl hover:shadow-lg`}
                        onClick={() => handleFocoClick('incertezasHipoteses')}
                    >
                        <i className="fa-solid fa-flask"></i><br />
                        Incertezas e Hipóteses
                    </button>
                </div>
            </div>

            
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Detalhes da verificação</h3>
                <div className="flex justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="detalhamentoErros"
                            checked={detalhesVerificacao.detalhamentoErros}
                            onChange={handleDetalhesChange}
                            className="appearance-none mr-2  h-5 w-5 rounded border-2 border-white bg-[#1c1c5e] checked:bg-[#3b3b8c] cursor-pointer transition-colors"
                        />
                        Detalhamento de erros
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="linguagemPersonalizada"
                            checked={detalhesVerificacao.linguagemPersonalizada}
                            onChange={handleDetalhesChange}
                            className="appearance-none mr-2  h-5 w-5 rounded border-2 border-white bg-[#1c1c5e] checked:bg-[#3b3b8c] cursor-pointer transition-colors"
                        />
                        Linguagem personalizada
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="verificacaoMixada"
                            checked={detalhesVerificacao.verificacaoMixada}
                            onChange={handleDetalhesChange}
                            className="appearance-none mr-2  h-5 w-5 rounded border-2 border-white bg-[#1c1c5e] checked:bg-[#3b3b8c] cursor-pointer transition-colors"
                        />
                        Verificação Mixada
                    </label>
                </div>
            </div>

            
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Verificação mixada</h3>
                <div className="flex justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="dadosAnomalos"
                            checked={verificacaoMixada.dadosAnomalos}
                            onChange={handleMixadaChange}
                            className="appearance-none mr-2  h-5 w-5 rounded border-2 border-white bg-[#1c1c5e] checked:bg-[#3b3b8c] cursor-pointer transition-colors"
                        />
                        Dados anômalos
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="aprimoramentoTexto"
                            checked={verificacaoMixada.aprimoramentoTexto}
                            onChange={handleMixadaChange}
                            className="appearance-none mr-2  h-5 w-5 rounded border-2 border-white bg-[#1c1c5e] checked:bg-[#3b3b8c] cursor-pointer transition-colors"
                        />
                        Aprimoramento do texto
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="incertezasHipoteses"
                            checked={verificacaoMixada.incertezasHipoteses}
                            onChange={handleMixadaChange}
                            className="appearance-none mr-2  h-5 w-5 rounded border-2 border-white bg-[#1c1c5e] checked:bg-[#3b3b8c] cursor-pointer transition-colors"
  
                        />
                        Incertezas e hipóteses
                    </label>
                </div>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    className="  w-full bg-[#1c1c5e] hover:bg-[#2e2e7b] text-white font-semibold p-3 rounded-lg shadow-xl hover:shadow-lg"
                    onClick={callAi}
                >
                    Verificar
                </button>
            </div>
        </div>
    );
};

export function getResposta(){
    return resposta;
}

function setEscolha(str){
    escolha = str;
}


