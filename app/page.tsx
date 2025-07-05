'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState<{ first_name: string; username?: string } | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      tg.ready();
      tg.expand();
      setTheme(tg.colorScheme);
      setUser(tg.initDataUnsafe?.user || null);

      tg.BackButton.show();
      tg.BackButton.onClick(() => tg.close());
    }
  }, []);

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Custom Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-500">
        <button onClick={() => window.Telegram?.WebApp.close()} className="text-sm">❌ Close</button>
        <h1 className="text-lg font-semibold">TeamXcodex</h1>
        <button onClick={() => alert('Menu clicked')} className="text-xl">⋮</button>
      </div>

      {/* Main Content */}
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
