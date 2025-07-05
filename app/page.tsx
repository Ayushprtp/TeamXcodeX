'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState<{ first_name: string; username?: string } | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isTelegram, setIsTelegram] = useState<boolean | null>(null); // null: still checking

  useEffect(() => {
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
      } else {
        // fallback (not Telegram)
        setIsTelegram(false);
        setTheme('dark');
        setUser({
          first_name: 'Developer',
          username: 'localtest',
        });
      }
    }
  }, []);

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Show warning only if isTelegram is explicitly false */}
      {isTelegram === false && (
        <div className="p-4 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded my-4">
          ⚠️ This app is designed to run inside the <strong>Telegram Mini App</strong> only.<br />
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
