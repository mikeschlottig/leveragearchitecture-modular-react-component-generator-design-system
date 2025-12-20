import React from 'react';
import { UploadCloud, Code2, ImageIcon, FileText, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
export function UploadView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Ingest Assets</h1>
          <p className="text-muted-foreground">Upload your designs or code to generate reusable React primitives.</p>
        </div>
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-12">
            <TabsTrigger value="code" className="gap-2"><Code2 className="size-4" /> Codebase</TabsTrigger>
            <TabsTrigger value="screenshot" className="gap-2"><ImageIcon className="size-4" /> Screenshot</TabsTrigger>
            <TabsTrigger value="html" className="gap-2"><FileText className="size-4" /> HTML/JSX</TabsTrigger>
          </TabsList>
          <TabsContent value="code">
            <Card className="border-dashed border-2 bg-muted/20">
              <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UploadCloud className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">Drop your project folder here</CardTitle>
                <CardDescription className="mb-6">
                  Supports React, Vue, and plain Tailwind projects. <br />
                  Limit 100MB per upload.
                </CardDescription>
                <Button>Select Files</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="screenshot">
             <Card className="border-dashed border-2 bg-muted/20">
              <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">Upload visual designs</CardTitle>
                <CardDescription className="mb-6">
                  Extract Tailwind UI from Figma exports or PNG screenshots.
                </CardDescription>
                <Button>Select Images</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="html">
            <Card>
              <CardHeader>
                <CardTitle>Paste Snippets</CardTitle>
                <CardDescription>Directly paste HTML or React code to parse specific primitives.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <textarea 
                  className="w-full min-h-[200px] p-4 rounded-lg bg-secondary font-mono text-sm border focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Paste <div className='...'>...</div>"
                />
                <Button className="w-full">Start Extraction</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Processing State Simulation */}
        <Card className="bg-secondary/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span className="text-sm font-medium">Ready for processing</span>
              </div>
              <span className="text-xs text-muted-foreground">0/3 tasks</span>
            </div>
            <Progress value={0} className="h-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}