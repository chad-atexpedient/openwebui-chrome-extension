import { useState, useEffect, useRef, FormEvent } from 'react';
import { MessageType, ExtensionMessage, ExtensionResponse, Message } from '../../shared/types';
import { removeStorage } from '../../shared/storage';

interface ChatProps {
  onLogout: () => void;
}

function Chat({ onLogout }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const message: ExtensionMessage = {
        type: MessageType.SEND_MESSAGE,
        payload: { message: inputValue },
      };

      const response = await chrome.runtime.sendMessage(message) as ExtensionResponse;

      if (response.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.data.message || 'No response',
          timestamp: Date.now(),
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(response.error || 'Failed to send message');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const message: ExtensionMessage = {
        type: MessageType.AUTH_LOGOUT,
      };
      await chrome.runtime.sendMessage(message);
      await removeStorage('authToken');
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <div className="chat-header">
        <h2 className="chat-title">Chat</h2>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💬</div>
            <p className="empty-state-text">Start a conversation</p>
            <p className="empty-state-subtext">Ask me anything!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message message-${msg.role}`}
            >
              {msg.content}
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="message message-loading">
            Thinking...
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <form onSubmit={handleSendMessage} className="input-form">
          <textarea
            className="message-input"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn-send"
            disabled={isLoading || !inputValue.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default Chat;
