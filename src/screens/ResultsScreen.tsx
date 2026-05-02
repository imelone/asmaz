import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const ScoreScale = styled.div`
  position: relative;
  height: 12px;
  background: linear-gradient(to right, #10b981, #f59e0b, #ef4444);
  border-radius: 6px;
  margin: 2.5rem 0 0.5rem 0;
  overflow: visible;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ScoreMarker = styled.div<{ position: number }>`
  position: absolute;
  top: -30px;
  left: ${props => props.position}%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  z-index: 20;
  
  &::before {
    content: '${props => Math.round(props.position * 12 / 100)}';
    font-weight: bold;
    color: #1f2937;
    background: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.75rem;
    margin-top: 4px;
    white-space: nowrap;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  &::after {
    content: '▼';
    color: #3b82f6;
    font-size: 1.25rem;
    line-height: 1;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const ScoreLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

const ScoreText = styled.div`
  font-size: 1.25rem;
  text-align: center;
  margin: 1.5rem 0;
  font-weight: 500;
`;

const RestartButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 2rem;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const ResultsScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, maxScore = 25 } = (location.state as { score: number; maxScore: number }) || {};
  
  // Calculate percentage, ensuring it's between 0 and 100
  const percentage = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));
  
  const getResultMessage = () => {
    if (score >= 20) return 'BUEN CONTROL - ¡Excelente! Tu asma está bien controlada.';
    if (score >= 16) return 'PARCIALMENTE CONTROLADO - Considera revisar tu plan de acción para el asma.';
    return 'MAL CONTROLADO - Es recomendable que consultes a tu médico lo antes posible.';
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Resultados</h1>
        <h2 className="text-xl text-center text-gray-600 mb-8">Control de Asma</h2>
        
        <ResultsContainer>
          <h3 className="text-xl font-semibold mb-4">Tu puntuación: {score} de {maxScore} puntos</h3>
          
          <ScoreText>{getResultMessage()}</ScoreText>
          
          <div className="mb-2">
            <strong>Nivel de control del asma:</strong>
          </div>
          
          <div className="relative">
            <ScoreScale>
              <ScoreMarker position={percentage} />
            </ScoreScale>
           
          </div>
          
          <ScoreLabels>
            <span>Bien controlado</span>
            <span>Parcialmente controlado</span>
            <span>Poco controlado</span>
          </ScoreLabels>
          
          <RestartButton onClick={() => navigate('/dashboard')}>
            Volver al inicio
          </RestartButton>
        </ResultsContainer>
      </div>
    </div>
  );
};

export default ResultsScreen;
