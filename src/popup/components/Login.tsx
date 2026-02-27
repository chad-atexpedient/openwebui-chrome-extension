import { useState, FormEvent } from 'react';
import { MessageType, ExtensionMessage, ExtensionResponse } from '../../shared/types';

interface LoginProps {
  onLoginSuccess: () => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [baseUrl, setBaseUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate inputs
      if (!baseUrl || !email || !password) {
        throw new Error('Please fill in all fields');
      }

      // Send login message to background script
      const message: ExtensionMessage = {
        type: MessageType.AUTH_LOGIN,
        payload: { baseUrl, email, password },
      };

      const response = await chrome.runtime.sendMessage(message) as ExtensionResponse;

      if (response.success) {
        onLoginSuccess();
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div>
        <h1 className="login-title">Open WebUI</h1>
        <p className="login-subtitle">Connect to your Open WebUI instance</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="baseUrl" className="form-label">
            Base URL
          </label>
          <input
            id="baseUrl"
            type="url"
            className="form-input"
            placeholder="https://your-openwebui-instance.com"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Connecting...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

export default Login;
