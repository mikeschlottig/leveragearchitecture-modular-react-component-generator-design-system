import React, { useState, useEffect } from 'react';
import { UploadCloud, Code2, ImageIcon, FileText, Loader2, Cpu, Terminal, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useBuilderStore } from '@/store/use-builder-store';
import { chatService } from '@/lib/chat';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
export function UploadView() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [snippet, setSnippet] = useState('');
  const addComponent = useBuilderStore((s) => s.addComponent);
  const addLog = (msg: string) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  const handleExtraction = async (content: string) => {
    if (!content.trim()) return;
    setIsProcessing(true);
    setProgress(10);
    setLogs([]);
    addLog("Initializing Neural Engine...");
    try {
      await new Promise(r => setTimeout(r, 800));
      setProgress(30);
      addLog("Analyzing Architectural AST...");
      const result = await chatService.extractPrimitive(content);
      if (result.success && result.data) {
        setProgress(70);
        addLog(`Identified pattern: ${result.data.category}`);
        addLog("Optimizing Tailwind utility mapping...");
        await new Promise(r => setTimeout(r, 600));
        setProgress(100);
        addLog("Primitive successfully structured.");
        addComponent({
          id: crypto.randomUUID(),
          name: result.data.name,
          category: result.data.category,
          tags: result.data.tags || [],
          code: result.data.code
        });
        toast.success('Extraction Complete', {
          description: `Added ${result.data.name} to your library.`,
        });
      } else {
        throw new Error(result.error || "Intelligence Engine failed to parse content.");
      }
    } catch (err: any) {
      addLog(`ERROR: ${err.message}`);
      toast.error('Extraction Failed', { description: err.message });
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Cpu className="size-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Intelligence Ingestion</h1>
          </div>
          <p className="text-muted-foreground text-lg">Convert messy code and visual assets into structured architectural primitives.</p>
        </header>
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-muted/50 p-1">
            <TabsTrigger value="code" className="gap-2"><Code2 className="size-4" /> Project</TabsTrigger>
            <TabsTrigger value="screenshot" className="gap-2"><ImageIcon className="size-4" /> Visual</TabsTrigger>
            <TabsTrigger value="html" className="gap-2"><FileText className="size-4" /> Snippet</TabsTrigger>
          </TabsList>
          <TabsContent value="html">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Source Snippet</CardTitle>
                <CardDescription>Paste raw JSX, HTML, or SVG to extract its core structure.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <textarea
                  value={snippet}
                  onChange={(e) => setSnippet(e.target.value)}
                  className="w-full min-h-[240px] p-4 rounded-xl bg-secondary/50 font-mono text-sm border focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="<div className='bg-blue-500 rounded-lg p-4'>...</div>"
                />
                <Button 
                  className="w-full h-12 text-lg font-semibold" 
                  disabled={isProcessing || !snippet.trim()} 
                  onClick={() => handleExtraction(snippet)}
                >
                  {isProcessing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Cpu className="mr-2 h-5 w-5" />}
                  {isProcessing ? 'Analyzing Architecture...' : 'Trigger Extraction'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="code">
            <Card className="border-dashed border-2 py-20 bg-muted/20">
              <CardContent className="center-col text-center">
                <div className="h-20 w-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-6">
                  <UploadCloud className="h-10 w-10 text-primary/40" />
                </div>
                <h3 className="text-xl font-bold mb-2">Architectural Crawler</h3>
                <p className="text-muted-foreground max-w-sm mb-8">Upload a ZIP of your project. We'll crawl for recurring patterns and global components.</p>
                <Button disabled variant="outline">Enterprise Access Only</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="screenshot">
            <Card className="border-dashed border-2 py-20 bg-muted/20">
              <CardContent className="center-col text-center">
                <div className="h-20 w-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-6">
                  <ImageIcon className="h-10 w-10 text-primary/40" />
                </div>
                <h3 className="text-xl font-bold mb-2">Vision-to-JSX</h3>
                <p className="text-muted-foreground max-w-sm mb-8">Drop a screenshot to generate pixel-perfect Tailwind primitives.</p>
                <Button disabled variant="outline">Enterprise Access Only</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <AnimatePresence>
          {(isProcessing || logs.length > 0) && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Card className="bg-slate-950 text-slate-50 border-slate-800 overflow-hidden shadow-2xl">
                <CardHeader className="border-b border-slate-800 py-3 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="size-4 text-emerald-400" />
                    <span className="text-xs font-mono font-bold tracking-widest uppercase">Neural Processing Log</span>
                  </div>
                  {isProcessing && <Loader2 className="size-3 animate-spin text-emerald-400" />}
                </CardHeader>
                <CardContent className="p-4 font-mono text-xs space-y-2 min-h-[160px] max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-slate-500 shrink-0 select-none">›</span>
                      <span className={log.includes('ERROR') ? 'text-rose-400' : 'text-emerald-500/90'}>{log}</span>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="pt-4">
                      <Progress value={progress} className="h-1 bg-slate-800" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}