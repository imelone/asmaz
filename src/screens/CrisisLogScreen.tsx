import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { Container, Title, Card, FormGroup, Label, Input, Select, Button } from '../components/ui';

const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
    <div className="bg-white min-h-screen py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-2">
          <img src={logo} alt="AsmaZ Logo" style={{ width: '120px', height: 'auto' }} />
        </div>
        <h2 className="text-xl text-center text-gray-600 mb-8">Controla tu asma</h2>
        
        <Container>
          <Title>Registro de Crisis y Eventos</Title>

          <Card>
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
          </Card>

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
              <Card key={event.id}>
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
              </Card>
            ))
          )}

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

export default CrisisLogScreen;
