import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import MathGame from '@/components/games/MathGame';
import MemoryGame from '@/components/games/MemoryGame';
import PatternGame from '@/components/games/PatternGame';
import LogicGame from '@/components/games/LogicGame';
import CreativityGame from '@/components/games/CreativityGame';
import AttentionGame from '@/components/games/AttentionGame';

interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  category: string;
  icon: string;
  completed: boolean;
  gameType: 'math' | 'memory' | 'pattern' | 'logic' | 'creativity' | 'attention';
}

interface Artifact {
  id: number;
  name: string;
  emoji: string;
  effect: string;
  bonus: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  owned: boolean;
  price?: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface Player {
  username: string;
  iq: number;
  rank: number;
  avatar: string;
}

function Index() {
  const [iq, setIq] = useState(3000);
  const [level, setLevel] = useState(1);
  const [activeTab, setActiveTab] = useState('home');
  const [activeGame, setActiveGame] = useState<Task | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const { toast } = useToast();

  const tasks: Task[] = [
    { id: 1, title: 'Логическая задача', description: 'Решите математическую головоломку', reward: 150, category: 'Математика', icon: '🧮', completed: false, gameType: 'logic' },
    { id: 2, title: 'Быстрый счёт', description: 'Выполните вычисления за 60 секунд', reward: 200, category: 'Скорость', icon: '⚡', completed: false, gameType: 'math' },
    { id: 3, title: 'Память', description: 'Запомните последовательность из 8 символов', reward: 180, category: 'Память', icon: '🧠', completed: false, gameType: 'memory' },
    { id: 4, title: 'Паттерны', description: 'Найдите закономерность в ряду чисел', reward: 170, category: 'Логика', icon: '🔍', completed: false, gameType: 'pattern' },
    { id: 5, title: 'Креативность', description: 'Придумайте 5 необычных применений для предмета', reward: 220, category: 'Творчество', icon: '💡', completed: false, gameType: 'creativity' },
    { id: 6, title: 'Внимание', description: 'Найдите все отличия на картинке', reward: 160, category: 'Внимание', icon: '👁️', completed: false, gameType: 'attention' },
  ];

  const artifacts: Artifact[] = [
    { id: 1, name: 'Книга мудрости', emoji: '📚', effect: '+10% к награде за задания', bonus: 10, rarity: 'common', owned: true },
    { id: 2, name: 'Магический кристалл', emoji: '💎', effect: '+15% IQ от всех источников', bonus: 15, rarity: 'rare', owned: true },
    { id: 3, name: 'Корона гения', emoji: '👑', effect: '+25% к сложным задачам', bonus: 25, rarity: 'epic', owned: false, price: 5000 },
    { id: 4, name: 'Астральный шар', emoji: '🔮', effect: 'Удваивает награду 1 раз в день', bonus: 100, rarity: 'legendary', owned: false, price: 10000 },
    { id: 5, name: 'Песочные часы', emoji: '⏳', effect: '+20% к скоростным заданиям', bonus: 20, rarity: 'rare', owned: false, price: 3000 },
    { id: 6, name: 'Амулет памяти', emoji: '🧿', effect: '+30% к заданиям на память', bonus: 30, rarity: 'epic', owned: false, price: 6000 },
  ];

  const achievements: Achievement[] = [
    { id: 1, title: 'Первые шаги', description: 'Выполните первое задание', icon: '🎯', unlocked: false, progress: 0, maxProgress: 1 },
    { id: 2, title: 'Любитель знаний', description: 'Накопите 5000 IQ', icon: '📖', unlocked: false, progress: 3000, maxProgress: 5000 },
    { id: 3, title: 'Коллекционер', description: 'Соберите 3 артефакта', icon: '🏆', unlocked: false, progress: 2, maxProgress: 3 },
    { id: 4, title: 'Марафонец', description: 'Выполните 10 заданий подряд', icon: '🏃', unlocked: false, progress: 0, maxProgress: 10 },
    { id: 5, title: 'Мастер разума', description: 'Достигните 10000 IQ', icon: '🧠', unlocked: false, progress: 3000, maxProgress: 10000 },
  ];

  const leaderboard: Player[] = [
    { username: 'GeniusMaster', iq: 15420, rank: 1, avatar: '🥇' },
    { username: 'BrainStorm', iq: 13890, rank: 2, avatar: '🥈' },
    { username: 'SmartCookie', iq: 12350, rank: 3, avatar: '🥉' },
    { username: 'LogicKing', iq: 10200, rank: 4, avatar: '🎯' },
    { username: 'ThinkFast', iq: 9800, rank: 5, avatar: '⚡' },
    { username: 'Вы', iq: 3000, rank: 127, avatar: '🚀' },
  ];

  const rarityColors = {
    common: 'bg-gray-500',
    rare: 'bg-blue-500',
    epic: 'bg-purple-500',
    legendary: 'bg-orange-500',
  };

  const startTask = (task: Task) => {
    if (completedTasks.includes(task.id)) {
      toast({
        title: '⚠️ Задание выполнено',
        description: 'Вы уже выполнили это задание!',
      });
      return;
    }
    setActiveGame(task);
  };

  const handleGameComplete = (success: boolean) => {
    if (!activeGame) return;

    if (success) {
      const ownedArtifacts = artifacts.filter(a => a.owned);
      const totalBonus = ownedArtifacts.reduce((sum, a) => sum + a.bonus, 0);
      const bonusMultiplier = 1 + (totalBonus / 100);
      const finalReward = Math.round(activeGame.reward * bonusMultiplier);

      setIq(prev => {
        const newIq = prev + finalReward;
        const newLevel = Math.floor(newIq / 1000) + 1;
        if (newLevel > level) {
          setLevel(newLevel);
          toast({
            title: '🎉 Новый уровень!',
            description: `Вы достигли ${newLevel} уровня!`,
          });
        }
        return newIq;
      });

      setCompletedTasks(prev => [...prev, activeGame.id]);
      setTasksCompleted(prev => prev + 1);

      toast({
        title: '✅ Задание выполнено!',
        description: `+${finalReward} IQ (бонус от артефактов: +${Math.round((bonusMultiplier - 1) * 100)}%)`,
      });
    } else {
      toast({
        title: '❌ Не получилось',
        description: 'Попробуйте ещё раз!',
        variant: 'destructive',
      });
    }

    setActiveGame(null);
  };

  const handleGameCancel = () => {
    setActiveGame(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mb-2">
            КЛУБ ЭЙНШТЕЙНОВ 2.0
          </h1>
          <p className="text-muted-foreground text-lg">Развивай свой интеллект и собирай артефакты!</p>
        </header>

        <Card className="mb-6 p-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20 animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">{iq.toLocaleString()} IQ</h2>
              <p className="text-muted-foreground">Уровень {level}</p>
            </div>
            <div className="text-6xl animate-bounce-small">🚀</div>
          </div>
          <Progress value={(iq % 1000) / 10} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {1000 - (iq % 1000)} IQ до следующего уровня
          </p>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-5 mb-6 h-auto p-1">
            <TabsTrigger value="home" className="flex flex-col items-center gap-1 py-3">
              <Icon name="Home" size={20} />
              <span className="text-xs">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex flex-col items-center gap-1 py-3">
              <Icon name="ListChecks" size={20} />
              <span className="text-xs">Задания</span>
            </TabsTrigger>
            <TabsTrigger value="artifacts" className="flex flex-col items-center gap-1 py-3">
              <Icon name="Sparkles" size={20} />
              <span className="text-xs">Артефакты</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex flex-col items-center gap-1 py-3">
              <Icon name="Trophy" size={20} />
              <span className="text-xs">Достижения</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex flex-col items-center gap-1 py-3">
              <Icon name="Crown" size={20} />
              <span className="text-xs">Рейтинг</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <Card className="p-6 border-primary/20">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>🎯</span> Добро пожаловать!
              </h3>
              <p className="text-muted-foreground mb-4">
                Ты начинаешь с 3000 IQ. Выполняй задания, собирай артефакты и поднимайся в рейтинге!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-3xl mb-2">📝</div>
                  <h4 className="font-bold text-lg mb-1">Задания</h4>
                  <p className="text-sm text-muted-foreground">Выполняй разнообразные задачи и получай IQ</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="text-3xl mb-2">💎</div>
                  <h4 className="font-bold text-lg mb-1">Артефакты</h4>
                  <p className="text-sm text-muted-foreground">Собирай предметы для усиления способностей</p>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="text-3xl mb-2">🏆</div>
                  <h4 className="font-bold text-lg mb-1">Достижения</h4>
                  <p className="text-sm text-muted-foreground">Открывай награды за прогресс</p>
                </div>
              </div>
            </Card>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Zap" size={24} />
                Мои артефакты
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {artifacts.filter(a => a.owned).map(artifact => (
                  <Card key={artifact.id} className="p-4 text-center border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
                    <div className="text-4xl mb-2">{artifact.emoji}</div>
                    <h4 className="font-bold text-sm mb-1">{artifact.name}</h4>
                    <Badge className={`${rarityColors[artifact.rarity]} text-xs`}>
                      +{artifact.bonus}%
                    </Badge>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Icon name="ListChecks" size={28} />
                Доступные задания
              </h3>
              <p className="text-muted-foreground">Выполняй задания и зарабатывай IQ!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map(task => (
                <Card key={task.id} className="p-5 border-primary/20 hover:border-primary/40 transition-all hover:scale-102">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{task.icon}</div>
                      <div>
                        <h4 className="font-bold text-lg">{task.title}</h4>
                        <Badge variant="outline" className="text-xs">{task.category}</Badge>
                      </div>
                    </div>
                    <Badge className="bg-accent text-accent-foreground font-bold">+{task.reward} IQ</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    onClick={() => startTask(task)}
                    disabled={completedTasks.includes(task.id)}
                  >
                    {completedTasks.includes(task.id) ? (
                      <>
                        <Icon name="Check" size={16} className="mr-2" />
                        Выполнено
                      </>
                    ) : (
                      <>
                        <Icon name="Play" size={16} className="mr-2" />
                        Начать
                      </>
                    )}
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="artifacts" className="space-y-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Icon name="Sparkles" size={28} />
                Коллекция артефактов
              </h3>
              <p className="text-muted-foreground">Артефакты дают постоянные бонусы к заработку IQ</p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-3 text-primary">Мои артефакты</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {artifacts.filter(a => a.owned).map(artifact => (
                  <Card key={artifact.id} className="p-5 border-primary/30 bg-primary/5">
                    <div className="text-center mb-3">
                      <div className="text-5xl mb-2 animate-bounce-small">{artifact.emoji}</div>
                      <h4 className="font-bold text-lg mb-1">{artifact.name}</h4>
                      <Badge className={`${rarityColors[artifact.rarity]} mb-2`}>
                        {artifact.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground text-center mb-2">{artifact.effect}</p>
                    <div className="text-center">
                      <Badge variant="outline" className="text-accent font-bold">
                        Активен: +{artifact.bonus}%
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-3 text-muted-foreground">Магазин артефактов</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {artifacts.filter(a => !a.owned).map(artifact => (
                  <Card key={artifact.id} className="p-5 border-muted relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full" />
                    <div className="text-center mb-3">
                      <div className="text-5xl mb-2 opacity-60">{artifact.emoji}</div>
                      <h4 className="font-bold text-lg mb-1">{artifact.name}</h4>
                      <Badge className={`${rarityColors[artifact.rarity]} mb-2`}>
                        {artifact.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground text-center mb-3">{artifact.effect}</p>
                    <Button 
                      className="w-full"
                      variant={iq >= (artifact.price || 0) ? "default" : "secondary"}
                      disabled={iq < (artifact.price || 0)}
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      {artifact.price} IQ
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Icon name="Trophy" size={28} />
                Достижения
              </h3>
              <p className="text-muted-foreground">Открывай награды за свои успехи!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map(achievement => (
                <Card key={achievement.id} className={`p-5 border-primary/20 ${achievement.unlocked ? 'bg-primary/5' : 'opacity-60'}`}>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Прогресс</span>
                          <span>{achievement.progress} / {achievement.maxProgress}</span>
                        </div>
                        <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="w-full justify-center bg-gradient-to-r from-primary to-secondary">
                      <Icon name="Check" size={14} className="mr-1" />
                      Получено!
                    </Badge>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Icon name="Crown" size={28} />
                Таблица лидеров
              </h3>
              <p className="text-muted-foreground">Соревнуйся с лучшими игроками!</p>
            </div>
            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <Card key={index} className={`p-5 ${player.username === 'Вы' ? 'border-primary bg-primary/5 animate-glow' : 'border-muted'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{player.avatar}</div>
                      <div>
                        <h4 className="font-bold text-lg">{player.username}</h4>
                        <p className="text-sm text-muted-foreground">Ранг #{player.rank}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{player.iq.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">IQ</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {activeGame && activeGame.gameType === 'math' && (
        <MathGame onComplete={handleGameComplete} onCancel={handleGameCancel} />
      )}
      {activeGame && activeGame.gameType === 'memory' && (
        <MemoryGame onComplete={handleGameComplete} onCancel={handleGameCancel} />
      )}
      {activeGame && activeGame.gameType === 'pattern' && (
        <PatternGame onComplete={handleGameComplete} onCancel={handleGameCancel} />
      )}
      {activeGame && activeGame.gameType === 'logic' && (
        <LogicGame onComplete={handleGameComplete} onCancel={handleGameCancel} />
      )}
      {activeGame && activeGame.gameType === 'creativity' && (
        <CreativityGame onComplete={handleGameComplete} onCancel={handleGameCancel} />
      )}
      {activeGame && activeGame.gameType === 'attention' && (
        <AttentionGame onComplete={handleGameComplete} onCancel={handleGameCancel} />
      )}
    </div>
  );
}

export default Index;