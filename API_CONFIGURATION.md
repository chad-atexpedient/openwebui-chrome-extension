# API Configuration Guide

## Finding Your Open WebUI API Endpoints

This extension needs to communicate with your Open WebUI instance API. The API endpoints may vary depending on your Open WebUI version and configuration.

## Step-by-Step: Discover Your API Endpoints

### 1. Open DevTools in Your Browser

1. Navigate to your Open WebUI instance (e.g., `https://your-openwebui.com`)
2. Open DevTools:
   - Chrome/Edge: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
3. Click on the **Network** tab
4. Make sure **Fetch/XHR** filter is selected

### 2. Capture Login Request

1. Log out if you're currently logged in
2. In DevTools Network tab, click the clear button (🚫) to clear existing requests
3. Log in to Open WebUI
4. Look for the login API call (usually contains "auth" or "signin")
5. Click on it to see details

**Record these details:**
- **Request URL**: The endpoint path (e.g., `/api/v1/auths/signin`)
- **Request Method**: Usually POST
- **Request Payload**: The JSON structure (email, password fields)
- **Response**: The token field name (e.g., `token`, `access_token`, `jwt`)

### 3. Capture Chat Message Request

1. Clear the Network tab again
2. Send a message in the chat
3. Look for the API call that sends your message
4. Click on it to examine

**Record these details:**
- **Request URL**: The endpoint path (e.g., `/api/chat/completions` or `/api/chat`)
- **Request Method**: Usually POST
- **Request Payload**: The message structure
- **Response**: How the AI response is formatted

### 4. Example: What You Might See

#### Example Login Request:
```
POST https://your-openwebui.com/api/v1/auths/signin

Request Payload:
{
  "email": "user@example.com",
  "password": "yourpassword"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "name": "John Doe"
  }
}
```

#### Example Chat Request:
```
POST https://your-openwebui.com/api/chat/completions

Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Request Payload:
{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "user",
      "content": "Hello!"
    }
  ]
}

Response:
{
  "id": "chatcmpl-123",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Hi! How can I help you?"
      }
    }
  ]
}
```

## Updating the Extension Code

Once you've identified your API endpoints, update `src/shared/api/client.ts`:

### Update Login Method

```typescript
async login(email: string, password: string): Promise<AuthResponse> {
  try {
    // UPDATE THIS PATH to match your login endpoint
    const response = await this.client.post('/api/v1/auths/signin', {
      email,
      password,
    });
    
    // UPDATE THIS if your token field has a different name
    const token = response.data.token; // or response.data.access_token, etc.
    this.setAuthToken(token);
    
    return response.data;
  } catch (error) {
    throw this.handleError(error);
  }
}
```

### Update Send Message Method

```typescript
async sendMessage(message: string, chatId?: string): Promise<ChatResponse> {
  try {
    // UPDATE THIS PATH and payload structure
    const response = await this.client.post('/api/chat/completions', {
      model: 'gpt-3.5-turbo', // or your model name
      messages: [
        {
          role: 'user',
          content: message,
        }
      ],
      // Add any other required fields from your API
    });
    
    // UPDATE THIS based on your response structure
    return {
      id: response.data.id,
      message: response.data.choices[0].message.content,
      done: true,
    };
  } catch (error) {
    throw this.handleError(error);
  }
}
```

## Common Open WebUI API Patterns

### Pattern 1: OpenAI-Compatible API

If your Open WebUI uses OpenAI-compatible endpoints:

```typescript
// Login
POST /api/v1/auths/signin
Body: { email, password }
Response: { token, user }

// Chat
POST /api/chat/completions
Headers: { Authorization: Bearer <token> }
Body: {
  model: "model-name",
  messages: [{ role: "user", content: "message" }]
}
Response: {
  choices: [{ message: { content: "response" } }]
}
```

### Pattern 2: Custom API

If using a custom API:

```typescript
// Login
POST /auth/login
Body: { username, password } // or { email, password }
Response: { access_token, refresh_token }

// Chat
POST /api/v1/chat
Headers: { Authorization: Bearer <access_token> }
Body: { message: "text", conversation_id: "optional" }
Response: { reply: "text", id: "message-id" }
```

## Testing Your Configuration

After updating the code:

1. **Rebuild the extension:**
   ```bash
   npm run build
   ```

2. **Reload in Chrome:**
   - Go to `chrome://extensions/`
   - Click reload icon on your extension

3. **Test login:**
   - Click extension icon
   - Enter credentials
   - Check browser console for errors

4. **Add debug logging:**
   ```typescript
   async login(email: string, password: string): Promise<AuthResponse> {
     console.log('Attempting login to:', this.baseUrl);
     const response = await this.client.post('/api/v1/auths/signin', {
       email,
       password,
     });
     console.log('Login response:', response.data);
     // ...
   }
   ```

## Troubleshooting

### CORS Errors

If you see CORS errors in console:

**Problem:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
Your Open WebUI server needs to allow Chrome extension origins:
```
Access-Control-Allow-Origin: chrome-extension://[extension-id]
```

Or allow all (less secure):
```
Access-Control-Allow-Origin: *
```

### Authentication Errors

**401 Unauthorized:**
- Token not being sent correctly
- Check `Authorization` header format
- Verify token is stored and retrieved correctly

**400 Bad Request:**
- Request payload structure is wrong
- Compare with working request from web version
- Check required fields

### No Response Errors

**Network error / No response:**
- Base URL incorrect
- Server not accessible
- Firewall blocking requests
- Check if HTTPS is required

## API Documentation Resources

Check if your Open WebUI instance has API documentation:

- `/api/docs` - Swagger/OpenAPI docs
- `/docs` - Documentation page
- `/api` - API root (might list endpoints)

Many Open WebUI instances are based on or compatible with:
- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [Ollama API](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [LocalAI API](https://localai.io/basics/getting_started/)

## Getting Help

If you can't figure out the API structure:

1. **Share DevTools Network logs:**
   - Screenshot or export HAR file
   - Redact sensitive tokens/passwords

2. **Check Open WebUI version:**
   - Look for version info in settings
   - Different versions may have different APIs

3. **Ask your admin:**
   - If using company instance, ask for API docs
   - Request endpoint specifications

---

**Remember:** Never commit API keys, tokens, or passwords to Git!
