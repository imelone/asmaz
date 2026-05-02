import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 2rem auto;
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
  const [currentDoses, setCurrentDoses] = useState<number>(0);

  useEffect(() => {
    // Load saved dose data
    const savedData = localStorage.getItem('doseData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setPuffsPerDay(data.puffsPerDay || '');
      setAerosolDoses(data.aerosolDoses || '');
      setCurrentDoses(data.currentDoses || 0);
    }
  }, []);

  const handleSave = () => {
    const doseData = {
      puffsPerDay,
      aerosolDoses,
      currentDoses,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('doseData', JSON.stringify(doseData));
    alert('Datos de dosis guardados correctamente');
  };

  const handleDecreaseDose = () => {
    if (currentDoses > 0) {
      setCurrentDoses(currentDoses - 1);
    }
  };

  const handleIncreaseDose = () => {
    const maxDoses = parseInt(aerosolDoses) || 120;
    if (currentDoses < maxDoses) {
      setCurrentDoses(currentDoses + 1);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">AsmaZ</h1>
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
          </Section>

          <Section>
            <SectionTitle>Dosis de aerosol</SectionTitle>
            <FormGroup>
              <Label>Capacidad total del aerosol</Label>
              <Select value={aerosolDoses} onChange={(e) => setAerosolDoses(e.target.value)}>
                <option value="">Seleccionar...</option>
                <option value="60">60 dosis</option>
                <option value="120">120 dosis</option>
                <option value="200">200 dosis</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Dosis restantes</Label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Button onClick={handleDecreaseDose} style={{ marginTop: 0, width: 'auto' }}>-</Button>
                <Input 
                  type="number" 
                  value={currentDoses} 
                  onChange={(e) => setCurrentDoses(parseInt(e.target.value) || 0)}
                  style={{ textAlign: 'center' }}
                />
                <Button onClick={handleIncreaseDose} style={{ marginTop: 0, width: 'auto' }}>+</Button>
              </div>
            </FormGroup>

            {aerosolDoses && (
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '0.375rem' }}>
                <strong>Progreso:</strong> {currentDoses} / {aerosolDoses} dosis restantes
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  backgroundColor: '#e5e7eb', 
                  borderRadius: '4px', 
                  marginTop: '0.5rem' 
                }}>
                  <div style={{ 
                    width: `${(currentDoses / parseInt(aerosolDoses)) * 100}%`, 
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
