import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button } from '../components/ui';


const ScoreScale = styled.div`
  position: relative;
  height: 12px;
  background: linear-gradient(to right,
    #ef4444 0%, #ef4444 60%,
    #f59e0b 60%, #f59e0b 80%,
    #10b981 80%, #10b981 100%
  );
  border-radius: 6px;
  margin: 2.5rem 0 0.5rem 0;
  overflow: visible;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ZoneLine = styled.div<{ position: number }>`
  position: absolute;
  top: -3px;
  left: ${props => props.position}%;
  width: 2px;
  height: 18px;
  background: white;
  transform: translateX(-50%);
  z-index: 10;
  box-shadow: 0 0 2px rgba(0,0,0,0.2);
`;

const ScoreMarker = styled.div<{ position: number; score: number }>`
  position: absolute;
  top: -32px;
  left: ${props => props.position}%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  z-index: 20;

  &::before {
    content: "${props => props.score}";
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
    color: #1f2937;
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

const ResultsScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, maxScore = 25 } = (location.state as { score: number; maxScore: number }) || {};
  
  // Calculate percentage, ensuring it's between 0 and 100
  const percentage = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));
  
  const getResultMessage = () => {
    if (score >= 20) return 'BIEN CONTROLADA - ¡Excelente! Tu asma está bien controlada.';
    if (score >= 16) return 'PARCIALMENTE CONTROLADA - Considera revisar tu plan de acción para el asma.';
    return 'MAL CONTROLADA - Es recomendable que consultes a tu médico lo antes posible.';
  };

  return (
    <div className="bg-white min-h-screen py-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Test de Control del Asma</h1>
        <h2 className="text-xl text-center text-gray-600 mb-8">Resultado Final</h2>
        
        <Container>
          <h3 className="text-xl font-semibold mb-4">Tu puntuación: {score} de {maxScore} puntos</h3>
          
          <ScoreText>{getResultMessage()}</ScoreText>
          
          <div className="mb-2">
            <strong>Nivel de control del asma:</strong>
          </div>
          
          <div className="relative">
            <ScoreScale>
              <ZoneLine position={60} />
              <ZoneLine position={80} />
              <ScoreMarker position={percentage} score={score} />
            </ScoreScale>
          </div>
          
          <ScoreLabels>
            <span>Mal controlada</span>
            <span>Parcialmente controlada</span>
            <span>Bien controlada</span>
          </ScoreLabels>
          
          <Button onClick={() => navigate('/dashboard')}>
            Volver al inicio
          </Button>

        </Container>

        <button
          onClick={() => navigate('/dashboard')}
          style={{
            position: 'fixed',
            top: '1rem',
            left: '1rem',
            cursor: 'pointer',
            fontSize: '2.25rem',
            color: '#6b7280',
            zIndex: 50,
            padding: '0.5rem',
            background: 'none',
            border: 'none',
            lineHeight: 1
          }}
          aria-label="Volver"
        >
          ‹
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
