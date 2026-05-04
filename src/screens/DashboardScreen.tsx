import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { Container } from '../components/ui';

const UserInfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;
`;

const UserInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const UserInfoIcon = styled.span`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
`;

const UserInfoLabel = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
`;

const UserInfoValue = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  gap: 1rem;
`;

const SquareButton = styled.button`
  background-color: white;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1 / 1;

  &:hover {
    border-color: #3b82f6;
    background-color: #eff6ff;
    transform: translateY(-2px);

  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonIcon = styled.span`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const ButtonLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  text-align: center;
  overflow-wrap: break-word;
  max-width: 100%;
`;

interface UserData {
  email: string;
  dateOfBirth: string;
  age: number;
}

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/registration');
  };

  return (
    <div className="bg-white min-h-screen py-4">
      <div className="w-full mx-auto">
        <div className="flex justify-center mb-1">
          <img src={logo} alt="AsmaZ Logo" style={{ width: '120px', height: 'auto' }} />
        </div>
        <h2 className="text-xl text-center text-gray-600 mb-2">Controla tu asma</h2>
        
        <Container>
          <UserInfoBar style={{ flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <UserInfoItem>
                <UserInfoIcon>✉️</UserInfoIcon>
                <UserInfoLabel>Email</UserInfoLabel>
                <UserInfoValue>{userData?.email || 'No disponible'}</UserInfoValue>
              </UserInfoItem>
              <UserInfoItem>
                <UserInfoIcon>🎂</UserInfoIcon>
                <UserInfoLabel>Edad</UserInfoLabel>
                <UserInfoValue>{userData?.age ? `${userData.age} años` : 'No disponible'}</UserInfoValue>
              </UserInfoItem>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 1.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#ef4444',
                  fontWeight: 500
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </UserInfoBar>

          {showLogoutConfirm && (
            <div style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                maxWidth: '320px',
                width: '90%',
                textAlign: 'center'
              }}>
                <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
                  ¿Está seguro que desea cerrar sesión?
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e7eb',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: '#ef4444',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          )}

          <Grid>
            <SquareButton onClick={() => handleNavigate('/act')}>
              <ButtonIcon>🏥</ButtonIcon>
              <ButtonLabel>Test de Control del Asma</ButtonLabel>
            </SquareButton>

            <SquareButton onClick={() => handleNavigate('/doses')}>
              <ButtonIcon>💊</ButtonIcon>
              <ButtonLabel>Control de Dosis</ButtonLabel>
            </SquareButton>

            <SquareButton onClick={() => handleNavigate('/reminders')}>
              <ButtonIcon>⏰</ButtonIcon>
              <ButtonLabel>Recordatorios</ButtonLabel>
            </SquareButton>

            <SquareButton onClick={() => handleNavigate('/crisis')}>
              <ButtonIcon>📋</ButtonIcon>
              <ButtonLabel>Registro de Crisis</ButtonLabel>
            </SquareButton>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default DashboardScreen;
