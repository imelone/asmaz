import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const Container = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 2rem auto;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #1f2937;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: white;
  box-sizing: border-box;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: white;
  box-sizing: border-box;
  color: #374151;
  cursor: pointer;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
    filter: invert(0.4);
    transition: opacity 0.2s;
  }

  &::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Button = styled.button`
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
  margin-top: 1rem;

  &:hover {
    background-color: #2563eb;
  }
`;

const BackButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: #6b7280;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;

  &:hover {
    background-color: #4b5563;
  }
`;

const DoseTrackingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [puffsPerDay, setPuffsPerDay] = useState('');
  const [aerosolDoses, setAerosolDoses] = useState('');
  const [aerosolStartDate, setAerosolStartDate] = useState('');

  // Auto-calculate remaining doses based on start date, capacity and daily usage
  const calculateRemainingDoses = (): number => {
    if (!aerosolStartDate || !aerosolDoses || !puffsPerDay) {
      return parseInt(aerosolDoses) || 0;
    }
    const start = new Date(aerosolStartDate);
    const today = new Date();
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    const totalCapacity = parseInt(aerosolDoses) || 0;
    const dailyPuffs = parseInt(puffsPerDay) || 0;
    const usedDoses = diffDays * dailyPuffs;
    return Math.max(0, totalCapacity - usedDoses);
  };

  const remainingDoses = calculateRemainingDoses();

  useEffect(() => {
    // Load saved dose data
    const savedData = localStorage.getItem('doseData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setPuffsPerDay(data.puffsPerDay || '');
      setAerosolDoses(data.aerosolDoses || '');
      setAerosolStartDate(data.aerosolStartDate || '');
    }
  }, []);

  const handleSave = () => {
    const doseData = {
      puffsPerDay,
      aerosolDoses,
      aerosolStartDate,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('doseData', JSON.stringify(doseData));
    alert('Datos de dosis guardados correctamente');
  };

  return (
    <div className="bg-white min-h-screen py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-2">
          <img src={logo} alt="AsmaZ Logo" style={{ width: '120px', height: 'auto' }} />
        </div>
        <h2 className="text-xl text-center text-gray-600 mb-8">Controla tu asma</h2>
        
        <Container>
          <Title>Control de Dosis</Title>
          
          <Section>
            <SectionTitle>Dosis por día</SectionTitle>
            <FormGroup>
              <Label>Puffs por día</Label>
              <Select value={puffsPerDay} onChange={(e) => setPuffsPerDay(e.target.value)}>
                <option value="">Seleccionar...</option>
                <option value="1">1 puff por día</option>
                <option value="2">2 puffs por día</option>
                <option value="3">3 puffs por día</option>
                <option value="4">4 puffs por día</option>
                <option value="5">5 puffs por día</option>
                <option value="6">6 puffs por día</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Capacidad total del aerosol</Label>
              <Select value={aerosolDoses} onChange={(e) => setAerosolDoses(e.target.value)}>
                <option value="">Seleccionar...</option>
                <option value="60">60 dosis</option>
                <option value="100">100 dosis</option>
                <option value="120">120 dosis</option>
                <option value="150">150 dosis</option>
                <option value="200">200 dosis</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Fecha de inicio del aerosol</Label>
              <Input
                type="date"
                value={aerosolStartDate}
                onChange={(e) => setAerosolStartDate(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Dosis restantes (calculado automáticamente)</Label>
              <div style={{ 
                padding: '0.75rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.375rem', 
                fontSize: '1rem',
                backgroundColor: '#f9fafb',
                textAlign: 'center',
                fontWeight: 500
              }}>
                {remainingDoses} / {aerosolDoses || '0'} dosis
              </div>
            </FormGroup>

            {aerosolDoses && (
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '0.375rem' }}>
                <strong>Progreso:</strong> {remainingDoses} / {aerosolDoses} dosis restantes
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  backgroundColor: '#e5e7eb', 
                  borderRadius: '4px', 
                  marginTop: '0.5rem' 
                }}>
                  <div style={{ 
                    width: `${(remainingDoses / parseInt(aerosolDoses)) * 100}%`, 
                    height: '100%', 
                    backgroundColor: '#10b981', 
                    borderRadius: '4px' 
                  }} />
                </div>
              </div>
            )}
          </Section>

          <Button onClick={handleSave}>
            Guardar Datos
          </Button>

          <BackButton onClick={() => navigate('/dashboard')}>
            Volver al Dashboard
          </BackButton>
        </Container>
      </div>
    </div>
  );
};

export default DoseTrackingScreen;
