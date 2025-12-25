import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface CreativityGameProps {
  onComplete: (success: boolean) => void;
  onCancel: () => void;
}

const objects = [
  { name: 'кирпич', emoji: '🧱' },
  { name: 'скрепка', emoji: '📎' },
  { name: 'ложка', emoji: '🥄' },
  { name: 'бутылка', emoji: '🍾' },
  { name: 'коробка', emoji: '📦' }
];

export default function CreativityGame({ onComplete, onCancel }: CreativityGameProps) {
  const [object] = useState(objects[Math.floor(Math.random() * objects.length)]);
  const [ideas, setIdeas] = useState(['', '', '', '', '']);

  const handleIdeaChange = (index: number, value: string) => {
    const newIdeas = [...ideas];
    newIdeas[index] = value;
    setIdeas(newIdeas);
  };

  const handleSubmit = () => {
    const filledIdeas = ideas.filter(idea => idea.trim().length > 3);
    onComplete(filledIdeas.length >= 5);
  };

  const filledCount = ideas.filter(idea => idea.trim().length > 3).length;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in overflow-y-auto">
      <Card className="w-full max-w-2xl p-6 space-y-6 my-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span>💡</span> Креативность
          </h3>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="text-center space-y-4">
          <div className="text-7xl mb-4">{object.emoji}</div>
          <p className="text-lg">
            Придумайте <span className="text-primary font-bold">5 необычных</span> способов использования предмета:
          </p>
          <p className="text-2xl font-bold text-primary">{object.name}</p>
        </div>

        <div className="space-y-3">
          {ideas.map((idea, i) => (
            <div key={i} className="space-y-1">
              <label className="text-sm text-muted-foreground">Идея {i + 1}</label>
              <Textarea
                value={idea}
                onChange={(e) => handleIdeaChange(i, e.target.value)}
                placeholder="Напишите ваш вариант..."
                className="min-h-[60px] resize-none"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Заполнено: {filledCount} / 5
          </div>
          <Button
            onClick={handleSubmit}
            disabled={filledCount < 5}
            className="bg-gradient-to-r from-primary to-secondary"
          >
            <Icon name="Check" size={16} className="mr-2" />
            Отправить
          </Button>
        </div>
      </Card>
    </div>
  );
}
