import React from 'react';
import { Box, Plus, Settings2, Play, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DndContext, DragOverlay, closestCorners, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useBuilderStore } from '@/store/use-builder-store';
import { DraggablePrimitive } from '@/components/architect/DraggablePrimitive';
import { SortableCanvasItem } from '@/components/architect/SortableCanvasItem';
import { toast } from 'sonner';
export function ArchitectView() {
  const components = useBuilderStore((s) => s.components);
  const canvasItems = useBuilderStore((s) => s.canvasItems);
  const addToCanvas = useBuilderStore((s) => s.addToCanvas);
  const reorderCanvas = useBuilderStore((s) => s.reorderCanvas);
  const clearCanvas = useBuilderStore((s) => s.clearCanvas);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    // Handle adding from sidebar (simulated via dnd-kit context)
    if (active.data.current?.type === 'primitive') {
      const primitive = components.find(c => c.id === active.id);
      if (primitive) {
        addToCanvas(primitive);
        toast.success(`Added ${primitive.name} to canvas`);
      }
      return;
    }
    // Handle reordering in canvas
    if (active.id !== over.id) {
      const oldIndex = canvasItems.findIndex(i => i.instanceId === active.id);
      const newIndex = canvasItems.findIndex(i => i.instanceId === over.id);
      reorderCanvas(arrayMove(canvasItems, oldIndex, newIndex));
    }
  };
  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
        <aside className="w-72 border-r bg-background flex flex-col shrink-0">
          <div className="p-4 border-b">
            <h2 className="font-semibold flex items-center gap-2"><Box className="size-4" /> Library</h2>
            <p className="text-xs text-muted-foreground">Drag primitives to the canvas</p>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {components.map(comp => (
                <DraggablePrimitive key={comp.id} component={comp} />
              ))}
              {components.length === 0 && (
                <p className="text-xs text-center text-muted-foreground py-8">No components available</p>
              )}
            </div>
          </ScrollArea>
        </aside>
        <main className="flex-1 bg-secondary/20 relative flex flex-col">
          <div className="h-14 border-b bg-background flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold">New Composed Block</span>
              <Button variant="ghost" size="icon" className="size-8"><Settings2 className="size-4" /></Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={clearCanvas}><Trash2 className="size-3 mr-2" /> Clear</Button>
              <Button size="sm"><Save className="size-3 mr-2" /> Save Block</Button>
            </div>
          </div>
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-3xl mx-auto min-h-full bg-background rounded-2xl border-2 border-dashed border-muted-foreground/20 p-8 shadow-inner">
              <SortableContext items={canvasItems.map(i => i.instanceId)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {canvasItems.map((item) => (
                    <SortableCanvasItem key={item.instanceId} item={item} />
                  ))}
                  {canvasItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                      <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                        <Plus className="size-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Empty Canvas</h3>
                      <p className="text-muted-foreground max-w-xs mx-auto">
                        Drag items from the left sidebar to start building your architectural block.
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