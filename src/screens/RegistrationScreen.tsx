import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { Container, Title, FormGroup, Label, Button, ErrorMessage } from '../components/ui';

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  text-align: left;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

interface UserData {
  email: string;
  dateOfBirth: string;
  age: number;
}

const RegistrationScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !dateOfBirth) {
      setError('Por favor, complete todos los campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingrese un email válido');
      return;
    }

    const age = calculateAge(dateOfBirth);
    if (age < 0 || age > 120) {
      setError('Por favor, ingrese una fecha de nacimiento válida');
      return;
    }

    // Store user data in localStorage
    const userData: UserData = {
      email,
      dateOfBirth,
      age
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white py-2 px-0 flex items-center justify-center">
      <div className="w-full">
        <div className="flex justify-center mb-2">
          <img src={logo} alt="AsmaZ Logo" style={{ width: '120px', height: 'auto' }} />
        </div>
        <h2 className="text-xl text-center text-gray-600 mb-8">Controla tu asma</h2>
        
        <Container>
          <Title>Registro</Title>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Fecha de Nacimiento</Label>
              <Input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button type="submit">
              Registrarse
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default RegistrationScreen;
