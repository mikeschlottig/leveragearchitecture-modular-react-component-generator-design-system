import React from 'react';
import { Box, Code2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBuilderStore } from '@/store/use-builder-store';
interface PreviewRendererProps {
  code?: string;
  category: string;
  name: string;
}
export function PreviewRenderer({ code, category, name }: PreviewRendererProps) {
  const theme = useBuilderStore(s => s.theme);
  // In a real environment, we'd use a sandboxed renderer or a library like react-live
  // For this implementation, we provide a "Blueprint View" that visualizes the component structure
  return (
    <div 
      className="w-full h-full bg-muted/20 border border-dashed rounded-xl flex flex-col items-center justify-center overflow-hidden relative group/preview"
      style={{ borderColor: `${theme.primaryColor}30` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity" />
      <div className="p-8 text-center space-y-4">
        <div 
          className="size-12 rounded-2xl mx-auto flex items-center justify-center shadow-lg"
          style={{ backgroundColor: theme.primaryColor, color: '#fff' }}
        >
          <Box className="size-6" />
        </div>
        <div>
          <h4 className="font-bold text-sm tracking-tight">{name}</h4>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
            {category} Primitive
          </p>
        </div>
        <div className="flex items-center gap-1.5 justify-center bg-background/50 backdrop-blur-sm border px-3 py-1 rounded-full text-[9px] font-mono text-muted-foreground">
          <Code2 className="size-3" />
          <span>neural_source_ready.tsx</span>
        </div>
      </div>
      {/* Decorative Blueprint Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-1/2 w-full h-px bg-primary" />
        <div className="absolute left-1/2 h-full w-px bg-primary" />
        <div className="absolute top-0 left-0 size-8 border-l border-t border-primary" />
        <div className="absolute bottom-0 right-0 size-8 border-r border-b border-primary" />
      </div>
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-40">
        <AlertCircle className="size-3" />
        <span className="text-[8px] font-bold uppercase tracking-widest">Blueprint View</span>
      </div>
    </div>
  );
}