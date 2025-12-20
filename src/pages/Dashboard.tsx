import React from 'react';
import { Library, Layers, Cpu, TrendingUp, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBuilderStore } from '@/store/use-builder-store';
export function Dashboard() {
  const components = useBuilderStore(s => s.components);
  const canvasCount = useBuilderStore(s => s.canvasItems.length);
  const primaryColor = useBuilderStore(s => s.theme.primaryColor);
  const totalPrimitives = components.length;
  const neuralExtractsCount = components.filter(c => c.extractedAt).length;
  const chartData = [
    { name: 'Elements', value: components.filter(c => c.category === 'Elements').length * 10 + 5 },
    { name: 'Forms', value: components.filter(c => c.category === 'Forms').length * 10 + 2 },
    { name: 'Cards', value: components.filter(c => c.category === 'Cards').length * 10 + 8 },
    { name: 'Layout', value: components.filter(c => c.category === 'Layout').length * 10 + 4 },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
      <div className="flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">System Monitor</h1>
          <p className="text-muted-foreground mt-1">Real-time telemetry for your architectural design system.</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Primitives"
            value={totalPrimitives}
            icon={<Library className="size-4" />}
            trend={`+${totalPrimitives > 0 ? '1' : '0'}`}
          />
          <StatCard
            title="Active Canvas Items"
            value={canvasCount}
            icon={<Layers className="size-4" />}
            trend={canvasCount > 5 ? "+12%" : undefined}
          />
          <StatCard
            title="Neural Extracts"
            value={neuralExtractsCount}
            icon={<Cpu className="size-4" />}
          />
          <StatCard
            title="Reliability Index"
            value="99.2%"
            icon={<TrendingUp className="size-4" />}
            trend="+0.4%"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="size-4 text-primary" />
                Category Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={primaryColor} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={primaryColor}
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorPrimary)"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Latest Pulses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {components.slice(0, 5).map((comp) => (
                  <div key={comp.id} className="flex items-center gap-4 group cursor-default">
                    <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      <Clock className="size-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate leading-none">{comp.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-wider">{comp.category}</p>
                    </div>
                    <Badge variant="outline" className="text-[9px] shrink-0">READY</Badge>
                  </div>
                ))}
                {components.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-10">Waiting for intelligence extraction...</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}