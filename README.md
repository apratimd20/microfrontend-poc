# React Micro-Frontend POC

This repository contains a **Proof of Concept (POC)** for a Scalable Micro-Frontend Architecture using **React** and **Webpack Module Federation**, compliant with the technical assignment requirements.

## 🚀 Quick Start

The project is configured for a unified startup.

```bash
# 1. Install dependencies for all apps
npm install

# 2. Start the entire system (Host + Chat + Email)
npm start
```

- **Host App**: [http://localhost:3000](http://localhost:3000)
- **Chat App**: [https://microfrontend-poc-nu.vercel.app](https://microfrontend-poc-nu.vercel.app)
- **Email App**: [https://microfrontend-poc-lgqz.vercel.app](https://microfrontend-poc-lgqz.vercel.app)

---

## 🏗 Architecture

The architecture follows a **Shell (Host) + Remotes** pattern using Webpack 5 Module Federation.

### 1. Host Application (Main Wrapper)
- **Role**: The entry point for the user. It manages the layout, global state, and routing.
- **Resilience**: Implements **Error Boundaries** to gracefully handle offline micro-frontends. If a remote fails, the rest of the app remains functional.
- **Design System**: Owns the shared UI library and CSS taxonomy.

### 2. Chat Application (Micro-Frontend)
- **Role**: A standalone React application for real-time messaging.
- **Integration**: Consumes the Host's `Button`, `Card` and `eventBus`.
- **Isolation**: Can be developed and deployed independently.

### 3. Email Application (Micro-Frontend)
- **Role**: A standalone React application for email visualization.
- **Integration**: Consumes the Host's Design System (`host/Button`, `host/Card`).

---

## 🎨 Design System & Shared Components

The **Host Application** defines a centralized Design System effectively eliminating style duplication.

- **Exposed Modules**:
  - `host/Button`: Standardized button component.
  - `host/Card`: Wrapper component for consistent spacing and shadows.
  - `host/theme`: Global CSS variables for colors (Blue/White palette) and typography.
- **Consumption**: Micro-frontends import these federated modules.

**Example Usage in Remote:**
```jsx
// In ChatApp
import Button from 'host/Button';
import Card from 'host/Card';
```

---

## 📡 Communication Strategy

We implement a **Event-Driven Architecture** for loose coupling between micro-frontends.

- **Mechanism**: A custom `eventBus` (based on CustomEvent API) shared via Module Federation.
- **Flow**:
  1. **Chat App** sends a message -> Dispatches `unread_count_update`.
  2. **Host App** listens for `unread_count_update` -> Updates the "Unread Messages" counter in the header.
  3. **Host App** clicks "Notify" -> Dispatches `host_notification` -> **Chat App** displays the alert.

This ensures that micro-frontends do not directly depend on each other, only on the shared contract.

---

## 🛡️ Scalability & Trade-offs

### scalability
- **Independent Deployment**: Each app makes its own `remoteEntry.js`. New feature apps can be added by simply updating the Host's `webpack.config.js`.
- **Version Management**: Shared libraries (`react`, `react-dom`) are pinned to singletons to avoid "multiple React instances" errors.

### Trade-offs
1.  **Initial Load**: Loading multiple `remoteEntry.js` files can add initial network overhead, though HTTP/2 mitigates this.
2.  **Coupling to Host**: Remotes rely on the Host for the Design System. Running them "standalone" requires mocking these imports or running a local Host instance (as configured).
3.  **Complexity**: Debugging across boundaries (e.g., failed imports) requires robust Error Handling, which we implemented via `ErrorBoundary`.

---

## 📂 Project Structure

```
react-microfrontend-poc/
├── package.json        # Root scripts (concurrently)
├── host-app/           # Main Shell
│   ├── src/components  # ErrorBoundary, etc.
│   ├── src/design-system # Shared UI (Button, Card, Theme)
│   └── webpack.config.js # Federation Config (Remotes/Exposes)
├── chat-app/           # Chat Remote
│   └── webpack.config.js # Federation Config
└── email-app/          # Email Remote
    └── webpack.config.js # Federation Config
```

---

## 🚢 Deployment

This project is ready for deployment to **Vercel** or any static hosting platform.

### Quick Deploy to Vercel

1. **Deploy Remote Apps First** (chat-app and email-app)
2. **Deploy Host App** with environment variables pointing to remote URLs

For detailed deployment instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

### Key Changes for Production

- ✅ **Environment Variables**: Webpack configs use environment variables for remote URLs
- ✅ **CORS Headers**: `vercel.json` files configured for cross-origin Module Federation
- ✅ **Auto Public Path**: Production builds use `auto` for proper asset loading
- ✅ **Build Scripts**: All apps have `npm run build` for production builds

### Environment Variables

**Host App** requires:
- `CHAT_APP_URL`: URL of deployed chat-app
- `EMAIL_APP_URL`: URL of deployed email-app

See `.env.example` files in each app directory for details.

---

## ✅ Deliverables Checklist
- [x] Host Application (Wrapper, Design System).
- [x] Chat & Email Micro-Frontends.
- [x] Module Federation Architecture.
- [x] Shared Components (Button, Card).
- [x] Event-based Communication.
- [x] Scalable & Resilient (Error Boundaries).
- [x] Comprehensive README.

