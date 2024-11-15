'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import { saveText } from '@/features/tempFiles/textUtils'; // Importando a função para salvar o texto

export default function App() {
  const [pdfInfo, setPdfInfo] = useState("Arraste seu PDF aqui");
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

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
          setPdfInfo(metadata.info.Title || "Título não encontrado ou PDF inválido");
        });

        let textContent = '';  // Variável que vai armazenar o texto extraído
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
    <div>
      <h1>Arraste o PDF :P</h1>

      <div
        {...getRootProps()}
        style={{
          width: '300px',
          height: '200px',
          border: '2px dashed #aaa',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#aaa',
          backgroundColor: '#f8f8f8',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <input {...getInputProps()} />
        <span>{pdfInfo}</span>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {text && (
        <div>
          <p>{pdfInfo}</p>
          <button
            onClick={() => window.location.href = './verificar'}
            className="inline-block px-6 py-2 border-2 border-black text-black font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Verificar texto
          </button>
        </div>
      )}
    </div>
  );
}
