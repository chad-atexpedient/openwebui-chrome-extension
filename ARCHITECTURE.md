# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
│                           ↓                                  │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Chrome Browser                              │    │
│  │                                                     │    │
│  │  ┌──────────────┐        ┌─────────────────┐     │    │
│  │  │   Popup UI   │←──────→│  Background     │     │    │
│  │  │  (React App) │        │  Service Worker │     │    │
│  │  └──────────────┘        └─────────────────┘     │    │
│  │         ↓                         ↓               │    │
│  │  ┌──────────────┐        ┌─────────────────┐     │    │
│  │  │   Settings   │        │  Chrome Storage │     │    │
│  │  │     Page     │        │   (Local/Sync)  │     │    │
│  │  └──────────────┘        └─────────────────┘     │    │
│  │                                   ↓               │    │
│  └───────────────────────────────────┼───────────────┘    │
│                                      ↓                     │
└──────────────────────────────────────┼─────────────────────┘
                                       ↓
                          ┌────────────────────────┐
                          │   Open WebUI Server    │
                          │   (Your Company)       │
                          └────────────────────────┘
```

## Component Breakdown

### 1. Popup UI (React)
**Location**: `src/popup/`

**Purpose**: Main user interface for chat interaction

**Components**:
```
App.tsx
├── Login.tsx          (Authentication form)
└── Chat.tsx           (Chat interface)
```

**Responsibilities**:
- Display login form
- Show chat messages
- Handle user input
- Communicate with background worker
- Manage UI state

**Flow**:
```
User Action → React Component → Chrome Message API → Background Worker
```

### 2. Background Service Worker
**Location**: `src/background/service-worker.ts`

**Purpose**: Handle all API communication and background tasks

**Key Functions**:
- API request handling
- Authentication token management
- Message routing
- Context menu management
- Keep-alive management

**Message Types**:
- `AUTH_LOGIN` - Handle login
- `AUTH_LOGOUT` - Handle logout
- `SEND_MESSAGE` - Send chat message
- `GET_CHATS` - Retrieve chat history
- `CREATE_CHAT` - Create new chat
- `DELETE_CHAT` - Delete chat
- `UPDATE_CONFIG` - Update settings

**Flow**:
```
Popup → Runtime Message → Service Worker → API Client → Open WebUI
                                                             ↓
Popup ← Runtime Response ← Service Worker ← API Response ←─┘
```

### 3. API Client
**Location**: `src/shared/api/client.ts`

**Purpose**: Abstraction layer for Open WebUI API

**Methods**:
- `login(email, password)` - Authenticate user
- `sendMessage(message, chatId?)` - Send chat message
- `getChatHistory(chatId)` - Get chat messages
- `getChats()` - List all chats
- `createChat(title?)` - Create new chat
- `deleteChat(chatId)` - Delete chat

**Features**:
- Axios-based HTTP client
- Automatic token injection
- Error handling
- Request/response transformation

### 4. Storage Layer
**Location**: `src/shared/storage/index.ts`

**Purpose**: Wrapper for Chrome Storage API

**Functions**:
- `getStorage(keys)` - Get data from storage
- `setStorage(data)` - Save data to storage
- `removeStorage(keys)` - Delete data
- `clearStorage()` - Clear all data
- `onStorageChange(callback)` - Listen to changes

**Stored Data**:
```typescript
{
  authToken: string,      // JWT or auth token
  config: {
    baseUrl: string,      // Open WebUI instance URL
    apiKey?: string       // Optional API key
  },
  currentChatId?: string, // Active chat
  chats?: Chat[],         // Chat history
  theme?: 'light' | 'dark'
}
```

### 5. Options/Settings Page
**Location**: `src/options/`

**Purpose**: Configuration interface

**Features**:
- Base URL configuration
- Theme selection
- Settings persistence
- Success notifications

## Data Flow

### Authentication Flow

```
1. User enters credentials
   ↓
2. Popup → Background: AUTH_LOGIN message
   ↓
3. Background → API Client: login(email, password)
   ↓
4. API Client → Open WebUI: POST /api/auth/signin
   ↓
5. Open WebUI → API Client: { token: "..." }
   ↓
6. API Client → Background: AuthResponse
   ↓
7. Background → Storage: Save token
   ↓
8. Background → Popup: Success response
   ↓
9. Popup: Show chat interface
```

### Chat Message Flow

```
1. User types message and hits send
   ↓
2. Popup: Display user message in UI
   ↓
3. Popup → Background: SEND_MESSAGE
   ↓
4. Background → API Client: sendMessage(text)
   ↓
5. API Client → Open WebUI: POST /api/chat
   Headers: Authorization: Bearer {token}
   ↓
6. Open WebUI: Process message
   ↓
7. Open WebUI → API Client: Response
   ↓
8. API Client → Background: ChatResponse
   ↓
9. Background → Popup: Success with data
   ↓
10. Popup: Display AI response in UI
```

### Context Menu Flow

```
1. User selects text on webpage
   ↓
2. User right-clicks
   ↓
3. Chrome: Shows context menu
   ↓
4. User clicks "Send to Open WebUI"
   ↓
5. Background: Captures selected text
   ↓
6. Background → Storage: Save selected text
   ↓
7. Background: Opens popup
   ↓
8. Popup: Retrieves selected text from storage
   ↓
9. Popup: Pre-fills or sends message
```

## State Management

### React State (Popup)
**Managed by**: React hooks (useState)

**State**:
- `isAuthenticated` - Login status
- `messages` - Chat messages array
- `inputValue` - Current input text
- `isLoading` - Loading state
- `error` - Error messages

### Chrome Storage (Persistent)
**Managed by**: Chrome Storage API

**Data**:
- Authentication token
- User configuration
- Chat history
- Settings/preferences

### Service Worker State
**Managed by**: Module-level variables (limited lifespan)

**Data**:
- API client instance
- Keep-alive interval

## Security Architecture

### Token Storage
```
User Login → Token Received → Chrome Storage (Local)
                                     ↓
                              Encrypted by Chrome
                                     ↓
                            Only accessible to extension
```

### API Communication
```
Extension → HTTPS Only → Open WebUI Server
              ↓
       SSL/TLS Encrypted
              ↓
        Secure Transport
```

### Permissions Model
```
Manifest.json
├── storage         → Local data storage
├── activeTab       → Access current tab
├── contextMenus    → Right-click menu
└── host_permissions → API access (user configured)
```

## Build Process

### Development Mode
```
Source Files (src/)
      ↓
   Vite Dev Server
      ↓
   Hot Reload
      ↓
   dist/ (development build)
```

### Production Build
```
Source Files (src/)
      ↓
   TypeScript Compiler
      ↓
   Type Checking
      ↓
   Vite Build Process
      ↓
   Code Splitting
      ↓
   Minification
      ↓
   Asset Optimization
      ↓
   dist/ (production build)
```

### Build Output Structure
```
dist/
├── manifest.json           # Extension manifest
├── icons/                  # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── background/
│   └── service-worker.js   # Background script
├── src/
│   ├── popup/
│   │   └── popup.html      # Popup entry point
│   └── options/
│       └── options.html    # Settings page
└── assets/                 # Compiled JS/CSS
    ├── popup-*.js
    ├── popup-*.css
    ├── options-*.js
    └── ...
```

## Extension Lifecycle

### Installation
```
1. User loads extension
   ↓
2. Chrome reads manifest.json
   ↓
3. Validates permissions
   ↓
4. Installs extension
   ↓
5. Background worker starts
   ↓
6. Context menu created
   ↓
7. Extension ready
```

### Normal Operation
```
1. Background worker idle
   ↓
2. User clicks icon
   ↓
3. Popup HTML loads
   ↓
4. React app initializes
   ↓
5. Checks authentication
   ↓
6. Shows login or chat
   ↓
7. User interacts
   ↓
8. Messages to background
   ↓
9. API calls made
   ↓
10. Responses received
    ↓
11. UI updates
```

### Service Worker Lifecycle (Manifest v3)
```
Event Trigger (user action, alarm, message)
      ↓
Service Worker Wakes
      ↓
Handles Event
      ↓
Idle for 30 seconds
      ↓
Chrome Suspends Worker
      ↓
(Keep-alive interval prevents this)
```

## API Integration Points

### Open WebUI API
```
Base URL: https://your-instance.com

Endpoints (examples - configure yours):
├── POST /api/v1/auths/signin
│   Body: { email, password }
│   Response: { token, user }
│
├── POST /api/chat
│   Headers: Authorization: Bearer {token}
│   Body: { message, chat_id? }
│   Response: { id, message, done }
│
├── GET /api/chats
│   Headers: Authorization: Bearer {token}
│   Response: Chat[]
│
├── POST /api/chats/new
│   Headers: Authorization: Bearer {token}
│   Body: { title }
│   Response: Chat
│
└── DELETE /api/chats/{id}
    Headers: Authorization: Bearer {token}
    Response: Success
```

## Error Handling

### Error Flow
```
Error Occurs
    ↓
Caught by try/catch
    ↓
Logged to console
    ↓
Transformed to user-friendly message
    ↓
Sent to UI
    ↓
Displayed to user
```

### Error Boundaries
- API errors → Handled by client
- Network errors → Handled by axios interceptors
- UI errors → Handled by React error boundaries (can be added)
- Storage errors → Handled by storage wrapper

## Performance Considerations

### Optimization Strategies

1. **Code Splitting**
   - Popup and options pages separate bundles
   - Background worker separate bundle

2. **Lazy Loading**
   - Components loaded on demand
   - Large libraries chunked

3. **Caching**
   - API responses cached in storage
   - Static assets cached by browser

4. **Minimal Re-renders**
   - React memoization
   - Efficient state updates

### Resource Usage
- **Memory**: < 50MB typical
- **CPU**: Minimal (event-driven)
- **Network**: Only when user interacts
- **Storage**: < 5MB typical

## Testing Strategy

### Manual Testing
- Login/logout flows
- Message sending
- Error scenarios
- Context menu
- Settings persistence

### Automated Testing (can be added)
- Unit tests for utilities
- Component tests for UI
- Integration tests for flows
- E2E tests for critical paths

## Deployment Architecture

### Development
```
Developer Machine
    ↓
npm run dev
    ↓
dist/ folder
    ↓
Load unpacked in Chrome
```

### Production
```
Source Code
    ↓
npm run build
    ↓
dist/ folder
    ↓
Package as .zip
    ↓
Option 1: Direct distribution
Option 2: Chrome Web Store
Option 3: Enterprise deployment
```

## Extension Points

### Easy to Extend

1. **Add new UI components**
   - Create component in `src/popup/components/`
   - Import in App.tsx

2. **Add new API endpoints**
   - Add method to `src/shared/api/client.ts`
   - Add message type to service worker

3. **Add new settings**
   - Update types in `src/shared/types/`
   - Update options page UI
   - Update storage schema

4. **Add new features**
   - Follow existing patterns
   - Use TypeScript types
   - Add to documentation

## Dependencies

### Production Dependencies
- `react` - UI framework
- `react-dom` - React DOM rendering
- `zustand` - State management (if needed)
- `axios` - HTTP client
- `marked` - Markdown parsing (optional)
- `dompurify` - XSS protection (optional)

### Development Dependencies
- `typescript` - Type safety
- `vite` - Build tool
- `@vitejs/plugin-react` - React support
- `@types/*` - Type definitions
- `eslint` - Code linting

## Architecture Decisions

### Why Manifest v3?
- Required for new Chrome extensions
- More secure service worker model
- Better performance

### Why React?
- Component-based architecture
- Rich ecosystem
- Type safety with TypeScript
- Easy to maintain

### Why Vite?
- Fast build times
- Modern tooling
- Great developer experience
- Simple configuration

### Why Zustand? (optional)
- Lightweight state management
- Simple API
- No boilerplate
- TypeScript support

### Why Axios?
- Promise-based
- Interceptors for auth
- Good error handling
- Request/response transformation

## Future Enhancements

### Planned
- Streaming responses (WebSocket)
- Chat history UI
- Multiple conversations
- Markdown rendering
- Dark mode

### Possible
- Voice input
- File upload support
- Custom prompts
- Export functionality
- Analytics (privacy-focused)

---

**This architecture is designed to be:**
- ✅ Modular and maintainable
- ✅ Type-safe with TypeScript
- ✅ Secure by default
- ✅ Easy to extend
- ✅ Well-documented
- ✅ Performance-optimized
