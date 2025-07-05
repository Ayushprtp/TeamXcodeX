'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState<{ first_name: string; username?: string } | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isTelegram, setIsTelegram] = useState<boolean | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isTelegram === null) {
        setIsTelegram(false);
        setTheme('dark');
        setUser({ first_name: 'Developer', username: 'localhost' });
      }
    }, 500);

    if (typeof window !== 'undefined') {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
        setTheme(tg.colorScheme || 'light');
        setUser(tg.initDataUnsafe?.user || null);
        setIsTelegram(true);

        tg.BackButton.show();
        tg.BackButton.onClick(() => tg.close());
        clearTimeout(timeout);
      }
    }

    return () => clearTimeout(timeout);
  }, []);

  const isDark = theme === 'dark';

  return (
    <main className={`min-h-screen w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'} font-sans`}>
      {/* Immersive AppBar like BLUM */}
      <div className={`fixed top-0 left-0 right-0 z-10 py-3 px-4 flex items-center justify-between ${isDark ? 'bg-black/80 text-white' : 'bg-white/80 text-black'} backdrop-blur-md border-b border-gray-700`}>
        <h1 className="text-lg font-semibold tracking-wide">TeamXcodeX</h1>
        <span className="text-sm opacity-70">Mini App</span>
      </div>

      {/* Spacer for fixed AppBar */}
      <div className="h-14" />

      {/* User Info */}
      <div className="px-4 py-2">
        {isTelegram === false && (
          <div className="p-4 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded my-4">
            ⚠️ This app is designed to run inside the <strong>Telegram Mini App</strong> only.
            <br />
            Please open it from your Telegram bot.
          </div>
        )}

        {user ? (
          <>
            <p>👋 Hello, <strong>{user.first_name}</strong></p>
            {user.username && <p>🔗 @{user.username}</p>}
            <p>🎨 Theme: {theme}</p>
          </>
        ) : (
          <p>Loading Telegram user info...</p>
        )}
      </div>
    </main>
  );
}
