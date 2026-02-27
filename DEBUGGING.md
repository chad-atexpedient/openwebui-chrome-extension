# 🐛 Debugging Guide

Quick reference for debugging the Chrome extension.

## How to Access Logs

### Background Service Worker Logs

The background script handles all API communication.

**Access:**
1. Go to `chrome://extensions/`
2. Find "Open WebUI Chat"
3. Click the blue **"service worker"** link
4. DevTools opens showing background script logs

**What you'll see:**
- API requests and responses
- Authentication events
- Message handling
- Errors from API calls

### Popup Logs

The popup is the UI you see when clicking the extension icon.

**Access:**
1. Click the extension icon to open popup
2. Right-click anywhere in the popup
3. Select **"Inspect"** or **"Inspect element"**
4. DevTools opens showing popup logs

**What you'll see:**
- UI component renders
- Form submissions
- User interactions
- Frontend errors

### Both at Once

**Pro tip:** Keep both DevTools windows open side-by-side:
- Left: Background service worker console
- Right: Popup inspector console
- See the complete flow of a request

## Common Error Messages & Solutions

### "Not authenticated. Please log in first."

**Cause:** Auth token is missing or expired

**Debug:**
```javascript
// In popup console:
chrome.storage.local.get(['authToken'], (result) => {
  console.log('Current token:', result.authToken);
});
```

**Fix:**
- Log in again
- Check if login is storing token correctly
- Verify token isn't expiring immediately

### "No response from server"

**Cause:** Can't reach the API endpoint

**Debug:**
1. Check Network tab in popup DevTools
2. Look for failed requests (red)
3. Click on the request to see details

**Common issues:**
- Wrong base URL (typo, http vs https)
- CORS blocking (see CORS section below)
- Server is down or unreachable
- VPN/firewall blocking

**Fix:**
```javascript
// Test if URL is reachable:
fetch('https://your-openwebui.com/api/health')
  .then(r => console.log('Server reachable:', r.status))
  .catch(e => console.error('Cannot reach server:', e));
```

### CORS Error

**Error message:**
```
Access to XMLHttpRequest at 'https://...' from origin 'chrome-extension://...'
has been blocked by CORS policy
```

**Cause:** Server not configured to allow Chrome extension requests

**Short-term fix:** Use background service worker (already implemented)

**Long-term fix:** Configure your Open WebUI server to allow requests:
```
Access-Control-Allow-Origin: chrome-extension://[your-extension-id]
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

**Find your extension ID:**
1. Go to `chrome://extensions/`
2. Look under extension name for ID like: `abcdefghijklmnopqrstuvwxyz123456`

### "API Error: [various messages]"

**Cause:** API returned an error response

**Debug:**
```typescript
// Add to client.ts handleError method:
private handleError(error: unknown): Error {
  console.error('Full API error:', error);
  if (axios.isAxiosError(error)) {
    console.error('Response data:', error.response?.data);
    console.error('Response status:', error.response?.status);
    console.error('Request config:', error.config);
  }
  // ... rest of method
}
```

**Common API errors:**
- 400: Bad request (wrong payload structure)
- 401: Unauthorized (token invalid/expired)
- 403: Forbidden (lack permissions)
- 404: Not found (wrong endpoint URL)
- 500: Server error (backend issue)

### Extension Won't Load

**Error:** "Manifest file is missing or unreadable"

**Cause:** Not selecting the right folder or build failed

**Fix:**
```bash
# Rebuild
npm run build

# Verify dist folder exists
ls dist/

# Should see: manifest.json, icons/, background/, assets/, etc.
```

**Error:** "Failed to load extension"

**Cause:** Errors in manifest.json or missing files

**Debug:**
1. Click "Errors" button in chrome://extensions/
2. Read the specific error message
3. Check if all icon files exist: `ls public/icons/`

## Debugging Techniques

### Add Console Logs

**In API client** (`src/shared/api/client.ts`):
```typescript
async login(email: string, password: string): Promise<AuthResponse> {
  console.log('🔐 LOGIN ATTEMPT');
  console.log('Base URL:', this.baseUrl);
  console.log('Endpoint:', '/api/v1/auths/signin');
  
  try {
    const response = await this.client.post('/api/v1/auths/signin', {
      email,
      password,
    });
    
    console.log('✅ LOGIN SUCCESS');
    console.log('Response:', response.data);
    console.log('Token:', response.data.token?.substring(0, 20) + '...');
    
    // ... rest of method
  } catch (error) {
    console.error('❌ LOGIN FAILED');
    console.error(error);
    throw this.handleError(error);
  }
}
```

**In components** (`src/popup/components/Chat.tsx`):
```typescript
const handleSendMessage = async (e: FormEvent) => {
  console.log('📤 SENDING MESSAGE');
  console.log('Message:', inputValue);
  
  // ... existing code
  
  try {
    const response = await chrome.runtime.sendMessage(message);
    console.log('📥 RECEIVED RESPONSE');
    console.log('Response:', response);
    
    // ... rest of method
  } catch (error) {
    console.error('❌ MESSAGE FAILED');
    console.error(error);
  }
}
```

### Test API Directly

**In browser console (on your OpenWebUI site):**
```javascript
// Test login
fetch('https://your-openwebui.com/api/v1/auths/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'your@email.com',
    password: 'yourpassword'
  })
})
.then(r => r.json())
.then(data => console.log('Login response:', data))
.catch(e => console.error('Login error:', e));

// Test chat (replace TOKEN with actual token)
fetch('https://your-openwebui.com/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer TOKEN'
  },
  body: JSON.stringify({
    message: 'Hello!'
  })
})
.then(r => r.json())
.then(data => console.log('Chat response:', data))
.catch(e => console.error('Chat error:', e));
```

### Check Storage

**See what's stored:**
```javascript
// In any console (popup or background):
chrome.storage.local.get(null, (items) => {
  console.log('All stored data:', items);
});

// Check specific items:
chrome.storage.local.get(['authToken', 'config'], (items) => {
  console.log('Auth token:', items.authToken);
  console.log('Config:', items.config);
});
```

**Clear storage:**
```javascript
chrome.storage.local.clear(() => {
  console.log('Storage cleared');
});
```

### Network Monitoring

**In popup DevTools → Network tab:**
1. Open DevTools for popup
2. Go to Network tab
3. Check "Preserve log"
4. Perform action (login, send message)
5. Look for requests:
   - Red = failed
   - Green/black = success
6. Click on request to see:
   - Headers (including Authorization)
   - Payload (what was sent)
   - Response (what was received)
   - Timing

### Check Extension Permissions

**Verify manifest permissions:**
```javascript
// In popup console:
chrome.permissions.getAll((permissions) => {
  console.log('Granted permissions:', permissions);
});
```

Should include:
- `storage`
- `activeTab`
- `contextMenus`

## Debugging Workflow

### 1. Reproduce the Issue
- What action triggers it?
- Does it happen every time?
- What's the exact error message?

### 2. Check Console Logs
- Background service worker console
- Popup console
- Any errors shown?

### 3. Verify Network Requests
- Network tab in DevTools
- Are requests being made?
- What's the response status?
- What data is being sent/received?

### 4. Check Storage
- Is auth token stored?
- Is config correct?

### 5. Test API Directly
- Use browser fetch or Postman
- Verify endpoints work outside extension
- Confirm request/response format

### 6. Add Debug Logs
- Console.log at each step
- Log request payloads
- Log response data
- Log error details

### 7. Isolate the Problem
- Does login work? (Test auth separately)
- Does API work? (Test outside extension)
- Is it a UI issue? (Check React console errors)
- Is it CORS? (Check for CORS errors)

## Testing Checklist

Before reporting an issue, verify:

- [ ] Extension is loaded (`chrome://extensions/`)
- [ ] No errors shown in extension list
- [ ] Icons are present (`ls public/icons/`)
- [ ] Built successfully (`npm run build`)
- [ ] Base URL is correct (check for typos)
- [ ] Base URL is accessible in browser
- [ ] Credentials are correct (test in web UI)
- [ ] API endpoints are updated in `client.ts`
- [ ] Console shows no errors before action
- [ ] DevTools Network tab monitored during action

## Quick Fixes

### Rebuild and Reload
```bash
npm run build
# Then: chrome://extensions/ → click reload icon
```

### Clear Everything and Start Fresh
```bash
# Clear built files
rm -rf dist/

# Clear dependencies
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Rebuild
npm run build

# In browser console:
chrome.storage.local.clear();
```

Then reload extension and try again.

### Reset Extension State
```javascript
// In popup console:
chrome.storage.local.clear(() => {
  console.log('Storage cleared - now reload extension');
});
```

## Advanced Debugging

### Enable Verbose Logging

Create `src/shared/config.ts`:
```typescript
export const DEBUG = true;

export function log(...args: any[]) {
  if (DEBUG) {
    console.log('[OpenWebUI]', ...args);
  }
}

export function error(...args: any[]) {
  console.error('[OpenWebUI]', ...args);
}
```

Use throughout code:
```typescript
import { log, error } from '@/shared/config';

log('Sending message:', message);
error('Failed to send:', err);
```

### Monitor Extension Lifecycle

Add to `src/background/service-worker.ts`:
```typescript
console.log('🚀 Background service worker started');

chrome.runtime.onInstalled.addListener((details) => {
  console.log('📦 Extension installed/updated:', details.reason);
});

chrome.runtime.onSuspend.addListener(() => {
  console.log('💤 Service worker suspending');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('🌅 Browser startup');
});
```

### Performance Monitoring

```typescript
const start = performance.now();

// ... do work ...

const end = performance.now();
console.log(`Operation took ${end - start}ms`);
```

## Getting Help

When asking for help, provide:

1. **Console errors** (both popup and background)
2. **Network tab** screenshots showing failed requests
3. **Code changes** you made to `client.ts`
4. **API structure** from DevTools (redact tokens)
5. **Extension version** and Chrome version
6. **Steps to reproduce**

**Share logs:**
```javascript
// Gather debug info:
const debugInfo = {
  hasToken: !!(await chrome.storage.local.get(['authToken'])).authToken,
  config: (await chrome.storage.local.get(['config'])).config,
  chromeVersion: navigator.userAgent,
  extensionVersion: chrome.runtime.getManifest().version
};
console.log('Debug Info:', JSON.stringify(debugInfo, null, 2));
```

Copy and share this output (remove sensitive data first!).
