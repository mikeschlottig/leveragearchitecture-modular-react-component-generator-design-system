import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical, Box } from 'lucide-react';
import { ComponentPrimitive } from '@/store/use-builder-store';
import { cn } from '@/lib/utils';
interface DraggablePrimitiveProps {
  component: ComponentPrimitive;
}
export function DraggablePrimitive({ component }: DraggablePrimitiveProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: component.id,
    data: {
      type: 'primitive',
      component
    }
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "p-3 rounded-lg border bg-card hover:border-primary cursor-grab flex items-center gap-3 transition-all",
        isDragging && "opacity-50 border-primary shadow-lg scale-95"
      )}
    >
      <GripVertical className="size-4 text-muted-foreground/50" />
      <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
        <Box className="size-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{component.name}</p>
        <p className="text-[10px] text-muted-foreground uppercase">{component.category}</p>
      </div>
    </div>
  );
}