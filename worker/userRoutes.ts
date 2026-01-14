import { Hono } from "hono";
import { API_RESPONSES } from './config';
import { Env, getAppController, registerSession, unregisterSession } from "./core-utils";
/**
 * Core Routes - Optimized for stable Worker deployments
 * Directly retrieves DO stubs to avoid TS2589 recursion errors in Agent SDK
 */
export function coreRoutes(app: Hono<{ Bindings: Env }>) {
    app.all('/api/chat/:sessionId/*', async (c) => {
        try {
            const sessionId = c.req.param('sessionId');
            // Bypass SDK utility and use direct binding to resolve TS2589 deep recursion
            const id = c.env.CHAT_AGENT.idFromName(sessionId);
            const agent: any = c.env.CHAT_AGENT.get(id);
            const url = new URL(c.req.url);
            url.pathname = url.pathname.replace(`/api/chat/${sessionId}`, '');
            return agent.fetch(new Request(url.toString(), {
                method: c.req.method,
                headers: c.req.header(),
                body: c.req.method === 'GET' || c.req.method === 'DELETE' ? undefined : c.req.raw.body
            }));
        } catch (error) {
            console.error('Agent routing error:', error);
            return c.json({
                success: false,
                error: API_RESPONSES.AGENT_ROUTING_FAILED
            }, { status: 500 });
        }
    });
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    /**
     * Specialized Extraction Proxy
     */
    app.post('/api/chat/:sessionId/extract', async (c) => {
        try {
            const sessionId = c.req.param('sessionId');
            const body = await c.req.json();
            // Direct DO binding retrieval for extraction proxy
            const id = c.env.CHAT_AGENT.idFromName(sessionId);
            const agent: any = c.env.CHAT_AGENT.get(id);
            return await agent.fetch(new Request(`http://agent/extract`, {
                method: 'POST',
                body: JSON.stringify(body)
            }));
        } catch (error) {
            return c.json({ success: false, error: 'Proxy extraction failed' }, { status: 500 });
        }
    });
    /**
     * Session and State Persistence Routes
     */
    app.get('/api/sessions', async (c) => {
        try {
            const controller = getAppController(c.env);
            const sessions = await controller.listSessions();
            return c.json({ success: true, data: sessions });
        } catch (error) {
            return c.json({ success: false, error: 'Failed to retrieve sessions' }, { status: 500 });
        }
    });
    app.post('/api/sessions', async (c) => {
        try {
            const body = await c.req.json().catch(() => ({}));
            const { title, sessionId: providedSessionId, firstMessage } = body;
            const sessionId = providedSessionId || crypto.randomUUID();
            let sessionTitle = title;
            if (!sessionTitle) {
                const now = new Date();
                const dateTime = now.toLocaleString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
                if (firstMessage) {
                    sessionTitle = `${firstMessage.slice(0, 30)}... • ${dateTime}`;
                } else {
                    sessionTitle = `Architect ${dateTime}`;
                }
            }
            await registerSession(c.env, sessionId, sessionTitle);
            return c.json({ success: true, data: { sessionId, title: sessionTitle } });
        } catch (error) {
            return c.json({ success: false, error: 'Failed to create session' }, { status: 500 });
        }
    });
    app.delete('/api/sessions/:sessionId', async (c) => {
        try {
            const sessionId = c.req.param('sessionId');
            const deleted = await unregisterSession(c.env, sessionId);
            return c.json({ success: true, data: { deleted } });
        } catch (error) {
            return c.json({ success: false, error: 'Failed to delete session' }, { status: 500 });
        }
    });
    app.get('/api/user/state', async (c) => {
        try {
            const controller = getAppController(c.env);
            const state = await controller.getUserState("demo-user");
            return c.json({ success: true, data: state });
        } catch (error) {
            return c.json({ success: false, error: 'State sync failed' }, { status: 500 });
        }
    });
    app.post('/api/user/state', async (c) => {
        try {
            const controller = getAppController(c.env);
            const state = await c.req.json();
            await controller.setUserState("demo-user", state);
            return c.json({ success: true });
        } catch (error) {
            return c.json({ success: false, error: 'State persistence failed' }, { status: 500 });
        }
    });
}