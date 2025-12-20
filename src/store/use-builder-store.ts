import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export interface ComponentPrimitive {
  id: string;
  name: string;
  category: 'Elements' | 'Forms' | 'Layout' | 'Cards' | 'Complex' | 'Dashboard';
  tags: string[];
  code?: string;
  extractedAt?: number;
  complexity?: number;
}
export interface CanvasItem extends ComponentPrimitive {
  instanceId: string;
  customName?: string;
}
export interface SavedTemplate {
  id: string;
  name: string;
  items: CanvasItem[];
  savedAt: number;
}
interface BuilderState {
  components: ComponentPrimitive[];
  canvasItems: CanvasItem[];
  templates: SavedTemplate[];
  lastExtracted: ComponentPrimitive | null;
  searchQuery: string;
  activeCategory: string | 'All';
  theme: {
    primaryColor: string;
    borderRadius: number;
    fontFamily: 'Inter' | 'Sora';
  };
  addComponent: (component: ComponentPrimitive) => void;
  removeComponent: (id: string) => void;
  addToCanvas: (component: ComponentPrimitive) => void;
  removeFromCanvas: (instanceId: string) => void;
  reorderCanvas: (items: CanvasItem[]) => void;
  updateTheme: (updates: Partial<BuilderState['theme']>) => void;
  clearCanvas: () => void;
  saveTemplate: (name: string) => void;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  updateCanvasItemName: (instanceId: string, name: string) => void;
  syncToCloud: () => Promise<void>;
  hydrateFromCloud: () => Promise<void>;
}
export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      components: [
        { id: '1', name: 'Primary Button', category: 'Elements', tags: ['ui', 'atomic'] },
        { id: '2', name: 'Input Field', category: 'Forms', tags: ['input', 'tailwind'] },
      ],
      canvasItems: [],
      templates: [],
      lastExtracted: null,
      searchQuery: '',
      activeCategory: 'All',
      theme: {
        primaryColor: '#3B82F6',
        borderRadius: 8,
        fontFamily: 'Inter',
      },
      addComponent: (comp) => {
        set((state) => ({
          components: [{ ...comp, extractedAt: Date.now() }, ...state.components],
          lastExtracted: comp
        }));
        get().syncToCloud();
      },
      removeComponent: (id) => {
        set((state) => ({
          components: state.components.filter((c) => c.id !== id),
          lastExtracted: state.lastExtracted?.id === id ? null : state.lastExtracted
        }));
        get().syncToCloud();
      },
      addToCanvas: (comp) => set((state) => ({
        canvasItems: [...state.canvasItems, { ...comp, instanceId: crypto.randomUUID() }]
      })),
      removeFromCanvas: (instanceId) => set((state) => ({
        canvasItems: state.canvasItems.filter((item) => item.instanceId !== instanceId)
      })),
      reorderCanvas: (items) => set({ canvasItems: items }),
      updateTheme: (updates) => {
        set((state) => ({
          theme: { ...state.theme, ...updates }
        }));
        get().syncToCloud();
      },
      clearCanvas: () => {
        set({ canvasItems: [] });
        get().syncToCloud();
      },
      saveTemplate: (name) => {
        set((state) => ({
          templates: [{
            id: crypto.randomUUID(),
            name,
            items: state.canvasItems,
            savedAt: Date.now()
          }, ...state.templates]
        }));
        get().syncToCloud();
      },
      setSearchQuery: (query) => set({ searchQuery: query }),
      setActiveCategory: (category) => set({ activeCategory: category }),
      updateCanvasItemName: (instanceId, name) => set((state) => ({
        canvasItems: state.canvasItems.map(item =>
          item.instanceId === instanceId ? { ...item, customName: name } : item
        )
      })),
      syncToCloud: async () => {
        const state = get();
        try {
          await fetch('/api/user/state', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              components: state.components,
              templates: state.templates,
              theme: state.theme
            })
          });
        } catch (e) {
          console.error("Cloud sync failed", e);
        }
      },
      hydrateFromCloud: async () => {
        try {
          const res = await fetch('/api/user/state');
          const json = await res.json();
          if (json.success && json.data) {
            set((state) => ({
              ...state,
              ...json.data,
              // Keep local session specific UI state
              searchQuery: state.searchQuery,
              activeCategory: state.activeCategory
            }));
          }
        } catch (e) {
          console.error("Hydration failed", e);
        }
      }
    }),
    { name: 'leverage-builder-storage' }
  )
);