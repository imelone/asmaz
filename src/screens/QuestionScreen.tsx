import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Container, Button } from '../components/ui';
import { OptionButton, ButtonContent, OptionsContainer } from './QuestionScreen.styles';

type ColorVariant = 'green' | 'blue' | 'yellow' | 'purple' | 'red';


interface QuestionScreenProps {
  questionNumber: number;
}

const questions = [
  {
    question: "Durante las últimas 4 semanas, ¿con qué frecuencia su asma le impidió realizar sus tareas habituales en el trabajo, los estudios o el hogar?",
    options: [
      { text: "Siempre", color: 'red' as ColorVariant, points: 1 },
      { text: "Casi siempre", color: 'purple' as ColorVariant, points: 2 },
      { text: "Algunas veces", color: 'yellow' as ColorVariant, points: 3 },
      { text: "Pocas veces", color: 'blue' as ColorVariant, points: 4 },
      { text: "Nunca", color: 'green' as ColorVariant, points: 5 }
    ]
  },
  {
    question: "Durante las últimas 4 semanas, ¿con qué frecuencia sintió falta de aire?",
    options: [
      { text: "Más de una vez por día", color: 'red' as ColorVariant, points: 1 },
      { text: "Una vez por día", color: 'purple' as ColorVariant, points: 2 },
      { text: "De 3 a 6 veces por semana", color: 'yellow' as ColorVariant, points: 3 },
      { text: "Una o dos veces por semana", color: 'blue' as ColorVariant, points: 4 },
      { text: "Nunca", color: 'green' as ColorVariant, points: 5 }
    ]
  },
  {
    question: "Durante las últimas 4 semanas, ¿con qué frecuencia los síntomas de asma (sibilidos en el pecho, tos, falta de aire, opresión o dolor en el pecho) lo/a despertaron durante la noche o más temprano que de costumbre a la mañana?",
    options: [
      { text: "4 o más noches por semana", color: 'red' as ColorVariant, points: 1 },
      { text: "De 2 a 3 noches por semana", color: 'purple' as ColorVariant, points: 2 },
      { text: "Una vez por semana", color: 'yellow' as ColorVariant, points: 3 },
      { text: "Una o dos veces", color: 'blue' as ColorVariant, points: 4 },
      { text: "Nunca", color: 'green' as ColorVariant, points: 5 }
    ]
  },
  {
    question: "Durante las últimas 4 semanas, ¿con qué frecuencia usó su inhalador o nebulizador con medicación de rescate, tal como salbutamol?",
    options: [
      { text: "3 o más veces por día", color: 'red' as ColorVariant, points: 1 },
      { text: "1 ó 2 veces por día", color: 'purple' as ColorVariant, points: 2 },
      { text: "2 ó 3 veces por semana", color: 'yellow' as ColorVariant, points: 3 },
      { text: "Una vez por semana o menos", color: 'blue' as ColorVariant, points: 4 },
      { text: "Nunca", color: 'green' as ColorVariant, points: 5 }
    ]
  },
  {
    question: "¿Cómo calificaría el control de su asma durante las últimas 4 semanas?",
    options: [
      { text: "Para nada controlada", color: 'red' as ColorVariant, points: 1 },
      { text: "Mal controlada", color: 'purple' as ColorVariant, points: 2 },
      { text: "Algo controlada", color: 'yellow' as ColorVariant, points: 3 },
      { text: "Bien controlada", color: 'blue' as ColorVariant, points: 4 },
      { text: "Totalmente controlada", color: 'green' as ColorVariant, points: 5 }
    ]
  }
];

interface Answer {
  questionIndex: number;
  answerIndex: number;
  points: number;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ questionNumber }) => {
  const navigate = useNavigate();
  const totalQuestions = questions.length;
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const currentQuestion = questions[questionNumber - 1];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    // Update answers array with the selected answer
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionIndex === questionNumber - 1);
    
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = {
        questionIndex: questionNumber - 1,
        answerIndex,
        points: currentQuestion.options[answerIndex].points
      };
    } else {
      newAnswers.push({
        questionIndex: questionNumber - 1,
        answerIndex,
        points: currentQuestion.options[answerIndex].points
      });
    }
    
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (questionNumber < totalQuestions) {
      navigate(`/question/${questionNumber + 1}`);
      setSelectedAnswer(null);
    } else {
      // Calculate total score and navigate to results
      const totalScore = answers.reduce((sum, answer) => sum + answer.points, 0);
      navigate('/results', { state: { score: totalScore, maxScore: 25 } }); // 5 questions * 5 max points each = 25
    }
  };

  const handleBack = () => {
    if (questionNumber > 1) {
      navigate(`/question/${questionNumber - 1}`);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', paddingTop: '1rem', paddingBottom: '1rem' }}>
      <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <img src={logo} alt="AsmaZ Logo" style={{ width: '120px', height: 'auto' }} />
        </div>
        <h2 style={{ fontSize: '1.25rem', textAlign: 'center', color: '#4b5563', marginBottom: '2rem' }}>Controla tu asma</h2>
        
        <Container>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Pregunta {questionNumber} de {totalQuestions}</h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>{currentQuestion.question}</p>
          
          <OptionsContainer>
        {currentQuestion.options.map((option, index) => (
          <OptionButton
            key={index}
            isSelected={selectedAnswer === index}
            colorVariant={option.color}
            onClick={() => handleAnswerSelect(index)}
          >
            <ButtonContent>
              {option.text}
            </ButtonContent>
          </OptionButton>
        ))}
      </OptionsContainer>

      <Button
        onClick={handleNext}
        disabled={selectedAnswer === null}
        style={{ backgroundColor: selectedAnswer === null ? '#d1d5db' : undefined }}
      >
        {questionNumber === totalQuestions ? 'Ver Resultados' : 'Siguiente Pregunta'}
      </Button>

        </Container>

        <button
          onClick={handleBack}
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

export default QuestionScreen;
