import React from 'react';
import { 
  Library, 
  Layers, 
  Cpu, 
  TrendingUp, 
  Clock,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_STATS, CHART_DATA, RECENT_ACTIVITY } from '@/lib/mock-data';
export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
          <p className="text-muted-foreground">Monitoring your architectural primitives and extraction efficiency.</p>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Primitives" 
            value={MOCK_STATS.totalComponents} 
            icon={<Library className="size-4" />} 
            trend="+12%"
          />
          <StatCard 
            title="Saved Blocks" 
            value={MOCK_STATS.savedBlocks} 
            icon={<Layers className="size-4" />} 
            trend="+5%"
          />
          <StatCard 
            title="AI extractions" 
            value={MOCK_STATS.aiExtractions} 
            icon={<Cpu className="size-4" />} 
          />
          <StatCard 
            title="Extraction Success" 
            value="98.4%" 
            icon={<TrendingUp className="size-4" />} 
            trend="+2.1%"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Generation Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          {/* Activity Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {RECENT_ACTIVITY.map((activity, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Clock className="size-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold px-1.5 py-0">
                        {activity.type}
                      </Badge>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground self-center" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}