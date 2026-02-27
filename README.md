# Open WebUI Chrome Extension

> 🚀 **Quick Start:** Read [START_HERE.md](./START_HERE.md) to get started in 30 minutes!

A Chrome extension that embeds Open WebUI chat functionality directly into your browser, providing quick access to AI chat from any webpage.

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue?logo=google-chrome)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Manifest v3](https://img.shields.io/badge/Manifest-v3-green)

## 🌟 Features

- **📌 Quick Access**: One-click access to Open WebUI chat from browser toolbar
- **📝 Context Menu**: Right-click selected text and send directly to chat
- **🔐 Persistent Sessions**: Stay logged in across browser sessions
- **💬 Clean UI**: Responsive chat interface optimized for the extension popup
- **⚙️ Settings Page**: Configure your Open WebUI instance URL and preferences
- **🎨 Customizable**: Easy to brand with your company colors and logo

## 📸 Screenshots

[Extension Popup] → [Login Screen] → [Chat Interface] → [Settings Page]

*Screenshots coming soon - extension is ready to use!*

## 🎯 Quick Start

### ⚡ 5-Minute Setup

```bash
# 1. Clone and install
git clone https://github.com/chad-atexpedient/openwebui-chrome-extension.git
cd openwebui-chrome-extension
npm install

# 2. Create icons (open in browser)
open create-icons.html

# 3. Configure API (see API_CONFIGURATION.md)
# Edit src/shared/api/client.ts with your endpoints

# 4. Build
npm run build

# 5. Load in Chrome
# chrome://extensions/ → Enable Developer mode → Load unpacked → Select dist/
```

📖 **Full Setup Guide:** [START_HERE.md](./START_HERE.md)

## 📋 Prerequisites

- Node.js 16+ ([Download](https://nodejs.org/))
- Chrome or Edge browser
- Access to an Open WebUI instance
- Your Open WebUI login credentials

## 🏗️ Project Structure

```
openwebui-chrome-extension/
├── src/
│   ├── background/          # Service worker for API calls
│   │   └── service-worker.ts
│   ├── popup/               # Main chat UI (React)
│   │   ├── popup.html
│   │   ├── App.tsx
│   │   └── components/
│   │       ├── Login.tsx
│   │       └── Chat.tsx
│   ├── options/             # Settings page
│   │   ├── options.html
│   │   └── options.ts
│   └── shared/              # Shared utilities
│       ├── api/             # API client
│       ├── storage/         # Chrome storage helpers
│       └── types/           # TypeScript types
├── public/
│   ├── manifest.json        # Extension configuration
│   └── icons/               # Extension icons (you create)
├── dist/                    # Build output (generated)
└── docs/                    # Documentation
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[START_HERE.md](./START_HERE.md)** | 🎯 **Start here!** Quick setup in 30 minutes |
| [NEXT_STEPS.md](./NEXT_STEPS.md) | Detailed step-by-step setup guide |
| [API_CONFIGURATION.md](./API_CONFIGURATION.md) | How to configure your Open WebUI API |
| [DEBUGGING.md](./DEBUGGING.md) | Troubleshooting and debugging guide |
| [SETUP.md](./SETUP.md) | Complete setup reference |
| [create-icons.md](./create-icons.md) | Icon creation options and tips |

## 🔑 Important: API Configuration

**⚠️ CRITICAL STEP:** Before the extension will work, you must configure your Open WebUI API endpoints.

The extension includes placeholder API endpoints that **must** be updated to match your Open WebUI instance.

**Follow these steps:**
1. Open your Open WebUI in a browser
2. Open DevTools (F12) → Network tab
3. Log in and send a test message
4. Note the API endpoint URLs
5. Update `src/shared/api/client.ts` with your endpoints

📖 **Detailed instructions:** [API_CONFIGURATION.md](./API_CONFIGURATION.md)

## 🛠️ Development

### Build Commands

```bash
# Development build with watch mode
npm run dev

# Production build
npm run build

# Type check without building
npm run type-check

# Lint code
npm run lint
```

### Development Workflow

1. Make changes in `src/`
2. Run `npm run build` (or `npm run dev` for auto-rebuild)
3. Go to `chrome://extensions/`
4. Click reload icon on your extension
5. Test your changes

### Debugging

**View extension logs:**
- **Popup console**: Right-click extension icon → "Inspect popup"
- **Background console**: `chrome://extensions/` → Click "service worker"

📖 **Full debugging guide:** [DEBUGGING.md](./DEBUGGING.md)

## 🎨 Customization

### Change Colors

Edit `src/popup/popup.css`:
```css
.btn-primary {
  background: #YOUR-BRAND-COLOR;
}

.message-user {
  background: #YOUR-BRAND-COLOR;
}
```

### Update Extension Name

Edit `public/manifest.json`:
```json
{
  "name": "Your Company AI Chat",
  "description": "Your custom description"
}
```

### Add Features

Common enhancements:
- Streaming responses (WebSocket support)
- Chat history management
- Multiple conversations
- Markdown rendering with syntax highlighting
- Dark mode
- Keyboard shortcuts
- Export conversations

## 🧪 Testing

### Manual Testing Checklist

- [ ] Extension loads without errors
- [ ] Icons display correctly
- [ ] Login form appears
- [ ] Can log in successfully
- [ ] Can send messages
- [ ] Receive responses
- [ ] Right-click menu works
- [ ] Settings page accessible
- [ ] Logout works
- [ ] Session persists after browser restart

### Common Issues

**Login fails:**
- Check base URL is correct
- Verify API endpoints in `client.ts`
- Check browser console for errors

**CORS errors:**
- Use background service worker (already implemented)
- Or configure server CORS headers

**No response:**
- Verify API endpoint paths
- Check Network tab for failed requests
- Review API response structure

📖 **Troubleshooting:** [DEBUGGING.md](./DEBUGGING.md)

## 🚀 Deployment

### Local Installation (Development)

1. Build: `npm run build`
2. Load unpacked in Chrome: `chrome://extensions/`

### Team Distribution

**Option 1: Direct Distribution**
1. Build the extension: `npm run build`
2. Zip the `dist` folder
3. Share with team members
4. They load as unpacked extension

**Option 2: Chrome Web Store**
1. Create developer account ($5 one-time fee)
2. Prepare store listing (screenshots, description)
3. Package extension as .zip
4. Submit for review
5. Publish to store

**Option 3: Enterprise Deployment**
1. Use Chrome Enterprise policies
2. Force-install extension across organization
3. Pre-configure settings via managed storage

## 🔒 Security

- ✅ Authentication tokens encrypted in Chrome storage
- ✅ HTTPS-only communication
- ✅ No sensitive data in logs
- ✅ No data sent to third parties
- ✅ Follows Chrome Extension security best practices
- ✅ Manifest v3 compliant

**Security best practices:**
- Never commit API keys or tokens to Git
- Use environment variables for sensitive config
- Regularly update dependencies
- Review permissions in manifest.json
- Enable Content Security Policy

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add TypeScript types for new code
- Update documentation for new features
- Test thoroughly before submitting

## 🛣️ Roadmap

### v1.0 (Current)
- [x] Basic authentication
- [x] Chat interface
- [x] Context menu integration
- [x] Settings page
- [x] Session persistence

### v1.1 (Planned)
- [ ] Streaming responses
- [ ] Chat history management
- [ ] Multiple conversation support
- [ ] Markdown rendering
- [ ] Code syntax highlighting

### v1.2 (Future)
- [ ] Dark mode
- [ ] Keyboard shortcuts
- [ ] Export conversations
- [ ] Custom prompts/templates
- [ ] Voice input support

## 📊 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: CSS3 (custom)
- **Chrome APIs**: Storage, Runtime, ContextMenus

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

**Need help?**
1. Check [START_HERE.md](./START_HERE.md) for quick start
2. Review [DEBUGGING.md](./DEBUGGING.md) for troubleshooting
3. Read [API_CONFIGURATION.md](./API_CONFIGURATION.md) for API setup
4. Open a GitHub issue with details

**When reporting issues, include:**
- Error messages (screenshots)
- Console logs (popup and background)
- Steps to reproduce
- Your Open WebUI version
- Chrome version

## 🙏 Acknowledgments

- Built for use with [Open WebUI](https://github.com/open-webui/open-webui)
- Chrome Extension Manifest v3 architecture
- React and TypeScript communities

## 📞 Contact

- **Repository**: [github.com/chad-atexpedient/openwebui-chrome-extension](https://github.com/chad-atexpedient/openwebui-chrome-extension)
- **Issues**: [GitHub Issues](https://github.com/chad-atexpedient/openwebui-chrome-extension/issues)

---

**Ready to get started?** 🚀

👉 Read [START_HERE.md](./START_HERE.md) to build your extension in 30 minutes!

---

Made with ❤️ for seamless AI chat access
