'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import { saveText } from '@/features/tempFiles/textUtils';

export default function Overlay({ setOverlayState }) {
  const [pdfInfo, setPdfInfo] = useState("Arraste seu PDF aqui");
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  const overlayRef = useRef(null);

  
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

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      extractTextFromPDF(file);
      setError(null); 
    } else {
      setError('Por favor, envie um arquivo PDF válido.');
      setPdfInfo("Arraste seu PDF aqui");
    }
  };

  const extractTextFromPDF = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const pdfData = new Uint8Array(reader.result);

      pdfjsLib.getDocument(pdfData).promise.then((pdf) => {
        pdf.getMetadata().then((metadata) => {
          setPdfInfo(metadata.info.Title || "Título não encontrado");
        });

        let textContent = '';  
        let pagesProcessed = 0;
        const numPages = pdf.numPages;

        const extractPageText = (pageNum) => {
          pdf.getPage(pageNum).then((page) => {
            page.getTextContent().then((text) => {
              textContent += text.items.map(item => item.str).join(' ') + '\n';
              pagesProcessed++;

              if (pagesProcessed === numPages) {
                setText(textContent);  
                saveText(textContent); 
              }
            });
          });
        };

        for (let i = 1; i <= numPages; i++) {
          extractPageText(i);
        }
      }).catch((err) => {
        setError('Erro ao processar o PDF: ' + err.message);
        setText('');
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf',
  });

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-200 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      
      <div
        ref={overlayRef}  
        className="w-80 h-80 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-between relative"
      >
        <button
          onClick={() => setOverlayState(false)} 
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900"
        >
          X
        </button>

        <h1 className="text-2xl font-semibold mb-4">Arraste o PDF :P</h1>

        <div
          {...getRootProps()}
          className="w-full h-40 border-2 border-dashed border-gray-400 bg-gray-50 text-gray-600 flex justify-center items-center rounded-md mb-4 hover:bg-gray-200 transition-colors"
        >
          <input {...getInputProps()} />
          <span>{pdfInfo}</span>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {text && (
          <div className="flex flex-col items-center">
            <p className="mb-4">{pdfInfo}</p>
            <button
              onClick={() => window.location.href = './verificar'}
              className="inline-block px-6 py-2 border-2 border-black text-black font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Verificar texto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
