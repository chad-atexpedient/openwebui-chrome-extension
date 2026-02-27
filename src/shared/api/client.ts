// API client for Open WebUI
import axios, { AxiosInstance, AxiosError } from 'axios';
import { AuthResponse, ChatResponse, Message } from '../types';

export class OpenWebUIClient {
  private client: AxiosInstance;
  private baseUrl: string;
  private authToken?: string;

  constructor(baseUrl: string, authToken?: string) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.authToken = authToken;
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token to requests if available
    this.client.interceptors.request.use((config) => {
      if (this.authToken) {
        config.headers.Authorization = `Bearer ${this.authToken}`;
      }
      return config;
    });
  }

  /**
   * Update the auth token
   */
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  /**
   * Authenticate with Open WebUI
   * Note: Update this method based on your actual Open WebUI auth endpoint
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await this.client.post('/api/v1/auths/signin', {
        email,
        password,
      });
      
      const token = response.data.token;
      this.setAuthToken(token);
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Send a chat message
   * Note: Update this based on your actual Open WebUI chat endpoint
   */
  async sendMessage(message: string, chatId?: string): Promise<ChatResponse> {
    try {
      const response = await this.client.post('/api/chat', {
        message,
        chat_id: chatId,
      });
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get chat history
   * Note: Update this based on your actual Open WebUI endpoint
   */
  async getChatHistory(chatId: string): Promise<Message[]> {
    try {
      const response = await this.client.get(`/api/chat/${chatId}`);
      return response.data.messages || [];
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get all chats
   * Note: Update this based on your actual Open WebUI endpoint
   */
  async getChats(): Promise<any[]> {
    try {
      const response = await this.client.get('/api/chats');
      return response.data || [];
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Create a new chat
   * Note: Update this based on your actual Open WebUI endpoint
   */
  async createChat(title?: string): Promise<any> {
    try {
      const response = await this.client.post('/api/chats/new', {
        title: title || 'New Chat',
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete a chat
   * Note: Update this based on your actual Open WebUI endpoint
   */
  async deleteChat(chatId: string): Promise<void> {
    try {
      await this.client.delete(`/api/chats/${chatId}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors
   */
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const message = (axiosError.response.data as any)?.message || axiosError.message;
        return new Error(`API Error: ${message}`);
      } else if (axiosError.request) {
        return new Error('No response from server. Check your network connection.');
      }
    }
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
}

// Export a singleton instance creator
let clientInstance: OpenWebUIClient | null = null;

export function getClient(baseUrl: string, authToken?: string): OpenWebUIClient {
  if (!clientInstance || clientInstance['baseUrl'] !== baseUrl) {
    clientInstance = new OpenWebUIClient(baseUrl, authToken);
  } else if (authToken) {
    clientInstance.setAuthToken(authToken);
  }
  return clientInstance;
}
