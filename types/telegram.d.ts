// types/telegram.d.ts

// Define the user object that Telegram provides
interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

// Define the structure of Telegram's WebApp interface
interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramWebAppUser;
    [key: string]: any;
  };
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    [key: string]: string | undefined;
  };
  isExpanded: boolean;
  expand(): void;
  close(): void;

  BackButton: {
    isVisible: boolean;
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
  };

  MainButton: {
    isVisible: boolean;
    text: string;
    color: string;
    textColor: string;
    isActive: boolean;
    setText(text: string): void;
    onClick(callback: () => void): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
  };

  ready(): void;
  sendData(data: string): void;
}

// ✅ Augment the global `Window` interface
interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}

