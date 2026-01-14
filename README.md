# AI Chat Agent on Cloudflare Workers

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mikeschlottig/leveragearchitecture-modular-react-component-generator-design-system)

A production-ready AI chat application built with Cloudflare Workers, Durable Objects, and Agents SDK. Features multi-session conversations, streaming responses, tool integration (web search, weather), and a modern React UI with shadcn/ui and Tailwind CSS.

## Features

- **Multi-Session Chat**: Persistent conversations with session management (create, list, delete, rename).
- **AI Integration**: Supports Gemini models via Cloudflare AI Gateway with streaming and tool calling.
- **Tools & Functions**: Built-in web search (SerpAPI), weather lookup, and extensible MCP tool support.
- **Modern UI**: Responsive React app with dark/light themes, sidebar navigation, and smooth animations.
- **Durable Objects**: State persistence for chats and app controller.
- **Session Management**: List sessions, update titles, clear all, with activity tracking.
- **Type-Safe**: Full TypeScript with strict types and Cloudflare Workers types.
- **Production-Ready**: CORS, logging, error handling, health checks.

## Tech Stack

- **Backend**: Cloudflare Workers, Hono, Agents SDK, Durable Objects, OpenAI SDK
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide React
- **State & Data**: TanStack Query, Zustand, Immer
- **Tools**: SerpAPI (search), Cloudflare AI Gateway (Gemini models), MCP (Model Context Protocol)
- **Dev Tools**: Bun, ESLint, Wrangler

## Quick Start

1. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   cd leverage-architectur-j4nidkwjywpzaxqsncokz
   bun install
   ```

2. **Configure Environment**:
   Edit `wrangler.jsonc`:
   - Set `CF_AI_BASE_URL` to your Cloudflare AI Gateway URL (e.g., `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway}/openai`).
   - Set `CF_AI_API_KEY` to your API token.
   - Add `SERPAPI_KEY` for web search (optional, from [serpapi.com](https://serpapi.com)).
   - Add `OPENROUTER_API_KEY` or others if needed.

3. **Run Locally**:
   ```bash
   bun dev
   ```
   Open `http://localhost:3000` (or `${PORT:-3000}`).

## Development

### Scripts
| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server (Vite + Worker proxy) |
| `bun build` | Build for production |
| `bun lint` | Run ESLint |
| `bun preview` | Preview production build |
| `bun cf-typegen` | Generate Worker types |

### Project Structure
```
├── src/              # React frontend
├── worker/           # Cloudflare Worker backend
├── shared/           # Shared types/utils (add if needed)
├── tailwind.config.js # Tailwind + shadcn config
└── wrangler.jsonc    # Worker config
```

### Key Files
- **Chat UI**: `src/pages/HomePage.tsx` (edit for custom UI)
- **Worker Routes**: `worker/userRoutes.ts` (add custom APIs)
- **Chat Agent**: `worker/agent.ts` (extend chat logic)
- **Tools**: `worker/tools.ts` (add custom functions)
- **Sessions**: `worker/app-controller.ts` (extend management)

### Frontend Customization
- Use shadcn/ui components from `@/components/ui/*`.
- Edit `src/components/app-sidebar.tsx` for navigation.
- Theme with `src/hooks/use-theme.ts`.

### Backend Extension
- Add routes in `worker/userRoutes.ts`.
- Extend `ChatAgent` in `worker/agent.ts`.
- Tools auto-discovered via OpenAI `tools` parameter.

### Environment Variables
Required: `CF_AI_BASE_URL`, `CF_AI_API_KEY`.
Optional: `SERPAPI_KEY`, `OPENROUTER_API_KEY`.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat/:sessionId/chat` | POST | Send message (supports streaming) |
| `/api/chat/:sessionId/messages` | GET | Get chat state |
| `/api/chat/:sessionId/clear` | DELETE | Clear messages |
| `/api/chat/:sessionId/model` | POST | Update model |
| `/api/sessions` | GET/POST/DELETE | Manage sessions |
| `/api/sessions/:id` | DELETE | Delete session |
| `/api/sessions/:id/title` | PUT | Update title |
| `/api/health` | GET | Health check |

## Deployment

Deploy to Cloudflare Workers in one click:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mikeschlottig/leveragearchitecture-modular-react-component-generator-design-system)

Or manually:

1. **Login**:
   ```bash
   bunx wrangler login
   bunx wrangler whoami
   ```

2. **Deploy**:
   ```bash
   bun run deploy
   ```
   Or `bunx wrangler deploy`.

3. **Custom Domain** (optional):
   ```bash
   bunx wrangler pages deploy --project-name=<name> dist/
   ```

4. **Environment Variables**:
   Set via Wrangler dashboard or CLI:
   ```bash
   bunx wrangler secret put SERPAPI_KEY
   ```

Bindings auto-configured via `wrangler.jsonc` (Durable Objects: `CHAT_AGENT`, `APP_CONTROLLER`).

## Contributing

1. Fork & clone.
2. `bun install`.
3. Make changes, `bun lint`.
4. Test with `bun dev`.
5. PR with clear description.

## License

MIT. See [LICENSE](LICENSE) for details.

## Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Agents SDK](https://developers.cloudflare.com/agents/)
- Issues: [GitHub Issues](https://github.com/issues)