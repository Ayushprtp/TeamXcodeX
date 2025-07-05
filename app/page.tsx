'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState<{ first_name: string; username?: string } | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isTelegram, setIsTelegram] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isTelegram === null) {
        // fallback for non-Telegram environments
        setIsTelegram(false);
        setTheme('dark');
        setUser({
          first_name: 'Developer',
          username: 'localhost',
        });
      }
    }, 500); // wait briefly for Telegram SDK to be ready

    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      setUser(tg.initDataUnsafe?.user || null);
      setTheme(tg.colorScheme || 'light');
      setIsTelegram(true);

      tg.BackButton.show();
      tg.BackButton.onClick(() => tg.close());

      clearTimeout(timeout); // cancel fallback
    }

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Show warning only if Telegram is explicitly false */}
      {isTelegram === false && (
        <div className="p-4 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded my-4">
          ⚠️ This app is designed to run inside the <strong>Telegram Mini App</strong> only.
          <br />
          Please open it from your Telegram bot.
        </div>
      )}

      {/* User Info */}
      <div className="p-4">
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
