# 🚀 START HERE - Quick Start Guide

Welcome to the Open WebUI Chrome Extension! This guide will get you from zero to a working extension in **30 minutes**.

## 📋 What You'll Build

A Chrome extension that:
- ✅ Embeds Open WebUI chat in your browser
- ✅ One-click access from any webpage
- ✅ Right-click menu to send selected text to chat
- ✅ Persistent login across sessions
- ✅ Clean, responsive chat interface

## 🎯 Before You Start

Make sure you have:
- ✅ Node.js installed (check: `node --version`)
- ✅ Chrome browser
- ✅ Access to your company's Open WebUI instance
- ✅ Your Open WebUI login credentials

## ⚡ Quick Start (Follow These Steps)

### Step 1: Clone & Install (3 minutes)

```bash
# Clone the repository
git clone https://github.com/chad-atexpedient/openwebui-chrome-extension.git
cd openwebui-chrome-extension

# Install dependencies
npm install
```

### Step 2: Create Icons (5 minutes)

**Easiest method:**

1. **Open** `create-icons.html` in your browser (double-click the file)
2. **Customize** the icon:
   - Choose icon type (Letter, Circle, or Square)
   - Set your text (like "W" for WebUI)
   - Pick your brand colors
3. **Click** "Generate & Download Icons"
4. **Create** the icons folder:
   ```bash
   mkdir -p public/icons
   ```
5. **Move** the three downloaded PNG files to `public/icons/`

**Verify:**
```bash
ls public/icons/
# Should show: icon16.png  icon48.png  icon128.png
```

### Step 3: Configure API Endpoints (15 minutes) ⚠️ CRITICAL STEP

This is **the most important step**. Without this, the extension won't work.

**📖 Follow the detailed guide:** [API_CONFIGURATION.md](./API_CONFIGURATION.md)

**Quick version:**

1. Open your Open WebUI in Chrome
2. Open DevTools (F12) → Network tab
3. Log in and send a test message
4. Find the API requests (look for POST requests)
5. Note the endpoint URLs and structure
6. Update `src/shared/api/client.ts` with your endpoints

**Example endpoints to look for:**
- Login: `/api/v1/auths/signin` or `/api/auth/login`
- Chat: `/api/chat/completions` or `/api/chat`

### Step 4: Build & Load (5 minutes)

```bash
# Build the extension
npm run build

# Verify build succeeded
ls dist/
# Should show: manifest.json, icons/, background/, assets/, etc.
```

**Load in Chrome:**
1. Open Chrome
2. Go to: `chrome://extensions/`
3. Turn on **"Developer mode"** (top-right toggle)
4. Click **"Load unpacked"**
5. Select the `dist` folder
6. ✅ Done! Extension appears in toolbar

### Step 5: Test It! (2 minutes)

1. **Click** the extension icon in your toolbar
2. **Enter** your details:
   - Base URL: `https://your-openwebui-instance.com`
   - Email: your email
   - Password: your password
3. **Click** "Sign In"
4. **Send** a test message!

## 🎉 Success Checklist

If everything worked, you should be able to:
- [x] Click extension icon and see login screen
- [x] Log in successfully
- [x] See the chat interface
- [x] Send a message
- [x] Receive a response
- [x] Right-click selected text → "Send to Open WebUI"

## 🐛 Something Not Working?

### Build Failed
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Can't Load Extension
- Make sure you selected the `dist` folder
- Check for errors in `chrome://extensions/`
- Verify icons exist: `ls public/icons/`

### Login Fails
1. **Check the console:**
   - Right-click extension icon → "Inspect popup"
   - Look for error messages
   
2. **Verify your base URL:**
   - Include `https://`
   - No trailing slash
   - Test it opens in browser

3. **Check API configuration:**
   - Did you update `src/shared/api/client.ts`?
   - Do the endpoint paths match what you saw in Network tab?

**📖 Full troubleshooting guide:** [DEBUGGING.md](./DEBUGGING.md)

## 📚 Documentation

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **[NEXT_STEPS.md](./NEXT_STEPS.md)** | Detailed setup guide | First time setup |
| **[API_CONFIGURATION.md](./API_CONFIGURATION.md)** | Configure API endpoints | Before building |
| **[DEBUGGING.md](./DEBUGGING.md)** | Fix problems | When something breaks |
| **[SETUP.md](./SETUP.md)** | Complete setup reference | Comprehensive guide |
| **[create-icons.md](./create-icons.md)** | Icon creation options | Making icons |
| **[README.md](./README.md)** | Project overview | General info |

## 🔧 Development Commands

```bash
# Build for production
npm run build

# Development mode (auto-rebuild on changes)
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
```

## 💡 Quick Tips

1. **Keep DevTools open** while testing - catches errors immediately
2. **Reload extension** after each build:
   - Go to `chrome://extensions/`
   - Click reload icon on your extension
3. **Check both consoles:**
   - Popup console (right-click extension icon → Inspect)
   - Background console (chrome://extensions/ → "service worker")

## 🎨 Customization

Once it's working, customize it:

### Change Colors
Edit `src/popup/popup.css`:
```css
.btn-primary {
  background: #YOUR-COLOR; /* Change this */
}
```

### Add Features
- Chat history management
- Multiple conversations
- Markdown rendering
- Dark mode
- Keyboard shortcuts

See the project structure in [README.md](./README.md) for where to add code.

## 🆘 Getting Help

**If you're stuck:**

1. ✅ Read [DEBUGGING.md](./DEBUGGING.md)
2. ✅ Check console for errors (both popup and background)
3. ✅ Verify API endpoints in Network tab
4. ✅ Review [API_CONFIGURATION.md](./API_CONFIGURATION.md)

**Still stuck?** Open a GitHub issue with:
- Error messages (screenshots)
- Console logs
- What you've tried
- Your API endpoint structure

## 📊 Project Structure

```
openwebui-chrome-extension/
├── src/
│   ├── background/          # API communication
│   ├── popup/               # UI components
│   ├── options/             # Settings page
│   └── shared/              # Utilities & types
├── public/
│   ├── manifest.json        # Extension config
│   └── icons/               # Extension icons (you create these)
├── dist/                    # Built extension (generated)
└── Documentation files      # Guides and references
```

## 🚦 Current Status

**What's Built:**
- ✅ Complete extension structure
- ✅ Authentication flow
- ✅ Chat interface
- ✅ Settings page
- ✅ Context menu integration
- ✅ Background service worker
- ✅ Storage management

**What You Need to Do:**
- ⚠️ Create extension icons (Step 2)
- ⚠️ Configure API endpoints (Step 3)
- ⚠️ Build and test (Steps 4-5)

## ⏱️ Timeline

| Task | Time | Status |
|------|------|--------|
| Clone & Install | 3 min | ⬜ |
| Create Icons | 5 min | ⬜ |
| Configure API | 15 min | ⬜ |
| Build & Load | 5 min | ⬜ |
| Test & Debug | 2-10 min | ⬜ |
| **Total** | **30-40 min** | |

## 🎯 Next Steps After Setup

1. **Test all features:**
   - Login/logout
   - Send messages
   - Right-click menu
   - Settings page

2. **Customize branding:**
   - Update colors
   - Change extension name
   - Add company logo

3. **Add enhancements:**
   - Streaming responses
   - Chat history
   - Markdown formatting
   - Keyboard shortcuts

4. **Deploy to team:**
   - Share the `dist` folder
   - Or publish to Chrome Web Store
   - Document any custom configuration

## 🔒 Security Notes

- ✅ Tokens stored securely in Chrome storage
- ✅ HTTPS-only communication
- ✅ No data sent to third parties
- ✅ Credentials never logged
- ⚠️ Don't commit sensitive data to Git

## 📞 Support

**Documentation:**
- All guides in this repository
- Comments in source code
- TypeScript types for reference

**Community:**
- Open GitHub issues for bugs
- Share improvements via Pull Requests
- Help others in discussions

---

## 🎊 Ready to Start?

**Your action items:**

1. ✅ Clone repository and install dependencies
2. ✅ Create icons using `create-icons.html`
3. ✅ Configure API in `src/shared/api/client.ts`
4. ✅ Build with `npm run build`
5. ✅ Load in Chrome and test!

**Start with Step 1 above and follow through Step 5. You'll have a working extension in 30 minutes!**

Good luck! 🚀

---

**Questions?** Read [NEXT_STEPS.md](./NEXT_STEPS.md) for detailed instructions.

**Problems?** Check [DEBUGGING.md](./DEBUGGING.md) for solutions.

**API issues?** See [API_CONFIGURATION.md](./API_CONFIGURATION.md) for help.
