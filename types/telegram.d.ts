// types/telegram.d.ts
interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramWebAppUser;
    [key: string]: any;
  };
  colorScheme: 'light' | 'dark';
  themeParams: {
    [key: string]: string;
  };
  isExpanded: boolean;
  expand(): void;
  close(): void;
  BackButton: {
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
  };
  MainButton: {
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
    setText(text: string): void;
  };
  ready(): void;
}

interface TelegramWindow extends Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}

declare const window: TelegramWindow;
