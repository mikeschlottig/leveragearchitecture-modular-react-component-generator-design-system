import React, { useState, useMemo } from 'react';
import { Search, Filter, MoreHorizontal, Code, ExternalLink, Trash2, Library, Copy, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useBuilderStore, ComponentPrimitive } from '@/store/use-builder-store';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
export function LibraryView() {
  const components = useBuilderStore(s => s.components);
  const removeComponent = useBuilderStore(s => s.removeComponent);
  const searchQuery = useBuilderStore(s => s.searchQuery);
  const setSearchQuery = useBuilderStore(s => s.setSearchQuery);
  const activeCategory = useBuilderStore(s => s.activeCategory);
  const setActiveCategory = useBuilderStore(s => s.setActiveCategory);
  const [inspecting, setInspecting] = useState<ComponentPrimitive | null>(null);
  const [copied, setCopied] = useState(false);
  const filteredComponents = useMemo(() => {
    return components.filter(comp => {
      const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            comp.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || comp.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [components, searchQuery, activeCategory]);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  const categories = ['All', 'Elements', 'Forms', 'Layout', 'Cards', 'Complex', 'Dashboard'];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Component Library</h1>
            <p className="text-muted-foreground mt-1">A repository of your neural-extracted React primitives.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input 
                className="pl-9 bg-secondary/50 border-none h-11" 
                placeholder="Search primitives..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11"><Filter className="size-4" /></Button>
          </div>
        </div>
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="bg-muted/50 p-1 h-11 flex-wrap md:flex-nowrap overflow-x-auto">
            {categories.map(cat => (
              <TabsTrigger key={cat} value={cat} className="px-6">{cat}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {filteredComponents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed rounded-3xl bg-muted/5">
            <Library className="size-16 text-muted-foreground/30 mb-6" />
            <h3 className="text-xl font-semibold">No results in {activeCategory}</h3>
            <p className="text-muted-foreground mb-8 text-center max-w-sm">Try adjusting your filters or upload new code to expand your library.</p>
            <Link to="/app/upload">
              <Button size="lg" className="rounded-xl px-8">Go to Ingest</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((comp) => (
              <Card key={comp.id} className="overflow-hidden group hover:ring-2 hover:ring-primary/40 transition-all border-none shadow-soft bg-card/50 backdrop-blur-sm">
                <div className="aspect-video bg-muted/30 flex items-center justify-center p-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code className="size-8 text-primary/40" />
                  </div>
                  <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground" variant="outline">
                    {comp.category}
                  </Badge>
                </div>
                <CardContent className="pt-5 px-5">
                  <h3 className="font-bold text-lg truncate mb-2">{comp.name}</h3>
                  <div className="flex flex-wrap gap-1.5 h-12 overflow-hidden items-start">
                    {comp.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-0.5 bg-secondary rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pb-5 px-5 flex justify-between">
                  <Button variant="ghost" size="sm" className="h-9 font-semibold text-primary" onClick={() => setInspecting(comp)}>
                    <ExternalLink className="size-4 mr-2" /> Inspect
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9"><MoreHorizontal className="size-5" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => setInspecting(comp)}>
                        <Code className="mr-2 size-4" /> View Source
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive font-medium" onClick={() => removeComponent(comp.id)}>
                        <Trash2 className="mr-2 size-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Dialog open={!!inspecting} onOpenChange={(open) => !open && setInspecting(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 border-none shadow-2xl">
          <DialogHeader className="p-6 bg-slate-950 text-white shrink-0">
            <div className="flex items-center justify-between pr-8">
              <div>
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                  <Code className="size-6 text-emerald-400" />
                  {inspecting?.name}
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  Optimized React Primitive • Extracted {inspecting?.extractedAt ? new Date(inspecting.extractedAt).toLocaleDateString() : 'recently'}
                </DialogDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-slate-900 border-slate-700 hover:bg-slate-800 text-white gap-2 h-10 px-4"
                onClick={() => inspecting?.code && copyToClipboard(inspecting.code)}
              >
                {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                {copied ? 'Copied' : 'Copy Code'}
              </Button>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-auto p-6 bg-slate-900 font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
            <pre className="text-slate-300">
              <code>{inspecting?.code || '// No source code available'}</code>
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}