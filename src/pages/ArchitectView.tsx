import React, { useState, useMemo } from 'react';
import { Box, Plus, Save, Trash2, LayoutTemplate, Activity, Laptop, Smartphone, Tablet, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { DndContext, closestCorners, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useBuilderStore } from '@/store/use-builder-store';
import { DraggablePrimitive } from '@/components/architect/DraggablePrimitive';
import { SortableCanvasItem } from '@/components/architect/SortableCanvasItem';
import { BlockExportDialog } from '@/components/architect/BlockExportDialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
export function ArchitectView() {
  const components = useBuilderStore(s => s.components);
  const canvasItems = useBuilderStore(s => s.canvasItems);
  const addToCanvas = useBuilderStore(s => s.addToCanvas);
  const reorderCanvas = useBuilderStore(s => s.reorderCanvas);
  const clearCanvas = useBuilderStore(s => s.clearCanvas);
  const addComponent = useBuilderStore(s => s.addComponent);
  const themeFontFamily = useBuilderStore(s => s.theme.fontFamily);
  const themeBorderRadius = useBuilderStore(s => s.theme.borderRadius);
  const themePrimaryColor = useBuilderStore(s => s.theme.primaryColor);
  const saveTemplate = useBuilderStore(s => s.saveTemplate);
  const [blockName, setBlockName] = useState('New Architectural Block');
  const [isExporting, setIsExporting] = useState(false);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.data.current?.type === 'primitive') {
      const primitive = components.find(c => c.id === active.id);
      if (primitive) {
        addToCanvas(primitive);
        toast.success(`Added ${primitive.name} to canvas`);
      }
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = canvasItems.findIndex(i => i.instanceId === active.id);
      const newIndex = canvasItems.findIndex(i => i.instanceId === over.id);
      reorderCanvas(arrayMove(canvasItems, oldIndex, newIndex));
    }
  };
  const architecturalWeight = useMemo(() => {
    return canvasItems.reduce((acc, item) => acc + (item.complexity || 42), 0);
  }, [canvasItems]);
  const handleCommit = () => {
    if (canvasItems.length === 0) {
      toast.error("Canvas is empty. Add primitives first.");
      return;
    }
    saveTemplate(blockName);
    setIsExporting(true);
  };
  const handleSaveToLibrary = () => {
    if (canvasItems.length === 0) return;
    const combinedCode = canvasItems.map(item => item.code).join('\n\n');
    addComponent({
      id: crypto.randomUUID(),
      name: blockName,
      category: 'Complex',
      tags: ['composition', 'block'],
      code: combinedCode,
      complexity: architecturalWeight,
      extractedAt: Date.now()
    });
    toast.success("Composition saved as a library primitive");
  };
  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
        <aside className="w-80 border-r bg-background flex flex-col shrink-0 shadow-sm z-10">
          <div className="p-6 border-b bg-muted/30">
            <h2 className="font-bold flex items-center gap-2 text-lg">
              <Box className="size-5 text-primary" />
              Repository
            </h2>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1.5 opacity-70">
              Architectural Library
            </p>
          </div>
          <ScrollArea className="flex-1 p-5">
            <div className="space-y-3">
              {components.map(comp => (
                <DraggablePrimitive key={comp.id} component={comp} />
              ))}
              {components.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-muted/5">
                  <p className="text-xs text-muted-foreground font-medium">Library is empty</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </aside>
        <main className="flex-1 bg-secondary/5 relative flex flex-col">
          <div className="h-16 border-b bg-background flex items-center justify-between px-8 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-0.5">
                <Input
                  value={blockName}
                  onChange={(e) => setBlockName(e.target.value)}
                  className="h-8 w-64 font-bold border-none bg-transparent hover:bg-secondary/20 focus:bg-secondary/40 focus:ring-0 transition-all p-0 text-base"
                />
                <div className="flex items-center gap-3 text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">
                  <span className="flex items-center gap-1 bg-secondary/80 px-1.5 py-0.5 rounded-full">
                    <Activity className="size-2.5 text-primary" /> {architecturalWeight}
                  </span>
                  <span className="flex items-center gap-1 bg-secondary/80 px-1.5 py-0.5 rounded-full">
                    <LayoutTemplate className="size-2.5 text-primary" /> {canvasItems.length} Primitives
                  </span>
                </div>
              </div>
              <div className="flex items-center bg-muted/50 p-1 rounded-xl gap-1">
                <Button variant={viewport === 'mobile' ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => setViewport('mobile')}>
                  <Smartphone className="size-4" />
                </Button>
                <Button variant={viewport === 'tablet' ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => setViewport('tablet')}>
                  <Tablet className="size-4" />
                </Button>
                <Button variant={viewport === 'desktop' ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => setViewport('desktop')}>
                  <Laptop className="size-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 h-10 rounded-xl px-4">
                    Actions <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSaveToLibrary}>Save as Unit to Library</DropdownMenuItem>
                  <DropdownMenuItem onClick={clearCanvas} className="text-destructive">Clear Workspace</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" className="font-bold shadow-soft h-10 px-6 rounded-xl bg-primary" onClick={handleCommit}>
                <Save className="size-4 mr-2" /> Commit Block
              </Button>
            </div>
          </div>
          <div className="flex-1 p-8 md:p-12 overflow-auto scrollbar-none bg-grid-slate-100/[0.03] dark:bg-grid-white/[0.02]">
            <div
              className={cn(
                "mx-auto min-h-full bg-background border shadow-2xl p-10 transition-all duration-500 relative",
                themeFontFamily === 'Sora' ? "font-display" : "font-sans",
                viewport === 'mobile' ? 'max-w-[375px]' : viewport === 'tablet' ? 'max-w-[768px]' : 'max-w-4xl'
              )}
              style={{
                borderRadius: `${themeBorderRadius * 3}px`,
                borderColor: `${themePrimaryColor}20`
              }}
            >
              <SortableContext items={canvasItems.map(i => i.instanceId)} strategy={verticalListSortingStrategy}>
                <div className="space-y-8 relative z-10">
                  {canvasItems.map((item) => (
                    <SortableCanvasItem key={item.instanceId} item={item} />
                  ))}
                  {canvasItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-48 text-center animate-fade-in">
                      <div className="h-24 w-24 rounded-[2.5rem] bg-secondary/50 flex items-center justify-center mb-8 shadow-inner">
                        <Plus className="size-10 text-muted-foreground/20" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 tracking-tight">Composition Canvas</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
                        Drag primitives from your Repository into this workspace to begin building higher-order architectural units.
                      </p>
                    </div>
                  )}
                </div>
              </SortableContext>
            </div>
          </div>
        </main>
      </div>
      <BlockExportDialog
        open={isExporting}
        onOpenChange={setIsExporting}
        blockName={blockName}
      />
    </DndContext>
  );
}