# ✅ Setup Checklist

Use this checklist to track your progress setting up the Open WebUI Chrome Extension.

## 🎯 Pre-Setup Verification

- [ ] Node.js is installed (`node --version`)
- [ ] Chrome browser is installed
- [ ] I have access to my Open WebUI instance
- [ ] I know my Open WebUI login credentials
- [ ] I have my company's Open WebUI base URL

## 📥 Installation

- [ ] Repository cloned locally
- [ ] Changed into project directory (`cd openwebui-chrome-extension`)
- [ ] Dependencies installed (`npm install`)
- [ ] No errors during installation

## 🎨 Icon Creation

- [ ] Created `public/icons/` directory
- [ ] Generated or created `icon16.png`
- [ ] Generated or created `icon48.png`
- [ ] Generated or created `icon128.png`
- [ ] All icons are PNG format
- [ ] Icons are correct sizes (verify with `file` command or image viewer)

**How I created icons:**
- [ ] Used `create-icons.html` tool
- [ ] Used online icon generator
- [ ] Created manually in image editor
- [ ] Other: _________________

## 🔧 API Configuration

- [ ] Opened my Open WebUI in browser
- [ ] Opened DevTools (F12)
- [ ] Went to Network tab
- [ ] Performed login and noted endpoint
- [ ] Sent test message and noted endpoint
- [ ] Documented my API endpoints below:

**My API Endpoints:**
```
Login endpoint: _________________________________
Login request format: ___________________________
Login response token field: _____________________

Chat endpoint: __________________________________
Chat request format: ____________________________
Chat response format: ___________________________
```

- [ ] Updated `src/shared/api/client.ts` with login endpoint
- [ ] Updated `src/shared/api/client.ts` with chat endpoint
- [ ] Updated request/response parsing logic
- [ ] Saved changes

## 🏗️ Build Process

- [ ] Ran `npm run build`
- [ ] Build completed successfully (no errors)
- [ ] `dist/` folder was created
- [ ] `dist/manifest.json` exists
- [ ] `dist/icons/` folder exists with all icons
- [ ] `dist/background/` folder exists
- [ ] `dist/assets/` folder exists

## 🌐 Chrome Extension Loading

- [ ] Opened `chrome://extensions/` in Chrome
- [ ] Enabled "Developer mode" (top-right toggle)
- [ ] Clicked "Load unpacked"
- [ ] Selected the `dist` folder
- [ ] Extension loaded without errors
- [ ] Extension appears in list
- [ ] Extension icon appears in toolbar
- [ ] No error badges on extension card

**My Extension ID:** `_______________________________`

## 🧪 Testing - Authentication

- [ ] Clicked extension icon
- [ ] Login screen appeared
- [ ] Entered base URL correctly (with https://)
- [ ] Entered email address
- [ ] Entered password
- [ ] Clicked "Sign In"
- [ ] No errors in console (checked with "Inspect popup")
- [ ] Login succeeded
- [ ] Chat interface appeared

**If login failed, I checked:**
- [ ] Browser console for errors
- [ ] Background service worker console
- [ ] Network tab for failed requests
- [ ] Base URL is correct
- [ ] API endpoints match my configuration above

## 💬 Testing - Chat Functionality

- [ ] Saw empty chat interface after login
- [ ] Typed a test message
- [ ] Clicked "Send" (or pressed Enter)
- [ ] Message appeared in chat as "user" message
- [ ] Saw "Thinking..." loading indicator
- [ ] Received response from AI
- [ ] Response appeared as "assistant" message
- [ ] Can scroll through messages
- [ ] Can send multiple messages

**If chat failed, I checked:**
- [ ] Console errors (popup inspector)
- [ ] Background worker errors
- [ ] Network tab shows request being sent
- [ ] Response structure matches code expectations

## 🎯 Testing - Context Menu

- [ ] Selected text on any webpage
- [ ] Right-clicked on selected text
- [ ] Saw "Send to Open WebUI" option in context menu
- [ ] Clicked "Send to Open WebUI"
- [ ] Extension popup opened
- [ ] Selected text appeared in chat input (or sent automatically)

## ⚙️ Testing - Settings Page

- [ ] Right-clicked extension icon
- [ ] Clicked "Options"
- [ ] Settings page opened
- [ ] Can see base URL field
- [ ] Can see theme selector
- [ ] Changed a setting
- [ ] Clicked "Save Settings"
- [ ] Saw success message
- [ ] Setting persisted after reload

## 🔄 Testing - Session Persistence

- [ ] Logged in to extension
- [ ] Closed browser completely
- [ ] Reopened browser
- [ ] Clicked extension icon
- [ ] Still logged in (didn't need to re-enter credentials)

## 🚪 Testing - Logout

- [ ] Clicked "Logout" button
- [ ] Returned to login screen
- [ ] Clicked extension icon again
- [ ] Login screen appeared (not automatically logged in)
- [ ] Can log back in successfully

## 🐛 Troubleshooting (if needed)

**Issues I encountered:**
- [ ] Build errors - **Solution:** _______________
- [ ] Extension won't load - **Solution:** _______________
- [ ] Login fails - **Solution:** _______________
- [ ] CORS errors - **Solution:** _______________
- [ ] Chat not responding - **Solution:** _______________
- [ ] Other: _______________ - **Solution:** _______________

**Documents I consulted:**
- [ ] [START_HERE.md](./START_HERE.md)
- [ ] [API_CONFIGURATION.md](./API_CONFIGURATION.md)
- [ ] [DEBUGGING.md](./DEBUGGING.md)
- [ ] [SETUP.md](./SETUP.md)

## 🎨 Customization (optional)

- [ ] Changed brand colors in CSS
- [ ] Updated extension name in manifest
- [ ] Added company logo as icons
- [ ] Customized login screen text
- [ ] Other customizations: _______________

## 📝 Documentation

- [ ] Documented my API endpoints above
- [ ] Saved any custom configuration
- [ ] Created team setup instructions (if needed)
- [ ] Documented any issues and solutions

## 🚀 Deployment (optional)

**For team distribution:**
- [ ] Tested extension thoroughly
- [ ] Created deployment package
- [ ] Documented setup for team members
- [ ] Shared installation instructions

**For Chrome Web Store (optional):**
- [ ] Created Chrome Web Store developer account
- [ ] Prepared store listing
- [ ] Created screenshots
- [ ] Submitted for review

## ✨ Final Verification

- [ ] ✅ All core features work
- [ ] ✅ No console errors during normal use
- [ ] ✅ Extension performs well (no lag/freezing)
- [ ] ✅ Can use extension in daily workflow
- [ ] ✅ Team members can use it (if applicable)

## 📊 Completion Status

**Total checkboxes:** ~85
**Completed:** ______ / 85
**Percentage:** ______%

**Time spent:** ______ minutes/hours

## 🎉 Success!

If you've checked all the boxes in these sections, your extension is ready!

**Core sections (required):**
- ✅ Pre-Setup Verification
- ✅ Installation
- ✅ Icon Creation
- ✅ API Configuration
- ✅ Build Process
- ✅ Chrome Extension Loading
- ✅ Testing - Authentication
- ✅ Testing - Chat Functionality

**Optional sections:**
- ⭐ Testing - Context Menu
- ⭐ Testing - Settings Page
- ⭐ Testing - Session Persistence
- ⭐ Customization
- ⭐ Deployment

## 📝 Notes & Comments

Use this space to jot down anything important:

**API Configuration Notes:**
```
(Example: "Our Open WebUI uses /api/v1/auth/signin for login")




```

**Custom Changes Made:**
```
(Example: "Changed primary color to company blue #123456")




```

**Known Issues:**
```
(Example: "Streaming not working, using polling instead")




```

**Next Steps:**
```
(Example: "Add dark mode", "Improve error messages")




```

---

**Completion Date:** _______________

**Completed By:** _______________

**Ready for:** 
- [ ] Personal use
- [ ] Team distribution  
- [ ] Chrome Web Store publication

🎊 **Congratulations on setting up your Open WebUI Chrome Extension!**
