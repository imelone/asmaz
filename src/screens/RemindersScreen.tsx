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

const ReminderCard = styled.div`
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

interface Reminder {
  id: string;
  type: 'medical' | 'act' | 'aerosol';
  title: string;
  date: string;
  time?: string;
  notes?: string;
}

const RemindersScreen: React.FC = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState({
    type: 'medical' as 'medical' | 'act' | 'aerosol',
    title: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    // Load saved reminders
    const savedReminders = localStorage.getItem('reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.date) {
      alert('Por favor, complete el título y la fecha');
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      type: newReminder.type,
      title: newReminder.title,
      date: newReminder.date,
      time: newReminder.time,
      notes: newReminder.notes
    };

    const updatedReminders = [...reminders, reminder];
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));

    // Reset form
    setNewReminder({
      type: 'medical',
      title: '',
      date: '',
      time: '',
      notes: ''
    });

    alert('Recordatorio agregado correctamente');
  };

  const handleDeleteReminder = (id: string) => {
    const updatedReminders = reminders.filter(r => r.id !== id);
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'medical': return '🩺';
      case 'act': return '📋';
      case 'aerosol': return '💊';
      default: return '⏰';
    }
  };

  const getReminderTypeLabel = (type: string) => {
    switch (type) {
      case 'medical': return 'Turno Médico';
      case 'act': return 'Test de Control del Asma';
      case 'aerosol': return 'Cambio de Aerosol';
      default: return 'Recordatorio';
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
          <Title>Recordatorios</Title>

          <ReminderCard>
            <CardTitle>➕ Agregar Nuevo Recordatorio</CardTitle>
            <FormGroup>
              <Label>Tipo de Recordatorio</Label>
              <Select 
                value={newReminder.type} 
                onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value as 'medical' | 'act' | 'aerosol' })}
              >
                <option value="medical">🩺 Turno Médico</option>
                <option value="act">📋 Test de Control del Asma (Mensual)</option>
                <option value="aerosol">💊 Cambio de Aerosol</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Título</Label>
              <Input 
                type="text" 
                value={newReminder.title}
                onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                placeholder="Ej: Consulta con neumólogo"
              />
            </FormGroup>

            <FormGroup>
              <Label>Fecha</Label>
              <Input 
                type="date" 
                value={newReminder.date}
                onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label>Hora (opcional)</Label>
              <Input 
                type="time" 
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label>Notas (opcional)</Label>
              <Input 
                type="text" 
                value={newReminder.notes}
                onChange={(e) => setNewReminder({ ...newReminder, notes: e.target.value })}
                placeholder="Información adicional"
              />
            </FormGroup>

            <Button onClick={handleAddReminder}>
              Agregar Recordatorio
            </Button>
          </ReminderCard>

          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>
            Mis Recordarios ({reminders.length})
          </h3>

          {reminders.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
              No tienes recordatorios configurados
            </p>
          ) : (
            reminders.map((reminder) => (
              <ReminderCard key={reminder.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <CardTitle>
                      {getReminderIcon(reminder.type)} {reminder.title}
                    </CardTitle>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>Tipo:</strong> {getReminderTypeLabel(reminder.type)}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>Fecha:</strong> {new Date(reminder.date).toLocaleDateString('es-AR')}
                      {reminder.time && ` a las ${reminder.time}`}
                    </p>
                    {reminder.notes && (
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        <strong>Notas:</strong> {reminder.notes}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteReminder(reminder.id)}
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </ReminderCard>
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

export default RemindersScreen;
