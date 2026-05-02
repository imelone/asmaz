import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 2rem auto;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #1f2937;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
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
  transition: border-color 0.2s;

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

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
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
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">AsmaZ</h1>
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
