# 🎯 Next Steps - Getting Started

Your Chrome extension project is now set up! Follow these steps to get it running.

## ✅ Immediate Actions (Do These First)

### 1. Clone and Install (5 minutes)

```bash
# If you haven't cloned yet
git clone https://github.com/chad-atexpedient/openwebui-chrome-extension.git
cd openwebui-chrome-extension

# Install dependencies
npm install
```

### 2. Create Icons (5 minutes)

**Quick method - Create simple text-based icons:**

Save this as `create-icons.html` in your project root:

```html
<!DOCTYPE html>
<html>
<body>
<canvas id="canvas"></canvas>
<script>
const sizes = [16, 48, 128];
const letter = 'W'; // Change to your preferred letter
const bgColor = '#0066cc'; // Change to your brand color

sizes.forEach(size => {
  const canvas = document.getElementById('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);
  
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.5}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, size/2, size/2);
  
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `icon${size}.png`;
    a.click();
  });
});
</script>
</body>
</html>
```

Then:
1. Open `create-icons.html` in your browser
2. Three icons will download automatically
3. Create `public/icons/` folder: `mkdir -p public/icons`
4. Move the downloaded icons to `public/icons/`

### 3. Configure API Endpoints (15 minutes) ⚠️ CRITICAL

This is the **most important step**. The extension won't work without proper API configuration.

**Follow these steps:**

1. **Open your Open WebUI in a browser**
2. **Open DevTools** (F12 or Ctrl+Shift+I)
3. **Go to Network tab**
4. **Clear the network log** (🚫 button)
5. **Log in to Open WebUI**
6. **Find the login request** - look for POST request containing "auth" or "signin"
7. **Click on it and note:**
   - Request URL (the path after your domain)
   - Request payload structure
   - Response structure (where is the token?)

8. **Send a test message in Open WebUI**
9. **Find the chat request** - look for POST request when message is sent
10. **Click on it and note:**
    - Request URL
    - Request payload structure
    - Response structure

**Now update the code:**

Open `src/shared/api/client.ts` and update:

```typescript
// Line ~33 - Update login endpoint
async login(email: string, password: string): Promise<AuthResponse> {
  const response = await this.client.post('/YOUR/LOGIN/ENDPOINT', {
    // Update field names if needed
    email,
    password,
  });
  
  // Update if your token has different field name
  const token = response.data.token; // or .access_token, etc.
  // ...
}

// Line ~52 - Update chat endpoint
async sendMessage(message: string, chatId?: string): Promise<ChatResponse> {
  const response = await this.client.post('/YOUR/CHAT/ENDPOINT', {
    // Update structure based on what you saw in DevTools
    message,
    chat_id: chatId,
  });
  
  // Update based on response structure
  return {
    id: response.data.id,
    message: response.data.YOUR_MESSAGE_FIELD, // Update this
    done: true,
  };
}
```

📖 **Need help?** Read `API_CONFIGURATION.md` for detailed instructions.

### 4. Build the Extension (1 minute)

```bash
npm run build
```

This creates a `dist/` folder with your compiled extension.

### 5. Load in Chrome (2 minutes)

1. Open Chrome
2. Navigate to: `chrome://extensions/`
3. Enable **"Developer mode"** (toggle in top-right corner)
4. Click **"Load unpacked"**
5. Select the `dist` folder from your project
6. ✅ Extension should appear in your toolbar!

### 6. Test It! (5 minutes)

1. **Click the extension icon** in your toolbar
2. **Enter your Open WebUI details:**
   - Base URL: `https://your-openwebui-instance.com`
   - Email: your email
   - Password: your password
3. **Click "Sign In"**
4. **If login succeeds:** You'll see the chat interface!
5. **Send a test message**

## 🐛 If Something Doesn't Work

### Build Fails

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Extension Won't Load

- Make sure you selected the `dist` folder, not the project root
- Check for errors in the terminal when building
- Look at Chrome's error message (click "Errors" in chrome://extensions/)

### Login Fails

**Check the console:**
1. Right-click extension icon → "Inspect popup"
2. Console tab shows errors
3. Look for the actual error message

**Common issues:**
- ❌ Base URL incorrect (missing https://, wrong domain)
- ❌ API endpoint paths wrong (need to update client.ts)
- ❌ CORS error (server needs to allow Chrome extension)
- ❌ Wrong credentials

**Debug the API:**
```typescript
// Add to client.ts login method:
console.log('Login URL:', this.baseUrl + '/api/v1/auths/signin');
console.log('Response:', response.data);
```

### Message Sends But No Response

- API endpoint for chat is likely wrong
- Check response structure doesn't match
- Add console.log to see what API returns:

```typescript
async sendMessage(message: string, chatId?: string): Promise<ChatResponse> {
  const response = await this.client.post('/api/chat', { message });
  console.log('Chat API Response:', response.data); // ADD THIS
  // ...
}
```

## 📚 Documentation

- **SETUP.md** - Detailed setup guide with troubleshooting
- **API_CONFIGURATION.md** - How to configure API endpoints
- **create-icons.md** - Icon creation options
- **README.md** - Full project documentation

## 🎨 Customization Ideas

Once it's working, you can:

1. **Change colors** - Edit `src/popup/popup.css`
2. **Add features** - Like chat history, multiple conversations
3. **Improve UI** - Add markdown rendering, code highlighting
4. **Add shortcuts** - Keyboard shortcuts in manifest.json
5. **Theme support** - Dark mode toggle

## 🔄 Development Workflow

**Making changes:**

1. Edit code in `src/`
2. Run `npm run build`
3. Go to `chrome://extensions/`
4. Click reload icon on your extension
5. Test the changes

**For faster development:**
```bash
npm run dev
# Watches for changes and rebuilds automatically
# Still need to manually reload extension in Chrome
```

## ✨ Quick Wins

After basic setup works, try these quick improvements:

### Add Your Company Branding

Update colors in `src/popup/popup.css`:
```css
.btn-primary {
  background: #YOUR-BRAND-COLOR;
}

.message-user {
  background: #YOUR-BRAND-COLOR;
}
```

### Add Better Error Messages

In `src/popup/components/Login.tsx` and `Chat.tsx`, improve error handling:
```typescript
} catch (err) {
  const errorMsg = err instanceof Error ? err.message : 'Unknown error';
  setError(`Login failed: ${errorMsg}. Check console for details.`);
  console.error('Full error:', err);
}
```

### Add Loading Indicators

Already implemented, but you can customize the "Thinking..." message in `Chat.tsx`

## 🚀 Publishing (Optional - Later)

Once stable, you can publish to Chrome Web Store:

1. Create a developer account ($5 one-time fee)
2. Prepare store listing (screenshots, description)
3. Submit for review
4. Or: Share the `dist` folder directly with team members

## 💡 Pro Tips

1. **Keep DevTools open** while developing - catches errors immediately
2. **Test in incognito** - Ensures no cache issues
3. **Use meaningful commit messages** - Track what you changed
4. **Create a test account** - Don't use production account while testing
5. **Start simple** - Get basic chat working before adding features

## 📞 Getting Help

**If you're stuck:**

1. Check the console (both popup and background service worker)
2. Review `SETUP.md` troubleshooting section
3. Read `API_CONFIGURATION.md` for API issues
4. Open a GitHub issue with:
   - What you tried
   - Error messages (screenshots)
   - Console logs
   - API endpoint structure

## ✅ Success Checklist

- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Icons created in `public/icons/`
- [ ] API endpoints configured in `src/shared/api/client.ts`
- [ ] Built successfully (`npm run build`)
- [ ] Loaded in Chrome
- [ ] Can see login screen
- [ ] Login works
- [ ] Can send a message
- [ ] Receive a response

---

**Ready to start? Begin with step 1 above! 🎉**

**Estimated time to working extension: 30-45 minutes**
