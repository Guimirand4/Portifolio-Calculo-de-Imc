// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Estilos globais, se necessário
import App from './App'; // O seu componente principal

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
