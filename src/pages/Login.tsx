import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Login() {
  const { signInWithGoogle, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--dark-bg))] via-[hsl(var(--darker-bg))] to-[hsl(var(--dark-bg))]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--neon-purple))]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--dark-bg))] via-[hsl(var(--darker-bg))] to-[hsl(var(--dark-bg))]">
      <div className="max-w-md w-full mx-4">
        <div className="text-center space-y-8">
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-[hsl(var(--neon-purple))] via-[hsl(var(--neon-pink))] to-[hsl(var(--neon-blue))] bg-clip-text text-transparent">
              HelDIsrdModex
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(var(--neon-purple))] via-[hsl(var(--neon-pink))] to-[hsl(var(--neon-blue))] opacity-20 blur-3xl -z-10" />
          </div>

          <p className="text-xl text-muted-foreground">
            Коммуникационная платформа для геймеров
          </p>

          <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Добро пожаловать!</h2>
              <p className="text-sm text-muted-foreground">
                Войдите, чтобы начать общение с друзьями
              </p>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              className="w-full h-12 bg-white hover:bg-gray-100 text-gray-900 font-semibold flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
                <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
                <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
              </svg>
              Войти через Google
            </Button>

            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))]">
                  <Icon name="MessageSquare" size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">Чаты и звонки</p>
                  <p className="text-xs text-muted-foreground">Общайтесь в реальном времени</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))]">
                  <Icon name="Users" size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">Группы и каналы</p>
                  <p className="text-xs text-muted-foreground">Создавайте сообщества</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-pink))] to-[hsl(var(--neon-blue))]">
                  <Icon name="Gamepad2" size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">Игровая активность</p>
                  <p className="text-xs text-muted-foreground">Показывайте в какую игру играете</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Входя в систему, вы соглашаетесь с условиями использования
          </p>
        </div>
      </div>
    </div>
  );
}
