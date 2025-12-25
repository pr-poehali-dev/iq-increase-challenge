import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface LogicGameProps {
  onComplete: (success: boolean) => void;
  onCancel: () => void;
}

const puzzles = [
  {
    question: "Если все розы - цветы, а некоторые цветы красные, то...",
    options: [
      "Все розы красные",
      "Некоторые розы могут быть красными",
      "Никакие розы не красные",
      "Все красные цветы - розы"
    ],
    correct: 1
  },
  {
    question: "У меня есть 3 яблока. Вы забираете 2. Сколько яблок у вас?",
    options: ["1", "2", "3", "5"],
    correct: 1
  },
  {
    question: "Что тяжелее: килограмм пуха или килограмм железа?",
    options: [
      "Килограмм железа",
      "Килограмм пуха",
      "Одинаково",
      "Зависит от объема"
    ],
    correct: 2
  },
  {
    question: "Электричка едет со скоростью 70 км/ч. В какую сторону летит дым?",
    options: [
      "Назад",
      "Вперед",
      "Вверх",
      "У электрички нет дыма"
    ],
    correct: 3
  },
  {
    question: "Сколько месяцев в году имеют 28 дней?",
    options: ["1", "2", "11", "12"],
    correct: 3
  }
];

export default function LogicGame({ onComplete, onCancel }: LogicGameProps) {
  const [puzzle, setPuzzle] = useState(puzzles[0]);

  useEffect(() => {
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    setPuzzle(randomPuzzle);
  }, []);

  const handleAnswer = (index: number) => {
    const isCorrect = index === puzzle.correct;
    setTimeout(() => onComplete(isCorrect), 500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span>🧮</span> Логическая задача
          </h3>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="bg-primary/10 rounded-lg p-6">
            <p className="text-lg text-center">{puzzle.question}</p>
          </div>

          <div className="space-y-3">
            {puzzle.options.map((option, i) => (
              <Button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full h-auto py-4 text-left justify-start bg-card hover:bg-primary/20 border-2 border-primary/20"
              >
                <span className="font-bold mr-3 text-primary">{String.fromCharCode(65 + i)}.</span>
                <span>{option}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Выберите правильный ответ
        </div>
      </Card>
    </div>
  );
}
