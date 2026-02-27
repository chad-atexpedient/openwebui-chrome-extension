// Type definitions for the extension

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface Config {
  baseUrl: string;
  apiKey?: string;
  username?: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ChatResponse {
  id: string;
  message: string;
  done: boolean;
}

export interface StorageData {
  config?: Config;
  authToken?: string;
  currentChatId?: string;
  chats?: Chat[];
  theme?: 'light' | 'dark';
}

// Message types for communication between popup and background
export enum MessageType {
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  SEND_MESSAGE = 'SEND_MESSAGE',
  GET_CHATS = 'GET_CHATS',
  CREATE_CHAT = 'CREATE_CHAT',
  DELETE_CHAT = 'DELETE_CHAT',
  UPDATE_CONFIG = 'UPDATE_CONFIG'
}

export interface ExtensionMessage {
  type: MessageType;
  payload?: any;
}

export interface ExtensionResponse {
  success: boolean;
  data?: any;
  error?: string;
}
