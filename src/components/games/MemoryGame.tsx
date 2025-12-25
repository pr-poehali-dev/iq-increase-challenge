import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface MemoryGameProps {
  onComplete: (success: boolean) => void;
  onCancel: () => void;
}

export default function MemoryGame({ onComplete, onCancel }: MemoryGameProps) {
  const [phase, setPhase] = useState<'memorize' | 'recall'>('memorize');
  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(5);

  const symbols = ['🎯', '⚡', '🔥', '💎', '🌟', '🎨', '🎵', '🎪'];

  useEffect(() => {
    const newSequence = Array.from({ length: 8 }, () => 
      symbols[Math.floor(Math.random() * symbols.length)]
    );
    setSequence(newSequence);
  }, []);

  useEffect(() => {
    if (phase === 'memorize' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'memorize' && countdown === 0) {
      setPhase('recall');
    }
  }, [countdown, phase]);

  const handleSymbolClick = (symbol: string) => {
    if (phase !== 'recall') return;
    
    const newUserSequence = [...userSequence, symbol];
    setUserSequence(newUserSequence);

    if (newUserSequence.length === sequence.length) {
      const isCorrect = newUserSequence.every((s, i) => s === sequence[i]);
      setTimeout(() => onComplete(isCorrect), 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span>🧠</span> Память
          </h3>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {phase === 'memorize' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{countdown}</div>
              <p className="text-muted-foreground">Запомните последовательность</p>
            </div>
            
            <div className="flex justify-center gap-3 flex-wrap">
              {sequence.map((symbol, i) => (
                <div key={i} className="text-5xl w-16 h-16 flex items-center justify-center bg-primary/10 rounded-lg animate-scale-in">
                  {symbol}
                </div>
              ))}
            </div>
          </div>
        )}

        {phase === 'recall' && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg mb-2">Выберите символы в правильном порядке</p>
              <p className="text-sm text-muted-foreground">{userSequence.length} / {sequence.length}</p>
            </div>

            <div className="flex justify-center gap-2 flex-wrap min-h-[80px] bg-muted/30 rounded-lg p-4">
              {userSequence.map((symbol, i) => (
                <div key={i} className="text-4xl animate-scale-in">
                  {symbol}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-3">
              {symbols.map((symbol, i) => (
                <Button
                  key={i}
                  onClick={() => handleSymbolClick(symbol)}
                  className="h-20 text-4xl bg-card hover:bg-primary/20 border-2 border-primary/20"
                  disabled={userSequence.length >= sequence.length}
                >
                  {symbol}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
