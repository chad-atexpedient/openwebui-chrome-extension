# Open WebUI Chrome Extension

A Chrome extension that embeds Open WebUI chat functionality directly into your browser, providing quick access to AI chat from any webpage.

## 🚀 Features

- **Quick Access**: One-click access to Open WebUI chat from browser toolbar
- **Context Menu**: Right-click selected text and send directly to chat
- **Persistent Sessions**: Stay logged in across browser sessions
- **Clean UI**: Responsive chat interface optimized for the extension popup
- **Settings Page**: Configure your Open WebUI instance URL and preferences

## 📋 Prerequisites

- Node.js (v16 or higher)
- Chrome or Edge browser
- Access to an Open WebUI instance with API access

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/chad-atexpedient/openwebui-chrome-extension.git
cd openwebui-chrome-extension
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Extension Icons

You need to create three icon sizes. Place them in the `public/icons/` directory:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

You can create these using any image editor or generate them online. For now, you can use placeholder icons.

### 4. Build the Extension

```bash
npm run build
```

This will create a `dist` folder with the compiled extension.

### 5. Load in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `dist` folder from this project
5. The extension icon should appear in your toolbar!

## 🔧 Development Mode

For development with hot reload:

```bash
npm run dev
```

Then load the `dist` folder in Chrome as described above. The extension will rebuild automatically when you make changes.

## 📖 Usage

### First Time Setup

1. Click the extension icon in your toolbar
2. Enter your Open WebUI instance details:
   - **Base URL**: Your Open WebUI instance URL (e.g., `https://your-instance.com`)
   - **Email**: Your login email
   - **Password**: Your password
3. Click "Sign In"

### Chatting

Once logged in:
- Type your message in the input box
- Press Enter or click "Send"
- Messages appear in the chat window
- Click "Logout" to sign out

### Using Context Menu

1. Select any text on a webpage
2. Right-click and choose "Send to Open WebUI"
3. The extension opens with the selected text ready to send

### Settings

Click "Options" in the extension details page (`chrome://extensions/`) to:
- Update your Open WebUI base URL
- Change theme preferences
- Configure other settings

## 🏗️ Project Structure

```
openwebui-chrome-extension/
├── src/
│   ├── background/           # Service worker for API calls
│   │   └── service-worker.ts
│   ├── popup/                # Main chat UI
│   │   ├── popup.html
│   │   ├── popup.tsx
│   │   ├── popup.css
│   │   ├── App.tsx
│   │   └── components/
│   │       ├── Login.tsx
│   │       └── Chat.tsx
│   ├── options/              # Settings page
│   │   ├── options.html
│   │   └── options.ts
│   └── shared/               # Shared utilities
│       ├── api/              # API client
│       ├── storage/          # Chrome storage helpers
│       └── types/            # TypeScript types
├── public/
│   ├── manifest.json         # Extension configuration
│   └── icons/                # Extension icons
├── dist/                     # Build output (generated)
└── package.json
```

## 🔑 Important Notes

### API Configuration

**⚠️ CRITICAL**: The API client in `src/shared/api/client.ts` contains placeholder endpoint paths. You **MUST** update these to match your actual Open WebUI API:

```typescript
// Current placeholders - UPDATE THESE:
async login(email: string, password: string): Promise<AuthResponse> {
  const response = await this.client.post('/api/v1/auths/signin', { // ← Update this path
    email,
    password,
  });
  // ...
}

async sendMessage(message: string, chatId?: string): Promise<ChatResponse> {
  const response = await this.client.post('/api/chat', { // ← Update this path
    message,
    chat_id: chatId,
  });
  // ...
}
```

### Finding Your API Endpoints

1. Open your Open WebUI instance in a browser
2. Open DevTools (F12) → Network tab
3. Perform actions (login, send message, etc.)
4. Look at the API requests to see the actual endpoint paths
5. Update the paths in `client.ts` accordingly

### CORS Configuration

If you encounter CORS errors:

1. Your Open WebUI instance needs to allow requests from `chrome-extension://`
2. Add appropriate CORS headers on your server
3. Or use the background service worker (already implemented) to bypass some restrictions

## 🐛 Debugging

### View Extension Logs

1. Go to `chrome://extensions/`
2. Find "Open WebUI Chat"
3. Click "service worker" (or "background page") to open DevTools
4. Check console for background script logs

### View Popup Logs

1. Right-click the extension icon
2. Select "Inspect popup"
3. Check console for popup script logs

### Common Issues

**"Not authenticated" error:**
- Check if your base URL is correct
- Verify your credentials
- Check browser console for detailed error messages

**"No response from server":**
- Verify your Open WebUI instance is accessible
- Check network connectivity
- Ensure API endpoints are correct

**Extension doesn't load:**
- Check for build errors: `npm run build`
- Verify all dependencies installed: `npm install`
- Check Chrome console for errors

## 📝 Scripts

- `npm run dev` - Development build with watch mode
- `npm run build` - Production build
- `npm run type-check` - Type check without building
- `npm run lint` - Run ESLint

## 🔐 Security

- Authentication tokens are stored securely in Chrome's local storage
- Tokens are never exposed in logs
- HTTPS-only communication with your Open WebUI instance
- No data is sent to third parties

## 🛣️ Roadmap

- [ ] Update API endpoints to match actual Open WebUI API
- [ ] Add chat history management
- [ ] Support for multiple conversations
- [ ] Markdown rendering for messages
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Export chat history
- [ ] Streaming responses support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

If you encounter issues:
1. Check the debugging section above
2. Review your API endpoint configuration
3. Open an issue on GitHub with details

---

**Next Steps:**
1. Install dependencies: `npm install`
2. Create extension icons in `public/icons/`
3. Update API endpoints in `src/shared/api/client.ts`
4. Build and test: `npm run build`
5. Load in Chrome and start chatting! 🎉
