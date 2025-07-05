'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState<{ first_name: string; username?: string } | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tg = window.Telegram?.WebApp;

      if (tg) {
        setIsTelegram(true);
        tg.ready();
        tg.expand();
        setTheme(tg.colorScheme || 'light');
        setUser(tg.initDataUnsafe?.user || null);

        tg.BackButton.show();
        tg.BackButton.onClick(() => tg.close());
      } else {
        // fallback for dev environment
        setIsTelegram(false);
        setTheme('light');
        setUser({
          first_name: 'Developer',
          username: 'localtest',
        });
      }
    }
  }, []);

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* App Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
        <button onClick={() => window.Telegram?.WebApp?.close()} className="text-sm">❌ Close</button>
        <h1 className="text-lg font-semibold">TeamXcodex</h1>
        <button onClick={() => alert('Menu clicked')} className="text-xl">⋮</button>
      </div>

      {/* Warning if not in Telegram */}
      {!isTelegram && (
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
