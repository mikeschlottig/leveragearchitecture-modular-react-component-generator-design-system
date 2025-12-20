import React from 'react';
import { Box, Plus, Settings2, Save, Trash2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DndContext, closestCorners, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useBuilderStore } from '@/store/use-builder-store';
import { DraggablePrimitive } from '@/components/architect/DraggablePrimitive';
import { SortableCanvasItem } from '@/components/architect/SortableCanvasItem';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export function ArchitectView() {
  const components = useBuilderStore(s => s.components);
  const canvasItems = useBuilderStore(s => s.canvasItems);
  const addToCanvas = useBuilderStore(s => s.addToCanvas);
  const reorderCanvas = useBuilderStore(s => s.reorderCanvas);
  const clearCanvas = useBuilderStore(s => s.clearCanvas);
  const theme = useBuilderStore(s => s.theme);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.data.current?.type === 'primitive') {
      const primitive = components.find(c => c.id === active.id);
      if (primitive) {
        addToCanvas(primitive);
        toast.success(`Added ${primitive.name}`);
      }
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = canvasItems.findIndex(i => i.instanceId === active.id);
      const newIndex = canvasItems.findIndex(i => i.instanceId === over.id);
      reorderCanvas(arrayMove(canvasItems, oldIndex, newIndex));
    }
  };
  const architecturalWeight = canvasItems.length * 42;
  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
        <aside className="w-72 border-r bg-background flex flex-col shrink-0 shadow-sm z-10">
          <div className="p-5 border-b bg-muted/20">
            <h2 className="font-bold flex items-center gap-2"><Box className="size-4 text-primary" /> Repository</h2>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Available Primitives</p>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {components.map(comp => (
                <DraggablePrimitive key={comp.id} component={comp} />
              ))}
              {components.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-xl">
                  <p className="text-xs text-muted-foreground">Library is empty</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </aside>
        <main className="flex-1 bg-secondary/10 relative flex flex-col">
          <div className="h-14 border-b bg-background flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-sm font-bold">Unsaved Architecture</span>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold">
                  <span className="flex items-center gap-1"><Info className="size-3" /> Complexity: {architecturalWeight}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={clearCanvas} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="size-4 mr-2" /> Clear Canvas
              </Button>
              <Button size="sm" className="font-bold shadow-soft">
                <Save className="size-4 mr-2" /> Commit Block
              </Button>
            </div>
          </div>
          <div className="flex-1 p-8 md:p-12 overflow-auto">
            <div 
              className={cn(
                "max-w-4xl mx-auto min-h-full bg-background border shadow-xl p-8 md:p-12 transition-all",
                theme.fontFamily === 'Sora' ? "font-display" : "font-sans"
              )}
              style={{ borderRadius: `${theme.borderRadius * 2}px` }}
            >
              <SortableContext items={canvasItems.map(i => i.instanceId)} strategy={verticalListSortingStrategy}>
                <div className="space-y-6">
                  {canvasItems.map((item) => (
                    <SortableCanvasItem key={item.instanceId} item={item} />
                  ))}
                  {canvasItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
                      <div className="h-20 w-20 rounded-3xl bg-secondary flex items-center justify-center mb-8">
                        <Plus className="size-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Architect Corner</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto text-pretty">
                        Drag primitives from your repository here to compose larger architectural blocks.
                      </p>
                    </div>
                  )}
                </div>
              </SortableContext>
            </div>
          </div>
        </main>
      </div>
    </DndContext>
  );
}