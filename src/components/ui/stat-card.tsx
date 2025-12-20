import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}
export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("glass overflow-hidden border-border/50 transition-all hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
        <div className="flex items-end justify-between mt-2">
          <div className="text-2xl font-bold tracking-tight">{value}</div>
          {trend && (
            <div className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full",
              trend.startsWith('+') ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
            )}>
              {trend}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}