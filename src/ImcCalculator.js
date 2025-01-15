import React, { useState } from 'react';

function ImcCalculator() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');
  const [categoria, setCategoria] = useState('');

  const calcularImc = (e) => {
    e.preventDefault();
    const imc = peso / (altura * altura);
    setResultado(imc.toFixed(2));

    if (imc < 18.5) {
      setCategoria('Abaixo do peso');
    } else if (imc >= 18.5 && imc < 24.9) {
      setCategoria('Peso normal');
    } else if (imc >= 25 && imc < 29.9) {
      setCategoria('Sobrepeso');
    } else {
      setCategoria('Obesidade');
    }
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

      {resultado && (
        <div id="resultado">
          <p>IMC: {resultado}</p>
          <p>Categoria: {categoria}</p>
        </div>
      )}
    </div>
  );
}

export default ImcCalculator;
