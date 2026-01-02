import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

type ViewType = 'home' | 'chats' | 'groups' | 'channels' | 'friends';

interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  game?: string;
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'ProGamer2077', status: 'online', game: 'Cyberpunk 2077' },
  { id: '2', name: 'ShadowNinja', status: 'online', game: 'CS:GO' },
  { id: '3', name: 'DragonSlayer', status: 'idle', game: 'Elden Ring' },
  { id: '4', name: 'MysticMage', status: 'dnd', game: 'Baldurs Gate 3' },
  { id: '5', name: 'TechWizard', status: 'offline' },
];

const mockMessages: Message[] = [
  { id: '1', userId: '1', userName: 'ProGamer2077', content: 'Кто идет в рейд сегодня вечером?', timestamp: '18:32' },
  { id: '2', userId: '2', userName: 'ShadowNinja', content: 'Я готов, собираем команду!', timestamp: '18:35' },
  { id: '3', userId: '3', userName: 'DragonSlayer', content: 'Беру танка, нужны хилы', timestamp: '18:37' },
];

export default function Index() {
  const { user, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
    }
  };

  const renderSidebar = () => (
    <div className="w-72 bg-[hsl(var(--sidebar-background))] border-r border-[hsl(var(--sidebar-border))] flex flex-col">
      <div className="p-4 border-b border-[hsl(var(--sidebar-border))]">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] bg-clip-text text-transparent">
          HelDIsrdModex
        </h1>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <Button
          variant={currentView === 'home' ? 'default' : 'ghost'}
          className="justify-start gap-3 h-12"
          onClick={() => setCurrentView('home')}
        >
          <Icon name="Home" size={20} />
          Главная
        </Button>
        <Button
          variant={currentView === 'chats' ? 'default' : 'ghost'}
          className="justify-start gap-3 h-12"
          onClick={() => setCurrentView('chats')}
        >
          <Icon name="MessageSquare" size={20} />
          Чаты
        </Button>
        <Button
          variant={currentView === 'groups' ? 'default' : 'ghost'}
          className="justify-start gap-3 h-12"
          onClick={() => setCurrentView('groups')}
        >
          <Icon name="Users" size={20} />
          Группы
        </Button>
        <Button
          variant={currentView === 'channels' ? 'default' : 'ghost'}
          className="justify-start gap-3 h-12"
          onClick={() => setCurrentView('channels')}
        >
          <Icon name="Hash" size={20} />
          Каналы
        </Button>
        <Button
          variant={currentView === 'friends' ? 'default' : 'ghost'}
          className="justify-start gap-3 h-12"
          onClick={() => setCurrentView('friends')}
        >
          <Icon name="UserPlus" size={20} />
          Друзья
        </Button>
      </div>

      <Separator className="my-2" />

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground px-2 mb-2">ОНЛАЙН СЕЙЧАС — {mockUsers.filter(u => u.status === 'online').length}</p>
          {mockUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedChat(user.id)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[hsl(var(--sidebar-accent))] transition-colors ${
                selectedChat === user.id ? 'bg-[hsl(var(--sidebar-accent))]' : ''
              }`}
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))]">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[hsl(var(--sidebar-background))] ${getStatusColor(user.status)}`} />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                {user.game && (
                  <p className="text-xs text-[hsl(var(--neon-purple))] truncate">🎮 {user.game}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-[hsl(var(--sidebar-border))]">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))]">
                {user?.displayName?.substring(0, 2).toUpperCase() || 'YU'}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user?.displayName || 'Геймер'}</p>
            <p className="text-xs text-[hsl(var(--neon-purple))]">🎮 Valorant</p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0" onClick={handleSignOut} title="Выйти">
            <Icon name="LogOut" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[hsl(var(--dark-bg))] via-[hsl(var(--darker-bg))] to-[hsl(var(--dark-bg))]">
      <div className="text-center space-y-6 max-w-2xl">
        <div className="relative inline-block">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-[hsl(var(--neon-purple))] via-[hsl(var(--neon-pink))] to-[hsl(var(--neon-blue))] bg-clip-text text-transparent">
            HelDIsrdModex
          </h2>
          <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(var(--neon-purple))] via-[hsl(var(--neon-pink))] to-[hsl(var(--neon-blue))] opacity-20 blur-3xl -z-10" />
        </div>
        
        <p className="text-xl text-muted-foreground">
          Коммуникационная платформа для геймеров
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-card border border-border rounded-xl p-6 hover:border-[hsl(var(--neon-purple))] transition-all hover:shadow-lg hover:shadow-[hsl(var(--neon-purple))]/20">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] mb-4">
              <Icon name="MessageSquare" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Текстовые чаты</h3>
            <p className="text-sm text-muted-foreground">Общайтесь с друзьями в реальном времени</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:border-[hsl(var(--neon-blue))] transition-all hover:shadow-lg hover:shadow-[hsl(var(--neon-blue))]/20">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] mb-4">
              <Icon name="Phone" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Голосовые звонки</h3>
            <p className="text-sm text-muted-foreground">Качество звука как в Discord</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:border-[hsl(var(--neon-pink))] transition-all hover:shadow-lg hover:shadow-[hsl(var(--neon-pink))]/20">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-pink))] to-[hsl(var(--neon-blue))] mb-4">
              <Icon name="Users" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Группы и каналы</h3>
            <p className="text-sm text-muted-foreground">Создавайте сообщества по интересам</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:border-[hsl(var(--neon-purple))] transition-all hover:shadow-lg hover:shadow-[hsl(var(--neon-purple))]/20">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] mb-4">
              <Icon name="Gamepad2" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Игровая активность</h3>
            <p className="text-sm text-muted-foreground">Показывайте в какую игру играете</p>
          </div>
        </div>

        <div className="pt-8">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            <Icon name="Zap" size={16} className="mr-2" />
            Онлайн пользователей: {mockUsers.filter(u => u.status === 'online').length}
          </Badge>
        </div>
      </div>
    </div>
  );

  const renderChats = () => {
    const selectedUser = mockUsers.find(u => u.id === selectedChat);
    
    return (
      <div className="flex-1 flex flex-col bg-[hsl(var(--background))]">
        {selectedUser ? (
          <>
            <div className="h-16 border-b border-border flex items-center px-6 gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))]">
                  {selectedUser.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{selectedUser.name}</h3>
                {selectedUser.game && (
                  <p className="text-xs text-[hsl(var(--neon-purple))]">🎮 Играет в {selectedUser.game}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Icon name="Phone" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Video" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {mockMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))]">
                        {msg.userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-semibold text-sm">{msg.userName}</span>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm bg-card rounded-lg px-4 py-2 inline-block">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Icon name="Plus" size={20} />
                </Button>
                <Input
                  placeholder="Написать сообщение..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon">
                  <Icon name="Smile" size={20} />
                </Button>
                <Button size="icon" className="bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))]">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Выберите чат, чтобы начать общение
          </div>
        )}
      </div>
    );
  };

  const renderFriends = () => (
    <div className="flex-1 p-8 overflow-auto">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] bg-clip-text text-transparent">
        Друзья
      </h2>
      
      <div className="grid gap-4">
        {mockUsers.map((user) => (
          <div key={user.id} className="bg-card border border-border rounded-xl p-6 hover:border-[hsl(var(--neon-purple))] transition-all">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] text-lg">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card ${getStatusColor(user.status)}`} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                {user.game ? (
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      <Icon name="Gamepad2" size={14} className="mr-1" />
                      {user.game}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-green-500 text-green-500">
                      {user.status === 'online' ? 'В сети' : user.status === 'idle' ? 'Не активен' : user.status === 'dnd' ? 'Не беспокоить' : 'Не в сети'}
                    </Badge>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">
                    {user.status === 'offline' ? 'Не в сети' : 'В сети'}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Icon name="MessageSquare" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Phone" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Video" size={18} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGroups = () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] mx-auto flex items-center justify-center">
          <Icon name="Users" size={48} />
        </div>
        <h3 className="text-2xl font-bold">Группы</h3>
        <p className="text-muted-foreground max-w-md">
          Создавайте группы для совместных игр и общения с друзьями
        </p>
        <Button className="bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] mt-4">
          <Icon name="Plus" size={18} className="mr-2" />
          Создать группу
        </Button>
      </div>
    </div>
  );

  const renderChannels = () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] mx-auto flex items-center justify-center">
          <Icon name="Hash" size={48} />
        </div>
        <h3 className="text-2xl font-bold">Каналы</h3>
        <p className="text-muted-foreground max-w-md">
          Публикуйте контент и делитесь видео с подписчиками
        </p>
        <Button className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] mt-4">
          <Icon name="Plus" size={18} className="mr-2" />
          Создать канал
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {renderSidebar()}
      {currentView === 'home' && renderHome()}
      {currentView === 'chats' && renderChats()}
      {currentView === 'friends' && renderFriends()}
      {currentView === 'groups' && renderGroups()}
      {currentView === 'channels' && renderChannels()}
    </div>
  );
}