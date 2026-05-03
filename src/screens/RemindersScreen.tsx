import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { Container, Title, Card, FormGroup, Label, Input, Select, Button, BackButton } from '../components/ui';

const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
    <div className="bg-white min-h-screen py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-2">
          <img src={logo} alt="AsmaZ Logo" style={{ width: '120px', height: 'auto' }} />
        </div>
        <h2 className="text-xl text-center text-gray-600 mb-8">Controla tu asma</h2>
        
        <Container>
          <Title>Recordatorios</Title>

          <Card>
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
          </Card>

          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>
            Mis Recordarios ({reminders.length})
          </h3>

          {reminders.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
              No tienes recordatorios configurados
            </p>
          ) : (
            reminders.map((reminder) => (
              <Card key={reminder.id}>
                <CardTitle style={{ justifyContent: 'center' }}>
                  {getReminderIcon(reminder.type)} {reminder.title}
                </CardTitle>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, textAlign: 'left' }}>
                  <strong>Tipo:</strong> {getReminderTypeLabel(reminder.type)}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, textAlign: 'left' }}>
                  <strong>Fecha:</strong> {new Date(reminder.date).toLocaleDateString('es-AR')}
                  {reminder.time && ` a las ${reminder.time}`}
                </p>
                {reminder.notes && (
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, textAlign: 'left' }}>
                    <strong>Notas:</strong> {reminder.notes}
                  </p>
                )}
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
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
              </Card>
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
