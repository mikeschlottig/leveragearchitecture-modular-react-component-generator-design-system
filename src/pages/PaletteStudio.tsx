import React, { useState } from 'react';
import { Palette, Type, Wand2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
export function PaletteStudio() {
  const [borderRadius, setBorderRadius] = useState([8]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Palette className="size-4" /> Global Theme</CardTitle>
              <CardDescription>Adjust the visual language for all primitives.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  {['#0F172A', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'].map(color => (
                    <button 
                      key={color} 
                      className="size-8 rounded-full border-2 border-transparent hover:border-primary transition-all" 
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <div className="size-8 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-muted">+</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Corner Radius</Label>
                  <span className="text-xs text-muted-foreground">{borderRadius}px</span>
                </div>
                <Slider value={borderRadius} onValueChange={setBorderRadius} max={32} step={1} />
              </div>
              <div className="space-y-4">
                <Label>Typography</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start"><Type className="size-3 mr-2" /> Inter</Button>
                  <Button variant="outline" size="sm" className="justify-start font-serif">Sora</Button>
                </div>
              </div>
              <Button className="w-full gap-2"><Wand2 className="size-4" /> AI Theme Assistant</Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <Card className="h-full bg-muted/20 border-dashed">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-background/50">
              <div>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>Visual feedback of your theme changes.</CardDescription>
              </div>
              <Button variant="ghost" size="sm"><RefreshCw className="size-3 mr-2" /> Reset Preview</Button>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[400px]">
              <div className="space-y-8 text-center max-w-sm">
                <div className="space-y-4">
                  <Button style={{ borderRadius: `${borderRadius}px` }} size="lg" className="w-full">
                    Primary Action
                  </Button>
                  <div className="flex gap-2">
                     <Button variant="outline" style={{ borderRadius: `${borderRadius}px` }} className="flex-1">
                      Secondary
                    </Button>
                     <Button variant="secondary" style={{ borderRadius: `${borderRadius}px` }} className="flex-1">
                      Tertiary
                    </Button>
                  </div>
                </div>
                <div className="p-6 bg-background shadow-sm border" style={{ borderRadius: `${borderRadius}px` }}>
                  <h3 className="font-bold mb-2">Component Card</h3>
                  <p className="text-sm text-muted-foreground">The quick brown fox jumps over the lazy dog.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}