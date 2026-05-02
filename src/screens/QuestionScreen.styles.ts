import styled from 'styled-components';

interface ButtonProps {
  isSelected: boolean;
  colorVariant: 'green' | 'blue' | 'yellow' | 'purple' | 'red';
}

const colorMap = {
  green: {
    bg: '#f0fdf4',
    border: '#bbf7d0',
    hoverBg: '#dcfce7',
    hoverBorder: '#86efac',
    text: '#166534',
    selectedBg: '#bbf7d0',
    selectedBorder: '#4ade80',
    selectedText: '#166534'
  },
  blue: {
    bg: '#eff6ff',
    border: '#bfdbfe',
    hoverBg: '#dbeafe',
    hoverBorder: '#93c5fd',
    text: '#1e40af',
    selectedBg: '#bfdbfe',
    selectedBorder: '#60a5fa',
    selectedText: '#1e40af'
  },
  yellow: {
    bg: '#fffbeb',
    border: '#fef08a',
    hoverBg: '#fef9c3',
    hoverBorder: '#fde047',
    text: '#854d0e',
    selectedBg: '#fef08a',
    selectedBorder: '#facc15',
    selectedText: '#854d0e'
  },
  purple: {
    bg: '#f5f3ff',
    border: '#ddd6fe',
    hoverBg: '#ede9fe',
    hoverBorder: '#c4b5fd',
    text: '#5b21b6',
    selectedBg: '#ddd6fe',
    selectedBorder: '#a78bfa',
    selectedText: '#5b21b6'
  },
  red: {
    bg: '#fef2f2',
    border: '#fecaca',
    hoverBg: '#fee2e2',
    hoverBorder: '#fca5a5',
    text: '#991b1b',
    selectedBg: '#fecaca',
    selectedBorder: '#f87171',
    selectedText: '#991b1b'
  }
};

export const OptionsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

export const OptionButton = styled.button<ButtonProps>`
  flex: 1;
  min-width: 120px;
  text-align: center;
  padding: 0.75rem 0.5rem;
  border: 2px solid ${props => colorMap[props.colorVariant].border};
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  background-color: ${props => colorMap[props.colorVariant].bg};
  color: ${props => colorMap[props.colorVariant].text};
  
  &:hover {
    background-color: ${props => colorMap[props.colorVariant].hoverBg};
    border-color: ${props => colorMap[props.colorVariant].hoverBorder};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  ${props => props.isSelected && `
    background-color: ${colorMap[props.colorVariant].selectedBg};
    border-color: ${colorMap[props.colorVariant].selectedBorder};
    color: ${colorMap[props.colorVariant].selectedText};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  `}

  @media (max-width: 640px) {
    min-width: calc(50% - 0.5rem);
  }

  @media (max-width: 400px) {
    min-width: 100%;
  }
`;

export const ButtonContent = styled.div`
  padding: 0 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
`;
