import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [dadosLocalStorage, setDadosLocalStorage] = useState([]);

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem('historicoIMC')) || [];
    setDadosLocalStorage(dadosSalvos);
  }, []);

  const calcularImc = (e) => {
    e.preventDefault();
    const imc = (peso / (altura * altura)).toFixed(2);
    const categoria = obterCategoria(imc);
    const novoDado = { peso, altura, imc, categoria };
    const novosDados = [novoDado, ...dadosLocalStorage];

    setDadosLocalStorage(novosDados);
    localStorage.setItem('historicoIMC', JSON.stringify(novosDados));

    setPeso('');
    setAltura('');
  };

  const obterCategoria = (imc) => {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 24.9) return 'Peso normal';
    if (imc < 29.9) return 'Sobrepeso';
    return 'Obesidade';
  };

  const excluirItem = (index) => {
    const novosDados = dadosLocalStorage.filter((_, i) => i !== index);
    setDadosLocalStorage(novosDados);
    localStorage.setItem('historicoIMC', JSON.stringify(novosDados));
  };

  return (
    <div className="container">
      <h1>Calculadora de IMC</h1>
      <form onSubmit={calcularImc}>
        <label>Peso (kg):</label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          required
        />
        <label>Altura (m):</label>
        <input
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          step="0.01"
          required
        />
        <button type="submit">Calcular IMC</button>
      </form>

      {dadosLocalStorage.length > 0 && (
        <div id="resultado">
          <h3>Histórico de Cálculos:</h3>
          {dadosLocalStorage.map((item, index) => (
            <div key={index} className="resultado-item">
              <div>
                <p>
                  <strong>Peso:</strong> {item.peso} kg
                </p>
                <p>
                  <strong>Altura:</strong> {item.altura} m
                </p>
                <p>
                  <strong>IMC:</strong> {item.imc}
                </p>
                <p>
                  <strong>Categoria:</strong> {item.categoria}
                </p>
              </div>
              <button
                onClick={() => excluirItem(index)}
                className="excluir-botao"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
