import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface PatternGameProps {
  onComplete: (success: boolean) => void;
  onCancel: () => void;
}

export default function PatternGame({ onComplete, onCancel }: PatternGameProps) {
  const [pattern, setPattern] = useState<number[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => {
    generatePattern();
  }, []);

  const generatePattern = () => {
    const type = Math.floor(Math.random() * 3);
    let newPattern: number[] = [];
    let next = 0;

    switch (type) {
      case 0:
        const diff = Math.floor(Math.random() * 5) + 2;
        const start = Math.floor(Math.random() * 10) + 1;
        newPattern = Array.from({ length: 5 }, (_, i) => start + i * diff);
        next = newPattern[4] + diff;
        break;
      
      case 1:
        const mult = Math.floor(Math.random() * 2) + 2;
        const base = Math.floor(Math.random() * 3) + 2;
        newPattern = Array.from({ length: 5 }, (_, i) => base * Math.pow(mult, i));
        next = newPattern[4] * mult;
        break;
      
      case 2:
        newPattern = [1, 1];
        for (let i = 2; i < 5; i++) {
          newPattern.push(newPattern[i - 1] + newPattern[i - 2]);
        }
        next = newPattern[3] + newPattern[4];
        break;
    }

    setPattern(newPattern);
    setCorrectAnswer(next);

    const wrongOptions = [
      next + Math.floor(Math.random() * 5) + 1,
      next - Math.floor(Math.random() * 5) - 1,
      next * 2
    ].filter(n => n > 0 && n !== next);

    const allOptions = [next, ...wrongOptions.slice(0, 3)]
      .sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);
  };

  const handleAnswer = (answer: number) => {
    const isCorrect = answer === correctAnswer;
    setTimeout(() => onComplete(isCorrect), 500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span>🔍</span> Найди закономерность
          </h3>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Какое число должно быть следующим?</p>
          
          <div className="flex justify-center items-center gap-4 py-8">
            {pattern.map((num, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-lg text-2xl font-bold animate-scale-in">
                  {num}
                </div>
                {i < pattern.length - 1 && (
                  <Icon name="ArrowRight" size={24} className="text-muted-foreground" />
                )}
              </div>
            ))}
            <Icon name="ArrowRight" size={24} className="text-muted-foreground" />
            <div className="w-16 h-16 flex items-center justify-center bg-muted rounded-lg text-3xl font-bold">
              ?
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {options.map((option, i) => (
            <Button
              key={i}
              onClick={() => handleAnswer(option)}
              className="h-20 text-3xl font-bold bg-card hover:bg-primary/20 border-2 border-primary/20"
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Найдите закономерность в ряду чисел
        </div>
      </Card>
    </div>
  );
}
