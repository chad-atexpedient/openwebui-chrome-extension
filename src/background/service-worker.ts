// Background service worker for Chrome extension
import { MessageType, ExtensionMessage, ExtensionResponse } from '../shared/types';
import { getStorage, setStorage } from '../shared/storage';
import { getClient } from '../shared/api/client';

console.log('Background service worker loaded');

// Create context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'sendToOpenWebUI',
    title: 'Send to Open WebUI',
    contexts: ['selection'],
  });

  console.log('Extension installed and context menu created');
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'sendToOpenWebUI' && info.selectionText) {
    // Store selected text and open popup
    await setStorage({ selectedText: info.selectionText } as any);
    
    // Open the popup (you might want to open in a new window or tab instead)
    chrome.action.openPopup();
  }
});

// Handle messages from popup/content scripts
chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, sender, sendResponse) => {
    handleMessage(message)
      .then((response) => sendResponse(response))
      .catch((error) => {
        console.error('Error handling message:', error);
        sendResponse({
          success: false,
          error: error.message || 'Unknown error occurred',
        });
      });
    
    // Return true to indicate async response
    return true;
  }
);

/**
 * Handle different message types
 */
async function handleMessage(message: ExtensionMessage): Promise<ExtensionResponse> {
  const { type, payload } = message;

  try {
    switch (type) {
      case MessageType.AUTH_LOGIN:
        return await handleLogin(payload);
      
      case MessageType.AUTH_LOGOUT:
        return await handleLogout();
      
      case MessageType.SEND_MESSAGE:
        return await handleSendMessage(payload);
      
      case MessageType.GET_CHATS:
        return await handleGetChats();
      
      case MessageType.CREATE_CHAT:
        return await handleCreateChat(payload);
      
      case MessageType.DELETE_CHAT:
        return await handleDeleteChat(payload);
      
      case MessageType.UPDATE_CONFIG:
        return await handleUpdateConfig(payload);
      
      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Handle login
 */
async function handleLogin(payload: { email: string; password: string; baseUrl: string }): Promise<ExtensionResponse> {
  const { email, password, baseUrl } = payload;
  
  const client = getClient(baseUrl);
  const authResponse = await client.login(email, password);
  
  // Store auth token and config
  await setStorage({
    authToken: authResponse.token,
    config: { baseUrl },
  });
  
  return {
    success: true,
    data: authResponse,
  };
}

/**
 * Handle logout
 */
async function handleLogout(): Promise<ExtensionResponse> {
  await setStorage({
    authToken: undefined,
  });
  
  return {
    success: true,
  };
}

/**
 * Handle sending a message
 */
async function handleSendMessage(payload: { message: string; chatId?: string }): Promise<ExtensionResponse> {
  const { config, authToken } = await getStorage(['config', 'authToken']);
  
  if (!config?.baseUrl || !authToken) {
    throw new Error('Not authenticated. Please log in first.');
  }
  
  const client = getClient(config.baseUrl, authToken);
  const response = await client.sendMessage(payload.message, payload.chatId);
  
  return {
    success: true,
    data: response,
  };
}

/**
 * Handle getting chats
 */
async function handleGetChats(): Promise<ExtensionResponse> {
  const { config, authToken } = await getStorage(['config', 'authToken']);
  
  if (!config?.baseUrl || !authToken) {
    throw new Error('Not authenticated. Please log in first.');
  }
  
  const client = getClient(config.baseUrl, authToken);
  const chats = await client.getChats();
  
  return {
    success: true,
    data: chats,
  };
}

/**
 * Handle creating a chat
 */
async function handleCreateChat(payload: { title?: string }): Promise<ExtensionResponse> {
  const { config, authToken } = await getStorage(['config', 'authToken']);
  
  if (!config?.baseUrl || !authToken) {
    throw new Error('Not authenticated. Please log in first.');
  }
  
  const client = getClient(config.baseUrl, authToken);
  const chat = await client.createChat(payload.title);
  
  return {
    success: true,
    data: chat,
  };
}

/**
 * Handle deleting a chat
 */
async function handleDeleteChat(payload: { chatId: string }): Promise<ExtensionResponse> {
  const { config, authToken } = await getStorage(['config', 'authToken']);
  
  if (!config?.baseUrl || !authToken) {
    throw new Error('Not authenticated. Please log in first.');
  }
  
  const client = getClient(config.baseUrl, authToken);
  await client.deleteChat(payload.chatId);
  
  return {
    success: true,
  };
}

/**
 * Handle updating config
 */
async function handleUpdateConfig(payload: any): Promise<ExtensionResponse> {
  const { config } = await getStorage(['config']);
  
  await setStorage({
    config: {
      ...config,
      ...payload,
    },
  });
  
  return {
    success: true,
  };
}

// Keep service worker alive (Chrome has 5-minute timeout)
// This is a workaround for Manifest V3 limitations
let keepAliveInterval: number;

function keepAlive() {
  keepAliveInterval = setInterval(() => {
    console.log('Service worker keepalive ping');
  }, 20000) as unknown as number;
}

keepAlive();

// Clean up on unload
self.addEventListener('unload', () => {
  clearInterval(keepAliveInterval);
});
