import React from 'react';
import { Palette, Type, Wand2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useBuilderStore } from '@/store/use-builder-store';
import { cn } from '@/lib/utils';
export function PaletteStudio() {
  const theme = useBuilderStore((s) => s.theme);
  const updateTheme = useBuilderStore((s) => s.updateTheme);
  const colors = [
    { name: 'Slate', value: '#0F172A' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Emerald', value: '#10B981' },
    { name: 'Amber', value: '#F59E0B' },
    { name: 'Rose', value: '#EF4444' },
    { name: 'Violet', value: '#8B5CF6' },
  ];
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
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => updateTheme({ primaryColor: color.value })}
                      className={cn(
                        "size-8 rounded-full border-2 transition-all hover:scale-110",
                        theme.primaryColor === color.value ? "border-primary ring-2 ring-primary/20 scale-110" : "border-transparent"
                      )}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Corner Radius</Label>
                  <span className="text-xs font-mono text-muted-foreground">{theme.borderRadius}px</span>
                </div>
                <Slider 
                  value={[theme.borderRadius]} 
                  onValueChange={(vals) => updateTheme({ borderRadius: vals[0] })} 
                  max={32} 
                  step={1} 
                />
              </div>
              <div className="space-y-4">
                <Label>Typography</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={theme.fontFamily === 'Inter' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => updateTheme({ fontFamily: 'Inter' })}
                    className="justify-start"
                  >
                    <Type className="size-3 mr-2" /> Inter
                  </Button>
                  <Button 
                    variant={theme.fontFamily === 'Sora' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => updateTheme({ fontFamily: 'Sora' })}
                    className="justify-start font-serif"
                  >
                    Sora
                  </Button>
                </div>
              </div>
              <Button className="w-full gap-2" variant="secondary"><Wand2 className="size-4" /> AI Theme Assistant</Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <Card className="h-full bg-muted/20 border-dashed">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-background/50">
              <div>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>Instant feedback across core UI elements.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => updateTheme({ primaryColor: '#3B82F6', borderRadius: 8, fontFamily: 'Inter' })}>
                <RefreshCw className="size-3 mr-2" /> Reset
              </Button>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[400px]">
              <div className={cn("space-y-8 text-center max-w-sm w-full", theme.fontFamily === 'Sora' ? "font-display" : "font-sans")}>
                <div className="space-y-4">
                  <Button 
                    style={{ borderRadius: `${theme.borderRadius}px`, backgroundColor: theme.primaryColor }} 
                    size="lg" 
                    className="w-full text-white hover:opacity-90 transition-opacity"
                  >
                    Primary Action
                  </Button>
                  <div className="flex gap-2">
                     <Button variant="outline" style={{ borderRadius: `${theme.borderRadius}px`, borderColor: theme.primaryColor, color: theme.primaryColor }} className="flex-1">
                      Secondary
                    </Button>
                     <Button variant="secondary" style={{ borderRadius: `${theme.borderRadius}px` }} className="flex-1">
                      Tertiary
                    </Button>
                  </div>
                </div>
                <div className="p-6 bg-background shadow-lg border text-left" style={{ borderRadius: `${theme.borderRadius}px` }}>
                  <div className="size-8 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}>
                    <Palette className="size-4" />
                  </div>
                  <h3 className="font-bold mb-2">Adaptive Primitive</h3>
                  <p className="text-sm text-muted-foreground">This card reflects your global border radius and color tokens immediately.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}