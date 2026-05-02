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
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #1f2937;
`;

const LogCard = styled.div`
  padding: 1.5rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: white;
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
  margin-top: 0.5rem;

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
  margin-top: 1rem;

  &:hover {
    background-color: #4b5563;
  }
`;

const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #dc2626;
  }
`;

interface CrisisEvent {
  id: string;
  type: 'salbutamol' | 'hospitalization';
  date: string;
  days?: number;
  notes?: string;
}

const CrisisLogScreen: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<CrisisEvent[]>([]);
  const [newEvent, setNewEvent] = useState({
    type: 'salbutamol' as 'salbutamol' | 'hospitalization',
    date: '',
    days: '',
    notes: ''
  });

  useEffect(() => {
    // Load saved crisis events
    const savedEvents = localStorage.getItem('crisisEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const handleAddEvent = () => {
    if (!newEvent.date) {
      alert('Por favor, complete la fecha');
      return;
    }

    const event: CrisisEvent = {
      id: Date.now().toString(),
      type: newEvent.type,
      date: newEvent.date,
      days: newEvent.days ? parseInt(newEvent.days) : undefined,
      notes: newEvent.notes
    };

    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    localStorage.setItem('crisisEvents', JSON.stringify(updatedEvents));

    // Reset form
    setNewEvent({
      type: 'salbutamol',
      date: '',
      days: '',
      notes: ''
    });

    alert('Evento registrado correctamente');
  };

  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter(e => e.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('crisisEvents', JSON.stringify(updatedEvents));
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'salbutamol': return '💊';
      case 'hospitalization': return '🏥';
      default: return '📋';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'salbutamol': return 'Uso de Salbutamol';
      case 'hospitalization': return 'Internación';
      default: return 'Evento';
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-2">
          <img src={logo} alt="AsmaZ Logo" style={{ width: '120px', height: 'auto' }} />
        </div>
        <h2 className="text-xl text-center text-gray-600 mb-8">Controla tu asma</h2>
        
        <Container>
          <Title>Registro de Crisis y Eventos</Title>

          <LogCard>
            <CardTitle>➕ Registrar Nuevo Evento</CardTitle>
            <FormGroup>
              <Label>Tipo de Evento</Label>
              <Select 
                value={newEvent.type} 
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as 'salbutamol' | 'hospitalization' })}
              >
                <option value="salbutamol">💊 Uso de Salbutamol</option>
                <option value="hospitalization">🏥 Internación</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Fecha</Label>
              <Input 
                type="date" 
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </FormGroup>

            {newEvent.type === 'hospitalization' && (
              <FormGroup>
                <Label>Días de internación</Label>
                <Input 
                  type="number" 
                  value={newEvent.days}
                  onChange={(e) => setNewEvent({ ...newEvent, days: e.target.value })}
                  placeholder="Número de días"
                  min="1"
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label>Notas adicionales (opcional)</Label>
              <Input 
                type="text" 
                value={newEvent.notes}
                onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                placeholder="Detalles adicionales sobre el evento"
              />
            </FormGroup>

            <Button onClick={handleAddEvent}>
              Registrar Evento
            </Button>
          </LogCard>

          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>
            Historial de Eventos ({events.length})
          </h3>

          {events.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
              No hay eventos registrados
            </p>
          ) : (
            events
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((event) => (
              <LogCard key={event.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <CardTitle>
                      {getEventIcon(event.type)} {getEventTypeLabel(event.type)}
                    </CardTitle>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>Fecha:</strong> {new Date(event.date).toLocaleDateString('es-AR')}
                    </p>
                    {event.days && (
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        <strong>Duración:</strong> {event.days} día(s)
                      </p>
                    )}
                    {event.notes && (
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        <strong>Notas:</strong> {event.notes}
                      </p>
                    )}
                  </div>
                  <DeleteButton onClick={() => handleDeleteEvent(event.id)}>
                    Eliminar
                  </DeleteButton>
                </div>
              </LogCard>
            ))
          )}

          <BackButton onClick={() => navigate('/dashboard')}>
            Volver al Dashboard
          </BackButton>
        </Container>
      </div>
    </div>
  );
};

export default CrisisLogScreen;
