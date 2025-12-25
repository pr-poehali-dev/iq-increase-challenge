import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AttentionGameProps {
  onComplete: (success: boolean) => void;
  onCancel: () => void;
}

interface Difference {
  x: number;
  y: number;
  found: boolean;
}

export default function AttentionGame({ onComplete, onCancel }: AttentionGameProps) {
  const [differences, setDifferences] = useState<Difference[]>([]);
  const [foundCount, setFoundCount] = useState(0);

  useEffect(() => {
    const newDifferences: Difference[] = [];
    for (let i = 0; i < 5; i++) {
      newDifferences.push({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        found: false
      });
    }
    setDifferences(newDifferences);
  }, []);

  const handleClick = (x: number, y: number) => {
    const clickedDiff = differences.findIndex(
      d => !d.found && Math.abs(d.x - x) < 8 && Math.abs(d.y - y) < 8
    );

    if (clickedDiff !== -1) {
      const newDifferences = [...differences];
      newDifferences[clickedDiff].found = true;
      setDifferences(newDifferences);
      
      const newFoundCount = foundCount + 1;
      setFoundCount(newFoundCount);

      if (newFoundCount === 5) {
        setTimeout(() => onComplete(true), 500);
      }
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    handleClick(x, y);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in overflow-y-auto">
      <Card className="w-full max-w-4xl p-6 space-y-6 my-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span>👁️</span> Найди отличия
          </h3>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="text-center space-y-2">
          <p className="text-muted-foreground">Найдите 5 красных точек на картинке</p>
          <div className="text-2xl font-bold text-primary">
            Найдено: {foundCount} / 5
          </div>
        </div>

        <div 
          className="relative w-full aspect-video bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-lg cursor-crosshair overflow-hidden"
          onClick={handleImageClick}
        >
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 40 + 20 + 'px',
                  height: Math.random() * 40 + 20 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.3
                }}
              />
            ))}
          </div>

          {differences.map((diff, i) => (
            <div
              key={i}
              className={`absolute w-4 h-4 rounded-full transition-all duration-300 ${
                diff.found 
                  ? 'bg-green-500 scale-150 animate-pulse' 
                  : 'bg-red-500 animate-pulse'
              }`}
              style={{
                left: diff.x + '%',
                top: diff.y + '%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-white/10 text-9xl font-bold">🎯</div>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Кликайте по красным точкам, чтобы отметить их
        </div>
      </Card>
    </div>
  );
}
