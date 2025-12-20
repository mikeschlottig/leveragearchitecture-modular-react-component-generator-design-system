import React from 'react';
import { Search, Filter, MoreHorizontal, Code, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_COMPONENTS } from '@/lib/mock-data';
export function LibraryView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Component Library</h1>
            <p className="text-muted-foreground">A repository of your extracted React primitives.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input className="pl-9 bg-secondary" placeholder="Search primitives..." />
            </div>
            <Button variant="outline" size="icon"><Filter className="size-4" /></Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_COMPONENTS.map((comp) => (
            <Card key={comp.id} className="overflow-hidden group hover:ring-2 hover:ring-primary/20 transition-all">
              <div className="aspect-video bg-muted flex items-center justify-center p-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                {/* Simulated Preview Box */}
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                  <Code className="size-8 text-muted-foreground/40" />
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{comp.name}</h3>
                  <Badge variant="secondary" className="text-[10px] uppercase">{comp.category}</Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {comp.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-muted-foreground px-1.5 py-0.5 bg-muted rounded">#{tag}</span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <Button variant="ghost" size="sm" className="h-8 px-2"><ExternalLink className="size-3 mr-2" /> Details</Button>
                <Button variant="ghost" size="sm" className="h-8 px-2"><MoreHorizontal className="size-4" /></Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}