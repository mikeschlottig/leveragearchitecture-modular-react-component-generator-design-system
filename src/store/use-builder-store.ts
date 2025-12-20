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
}
interface BuilderState {
  components: ComponentPrimitive[];
  canvasItems: CanvasItem[];
  lastExtracted: ComponentPrimitive | null;
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
}
export const useBuilderStore = create<BuilderState>()(
  persist(
    (set) => ({
      components: [
        { id: '1', name: 'Primary Button', category: 'Elements', tags: ['ui', 'atomic'] },
        { id: '2', name: 'Input Field', category: 'Forms', tags: ['input', 'tailwind'] },
      ],
      canvasItems: [],
      lastExtracted: null,
      theme: {
        primaryColor: '#3B82F6',
        borderRadius: 8,
        fontFamily: 'Inter',
      },
      addComponent: (comp) => set((state) => ({
        components: [{ ...comp, extractedAt: Date.now() }, ...state.components],
        lastExtracted: comp
      })),
      removeComponent: (id) => set((state) => ({
        components: state.components.filter((c) => c.id !== id),
        lastExtracted: state.lastExtracted?.id === id ? null : state.lastExtracted
      })),
      addToCanvas: (comp) => set((state) => ({
        canvasItems: [...state.canvasItems, { ...comp, instanceId: crypto.randomUUID() }]
      })),
      removeFromCanvas: (instanceId) => set((state) => ({
        canvasItems: state.canvasItems.filter((item) => item.instanceId !== instanceId)
      })),
      reorderCanvas: (items) => set({ canvasItems: items }),
      updateTheme: (updates) => set((state) => ({
        theme: { ...state.theme, ...updates }
      })),
      clearCanvas: () => set({ canvasItems: [] }),
    }),
    { name: 'leverage-builder-storage' }
  )
);