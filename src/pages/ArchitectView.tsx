import React from 'react';
import { Box, Plus, GripVertical, Settings2, Play, Save } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MOCK_COMPONENTS } from '@/lib/mock-data';
export function ArchitectView() {
  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* Sidebar: Available Primitives */}
      <aside className="w-72 border-r bg-background flex flex-col shrink-0">
        <div className="p-4 border-b">
          <h2 className="font-semibold flex items-center gap-2"><Box className="size-4" /> Primitives</h2>
          <p className="text-xs text-muted-foreground">Drag components to the canvas</p>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {MOCK_COMPONENTS.map(comp => (
              <div 
                key={comp.id} 
                className="p-3 rounded-lg border bg-card hover:border-primary cursor-grab flex items-center gap-3 transition-colors active:cursor-grabbing"
              >
                <GripVertical className="size-4 text-muted-foreground/50" />
                <span className="text-sm font-medium">{comp.name}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
      {/* Main Builder Area */}
      <main className="flex-1 bg-secondary/20 relative flex flex-col">
        {/* Canvas Toolbar */}
        <div className="h-14 border-b bg-background flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">Untitled Template</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="size-8"><Settings2 className="size-4" /></Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Play className="size-3 mr-2" /> Preview</Button>
            <Button size="sm"><Save className="size-3 mr-2" /> Save Block</Button>
          </div>
        </div>
        {/* The "Canvas" */}
        <div className="flex-1 p-12 overflow-auto flex items-center justify-center">
          <div className="w-full max-w-4xl aspect-[16/10] bg-background rounded-2xl border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center text-center p-8">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-6">
              <Plus className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Build your structure</h3>
            <p className="text-muted-foreground max-w-xs">
              Select primitives from the left sidebar and arrange them to create reusable UI blocks.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}