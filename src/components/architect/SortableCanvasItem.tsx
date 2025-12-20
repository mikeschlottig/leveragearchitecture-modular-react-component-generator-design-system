import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, Code } from 'lucide-react';
import { CanvasItem, useBuilderStore } from '@/store/use-builder-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
interface SortableCanvasItemProps {
  item: CanvasItem;
}
export function SortableCanvasItem({ item }: SortableCanvasItemProps) {
  const removeFromCanvas = useBuilderStore((s) => s.removeFromCanvas);
  const theme = useBuilderStore((s) => s.theme);
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
    borderRadius: `${theme.borderRadius}px`,
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      layout
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group border bg-card p-4 flex items-center gap-4 transition-shadow",
        isDragging ? "z-50 shadow-2xl opacity-80" : "hover:shadow-md",
        theme.fontFamily === 'Sora' ? "font-display" : "font-sans"
      )}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="size-5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
      </div>
      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center shrink-0">
        <Code className="size-5 text-muted-foreground/60" style={{ color: theme.primaryColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm truncate">{item.name}</span>
          <Badge variant="secondary" className="text-[9px] h-4 px-1">{item.category}</Badge>
        </div>
        <p className="text-xs text-muted-foreground truncate">Ref: {item.instanceId.slice(0, 8)}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
        onClick={() => removeFromCanvas(item.instanceId)}
      >
        <X className="size-4" />
      </Button>
    </motion.div>
  );
}