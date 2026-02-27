# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies (5 minutes)

```bash
cd openwebui-chrome-extension
npm install
```

### 2. Create Extension Icons (5 minutes)

Create a `public/icons/` directory and add three PNG files:

**Option A: Use Online Icon Generator**
1. Go to https://www.favicon-generator.org/
2. Upload your logo or create a simple icon
3. Download and rename to:
   - `icon16.png` (16x16)
   - `icon48.png` (48x48)
   - `icon128.png` (128x128)
4. Place in `public/icons/`

**Option B: Create Placeholder Icons**
For quick testing, create simple colored squares:
```bash
mkdir -p public/icons
# You can use ImageMagick or any image tool
convert -size 16x16 xc:#0066cc public/icons/icon16.png
convert -size 48x48 xc:#0066cc public/icons/icon48.png
convert -size 128x128 xc:#0066cc public/icons/icon128.png
```

**Option C: Use Existing Images**
If you have a logo/image, resize it to the three sizes and save as PNG.

### 3. Configure Your Open WebUI API (CRITICAL - 10 minutes)

Open `src/shared/api/client.ts` and update the API endpoints to match your Open WebUI instance.

**How to find your endpoints:**

1. Open your Open WebUI in a browser
2. Open DevTools (F12) → Network tab
3. Log in and send a test message
4. Look for API calls like:
   - POST `/api/v1/auths/signin` (login)
   - POST `/api/chat/completions` (send message)
   - GET `/api/chats` (get chats)

**Update the methods in `client.ts`:**

```typescript
// Example - update these paths to match what you see in Network tab
async login(email: string, password: string): Promise<AuthResponse> {
  const response = await this.client.post('/api/v1/auths/signin', {
    email,
    password,
  });
  // ...
}

async sendMessage(message: string, chatId?: string): Promise<ChatResponse> {
  // Update this path based on your API
  const response = await this.client.post('/api/chat/completions', {
    messages: [{ role: 'user', content: message }],
    // Add other required fields based on your API
  });
  // ...
}
```

### 4. Build the Extension (1 minute)

```bash
npm run build
```

This creates a `dist/` folder with your extension.

### 5. Load in Chrome (2 minutes)

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right)
4. Click **Load unpacked**
5. Navigate to and select the `dist` folder
6. Extension should appear in toolbar!

### 6. Test the Extension (5 minutes)

1. Click the extension icon
2. Enter your Open WebUI details:
   - Base URL: `https://your-openwebui-instance.com`
   - Email: your email
   - Password: your password
3. Click Sign In
4. Try sending a message!

## Troubleshooting First Run

### Build Errors

**Missing dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
npm run type-check
# Fix any errors shown
```

### Extension Load Errors

**"Manifest file is missing or unreadable":**
- Make sure you built first: `npm run build`
- Select the `dist` folder, not the project root

**Icons not found:**
- Verify icons exist in `public/icons/`
- Icons must be PNG format
- Check names match exactly: `icon16.png`, `icon48.png`, `icon128.png`

### Login Errors

**"No response from server":**
- Check your base URL is correct and accessible
- Verify CORS is configured on your Open WebUI server
- Check browser console for detailed errors

**"API Error: ...":**
- Your API endpoints may be different
- Follow step 3 above to find correct endpoints
- Check the Network tab in DevTools when using the web version

**CORS Error:**
Your Open WebUI server needs to allow requests from Chrome extensions:
```
Access-Control-Allow-Origin: chrome-extension://[your-extension-id]
```

### Chat Not Working

**Message sends but no response:**
- Check `src/shared/api/client.ts` sendMessage method
- Verify the response format matches what you expect
- Add console.logs to debug:
  ```typescript
  const response = await this.client.post('/api/chat', { message });
  console.log('API Response:', response.data); // Add this
  return response.data;
  ```

## Quick Debugging Commands

**View background service worker logs:**
1. Go to `chrome://extensions/`
2. Find your extension
3. Click "service worker" link
4. Console opens with background logs

**View popup logs:**
1. Right-click extension icon
2. Click "Inspect popup"
3. Console shows popup logs

**Rebuild and reload:**
```bash
npm run build && echo "Built! Now click reload in chrome://extensions"
```

## API Endpoint Checklist

Before testing, verify you've updated these in `src/shared/api/client.ts`:

- [ ] Login endpoint path
- [ ] Login request body format
- [ ] Login response token field name
- [ ] Send message endpoint path
- [ ] Send message request format
- [ ] Send message response format
- [ ] Get chats endpoint (optional for MVP)

## Next Steps After Setup

Once working:
1. Test context menu (right-click selected text)
2. Try the settings page (right-click extension → Options)
3. Test logout and re-login
4. Check if session persists after browser restart

## Getting Help

If stuck:
1. Check browser DevTools console (both popup and background)
2. Review the Network tab when using the web version
3. Compare API calls between web version and extension
4. Open an issue with console errors and API endpoint details

---

**Estimated Total Setup Time: 20-30 minutes**

Good luck! 🚀
