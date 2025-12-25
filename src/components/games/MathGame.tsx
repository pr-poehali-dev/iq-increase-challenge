import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface MathGameProps {
  onComplete: (success: boolean) => void;
  onCancel: () => void;
}

export default function MathGame({ onComplete, onCancel }: MathGameProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState({ a: 0, b: 0, op: '+', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const generateQuestion = () => {
    const operations = ['+', '-', '*'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    
    let answer = 0;
    switch (op) {
      case '+': answer = a + b; break;
      case '-': answer = a - b; break;
      case '*': answer = a * b; break;
    }
    
    setQuestion({ a, b, op, answer });
    setUserAnswer('');
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete(score >= 5);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, onComplete]);

  const handleSubmit = () => {
    if (parseInt(userAnswer) === question.answer) {
      setScore(prev => prev + 1);
      setQuestionsAnswered(prev => prev + 1);
    }
    generateQuestion();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userAnswer) {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span>🧮</span> Быстрый счёт
          </h3>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Время: {timeLeft}с</span>
            <span>Счёт: {score}</span>
          </div>
          <Progress value={(timeLeft / 60) * 100} className="h-2" />
        </div>

        <div className="text-center py-8">
          <div className="text-5xl font-bold mb-8">
            {question.a} {question.op} {question.b} = ?
          </div>
          
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full text-center text-3xl font-bold bg-muted border-2 border-primary rounded-lg p-4 focus:outline-none focus:border-secondary"
            placeholder="?"
            autoFocus
          />
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={!userAnswer}
          className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary"
        >
          Ответить
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Решите минимум 5 примеров за 60 секунд
        </div>
      </Card>
    </div>
  );
}
