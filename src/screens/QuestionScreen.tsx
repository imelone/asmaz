import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OptionButton, ButtonContent, OptionsContainer } from './QuestionScreen.styles';

type ColorVariant = 'green' | 'blue' | 'yellow' | 'purple' | 'red';


interface QuestionScreenProps {
  questionNumber: number;
}

const questions = [
  {
    question: "¿CUÁNTO TIEMPO LE HA IMPEDIDO SU ASMA HACER TODO LO QUE QUERÍA EN EL TRABAJO O EN LA CASA?",
    options: [
      { text: "NUNCA", color: 'green' as ColorVariant, points: 5 },
      { text: "UN POCO", color: 'blue' as ColorVariant, points: 4 },
      { text: "ALGO DE TIEMPO", color: 'yellow' as ColorVariant, points: 3 },
      { text: "LA MAYORÍA DEL TIEMPO", color: 'purple' as ColorVariant, points: 2 },
      { text: "SIEMPRE", color: 'red' as ColorVariant, points: 1 }
    ]
  },
  {
    question: "¿CON QUÉ FRECUENCIA LE HA FALTADO AIRE?",
    options: [
      { text: "NUNCA", color: 'green' as ColorVariant, points: 5 },
      { text: "1-2 VECES POR SEMANA", color: 'blue' as ColorVariant, points: 4 },
      { text: "DE 3-6 VECES POR SEMANA", color: 'yellow' as ColorVariant, points: 3 },
      { text: "1 VEZ AL DÍA", color: 'purple' as ColorVariant, points: 2 },
      { text: "MÁS DE 1 VEZ AL DÍA", color: 'red' as ColorVariant, points: 1 }
    ]
  },
  {
    question: "¿CON QUÉ FRECUENCIA SUS SÍNTOMAS DEL ASMA (PITOS, TOS, FALTA DE AIRE O PRESIÓN EN EL PECHO) LE HAN DESPERTADO POR LA NOCHE O MÁS TEMPRANO POR LA MAÑANA? (POR SEMANA)",
    options: [
      { text: "NUNCA", color: 'green' as ColorVariant, points: 5 },
      { text: "1-2 NOCHES EN LAS 4 SEMANAS PREVIAS", color: 'blue' as ColorVariant, points: 4 },
      { text: "1 NOCHE", color: 'yellow' as ColorVariant, points: 3 },
      { text: "2-3 NOCHES", color: 'purple' as ColorVariant, points: 2 },
      { text: "4 NOCHES O MÁS", color: 'red' as ColorVariant, points: 1 }
    ]
  },
  {
    question: "¿CON QUÉ FRECUENCIA HA UTILIZADO EL INHALADOR DE RESCATE?",
    options: [
      { text: "NUNCA", color: 'green' as ColorVariant, points: 5 },
      { text: "1 VEZ O MENOS POR SEMANA", color: 'blue' as ColorVariant, points: 4 },
      { text: "2 O 3 VECES POR SEMANA", color: 'yellow' as ColorVariant, points: 3 },
      { text: "1 O 2 VECES AL DÍA", color: 'purple' as ColorVariant, points: 2 },
      { text: "3 O MÁS VECES", color: 'red' as ColorVariant, points: 1 }
    ]
  },
  {
    question: "¿CÓMO DIRÍA QUE HA ESTADO CONTROLADA SU ASMA DURANTE LAS 4 ÚLTIMAS SEMANAS?",
    options: [
      { text: "CONTROLADA", color: 'green' as ColorVariant, points: 5 },
      { text: "BIEN CONTROLADA", color: 'blue' as ColorVariant, points: 4 },
      { text: "ALGO CONTROLADA", color: 'yellow' as ColorVariant, points: 3 },
      { text: "MAL CONTROLADA", color: 'purple' as ColorVariant, points: 2 },
      { text: "DESCONTROLADA", color: 'red' as ColorVariant, points: 1 }
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Pregunta {questionNumber} de {totalQuestions}</h2>
      <p className="mb-6 text-lg">{currentQuestion.question}</p>
      
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

      <button
        onClick={handleNext}
        disabled={selectedAnswer === null}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          selectedAnswer === null 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {questionNumber === totalQuestions ? 'Ver Resultados' : 'Siguiente Pregunta'}
      </button>
    </div>
  );
};

export default QuestionScreen;
