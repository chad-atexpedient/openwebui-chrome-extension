# ⚡ Quick Reference Card

**Bookmark this page for instant access to common commands and solutions!**

## 🚀 Essential Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Development mode (auto-rebuild)
npm run dev

# Type check
npm run type-check

# Lint code
npm run lint
```

## 📍 Key File Locations

| What | Where |
|------|-------|
| **API Configuration** | `src/shared/api/client.ts` |
| **Popup UI** | `src/popup/components/` |
| **Styles** | `src/popup/popup.css` |
| **Extension Settings** | `public/manifest.json` |
| **Icons** | `public/icons/` (you create) |
| **Build Output** | `dist/` (generated) |

## 🔧 Common Tasks

### Reload Extension in Chrome
1. Go to `chrome://extensions/`
2. Find your extension
3. Click reload icon (🔄)

### View Console Logs
- **Popup**: Right-click icon → "Inspect popup"
- **Background**: `chrome://extensions/` → "service worker"

### Clear Extension Storage
```javascript
// In console (popup or background):
chrome.storage.local.clear(() => console.log('Cleared'));
```

### Check What's Stored
```javascript
chrome.storage.local.get(null, items => console.log(items));
```

## 🐛 Quick Debugging

### Login Not Working?
1. Check base URL (must include `https://`)
2. Verify API endpoint in `src/shared/api/client.ts`
3. Check popup console for errors
4. Test API in DevTools Network tab

### Chat Not Responding?
1. Check background worker console
2. Verify chat endpoint in `client.ts`
3. Add `console.log` to see response
4. Check Network tab for failed requests

### CORS Error?
- Background worker should handle it (already implemented)
- Or configure server CORS headers

### Extension Won't Load?
1. Verify build succeeded: `ls dist/`
2. Check icons exist: `ls public/icons/`
3. Rebuild: `npm run build`
4. Load `dist/` folder, not project root

## 📝 Quick Edits

### Change Brand Colors
Edit `src/popup/popup.css`:
```css
.btn-primary { background: #YOUR-COLOR; }
.message-user { background: #YOUR-COLOR; }
```

### Change Extension Name
Edit `public/manifest.json`:
```json
{
  "name": "Your Name Here",
  "description": "Your description"
}
```

### Update API Endpoint
Edit `src/shared/api/client.ts`:
```typescript
// Line ~33
async login(email, password) {
  const response = await this.client.post('/YOUR/ENDPOINT', ...);
}
```

## 🎯 Workflow Cheat Sheet

### Making Changes
1. Edit code in `src/`
2. Run `npm run build`
3. Go to `chrome://extensions/`
4. Click reload on your extension
5. Test the change

### Fresh Start
```bash
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

## 📚 Documentation Map

| Need | Read |
|------|------|
| **Getting Started** | START_HERE.md |
| **API Setup** | API_CONFIGURATION.md |
| **Troubleshooting** | DEBUGGING.md |
| **Step-by-Step** | NEXT_STEPS.md |
| **Track Progress** | CHECKLIST.md |
| **Complete Guide** | SETUP.md |
| **Project Info** | README.md |

## 🔑 Critical Paths

### Before First Build
1. Create icons in `public/icons/`
2. Update API endpoints in `src/shared/api/client.ts`
3. Run `npm install`
4. Run `npm run build`

### Your API Endpoints
**📝 Fill in your endpoints:**
```
Login: _______________________________________

Chat: ________________________________________

Base URL: ____________________________________
```

## 🚨 Emergency Fixes

### Can't Build
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Extension Broke
```bash
# Rebuild
npm run build

# Clear storage in extension console
chrome.storage.local.clear()

# Reload extension
# chrome://extensions/ → reload button
```

### Lost Configuration
- API config: Check `src/shared/api/client.ts`
- Extension settings: Check `public/manifest.json`
- Stored data: Run `chrome.storage.local.get(null, console.log)`

## 💡 Pro Tips

1. **Keep DevTools open** - Catch errors immediately
2. **Test in incognito** - No cache issues
3. **Use `npm run dev`** - Auto-rebuild on changes
4. **Check both consoles** - Popup AND background
5. **Git commit often** - Easy to revert changes

## 🎨 Customization Quick Links

| Customize | File | Line |
|-----------|------|------|
| Button color | `src/popup/popup.css` | ~90 |
| Extension name | `public/manifest.json` | 3 |
| Login endpoint | `src/shared/api/client.ts` | ~33 |
| Chat endpoint | `src/shared/api/client.ts` | ~52 |

## 📊 Status Check

```bash
# Verify everything is ready
npm run type-check  # Should pass
ls public/icons/    # Should show 3 PNG files
ls dist/            # Should exist after build
grep -r "YOUR" src/ # Should find your endpoints
```

## 🔗 Useful Chrome URLs

- `chrome://extensions/` - Extension management
- `chrome://extensions-internals/` - Extension internals
- `chrome://version/` - Chrome version

## 📞 When to Ask for Help

**Try first:**
1. Check DEBUGGING.md
2. Look at console errors
3. Review Network tab
4. Check this quick reference

**Ask for help if:**
- Tried solutions, still broken
- Can't find the error source
- Need API documentation
- Stuck for >30 minutes

**Include in request:**
- Error messages (screenshot)
- Console logs (both popup and background)
- What you tried
- Your Chrome version

---

## 🎯 Your Next Step

**First time?** → Read [START_HERE.md](./START_HERE.md)

**Have an issue?** → Check [DEBUGGING.md](./DEBUGGING.md)

**Need API help?** → See [API_CONFIGURATION.md](./API_CONFIGURATION.md)

---

**⭐ Bookmark this page for quick access!**

Last updated: Today | Quick wins in under 5 minutes each
