'use client'; // Required for App Router

import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      tg.ready();
      tg.expand(); // Make full height
      setTheme(tg.colorScheme);
      setUser(tg.initDataUnsafe?.user || null);

      tg.BackButton.show();
      tg.BackButton.onClick(() => tg.close());
    }
  }, []);

  return (
    <main className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex items-center justify-between py-2 border-b border-gray-600">
        <button onClick={() => window.Telegram.WebApp.close()}>❌ Close</button>
        <h1 className="text-lg font-semibold">Telegram Mini App</h1>
        <button onClick={() => alert('Menu clicked')}>⋮</button>
      </div>

      <div className="mt-6">
        <p>👤 <strong>User:</strong> {user?.first_name || 'Guest'}</p>
        <p>🎨 <strong>Theme:</strong> {theme}</p>
        <p>✅ <strong>App is running inside Telegram</strong></p>
      </div>
    </main>
  );
}
