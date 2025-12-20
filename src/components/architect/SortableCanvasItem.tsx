import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, Settings2, Check } from 'lucide-react';
import { CanvasItem, useBuilderStore } from '@/store/use-builder-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PreviewRenderer } from './PreviewRenderer';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
interface SortableCanvasItemProps {
  item: CanvasItem;
}
export function SortableCanvasItem({ item }: SortableCanvasItemProps) {
  const removeFromCanvas = useBuilderStore(s => s.removeFromCanvas);
  const borderRadius = useBuilderStore(s => s.theme.borderRadius);
  const fontFamily = useBuilderStore(s => s.theme.fontFamily);
  const updateCanvasItemName = useBuilderStore(s => s.updateCanvasItemName);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(item.customName || item.name);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.instanceId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    borderRadius: `${borderRadius * 1.5}px`,
  };
  const handleNameSave = () => {
    updateCanvasItemName(item.instanceId, tempName);
    setIsEditing(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      layout
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group border bg-card/80 backdrop-blur-sm p-6 flex flex-col md:flex-row items-center gap-8 transition-all",
        isDragging ? "z-50 shadow-3xl opacity-80 border-primary ring-4 ring-primary/10" : "hover:shadow-xl hover:border-primary/40",
        fontFamily === 'Sora' ? "font-display" : "font-sans"
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity p-2"
      >
        <GripVertical className="size-6 text-muted-foreground/30 hover:text-primary" />
      </div>
      <div className="w-full md:w-64 h-40 shrink-0">
        <PreviewRenderer
          code={item.code}
          category={item.category}
          name={item.name}
        />
      </div>
      <div className="flex-1 min-w-0 w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="h-8 w-48 font-bold text-sm bg-secondary border-none"
                  autoFocus
                />
                <Button size="icon" variant="ghost" className="size-8 text-emerald-500" onClick={handleNameSave}>
                  <Check className="size-4" />
                </Button>
              </div>
            ) : (
              <h4 className="font-bold text-lg truncate flex items-center gap-2 group/title">
                {item.customName || item.name}
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 opacity-0 group-hover/title:opacity-100 transition-opacity"
                  onClick={() => setIsEditing(true)}
                >
                  <Settings2 className="size-3 text-muted-foreground" />
                </Button>
              </h4>
            )}
            <Badge variant="secondary" className="text-[10px] h-5 uppercase tracking-widest bg-primary/10 text-primary border-none">
              {item.category}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
             <Button
              variant="ghost"
              size="icon"
              className="size-9 text-muted-foreground hover:text-destructive transition-colors rounded-xl bg-secondary/30"
              onClick={() => removeFromCanvas(item.instanceId)}
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Instance Identity</span>
            <p className="text-xs font-mono text-muted-foreground truncate bg-secondary/50 p-2 rounded-lg">ID: {item.instanceId}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Architectural Complexity</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${Math.min((item.complexity || 42) / 2, 100)}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-primary">{item.complexity || 42}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}