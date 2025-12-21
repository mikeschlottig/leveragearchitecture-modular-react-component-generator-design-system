import React, { useState, useEffect, useMemo } from 'react';
import { Box, Code2, AlertCircle, RefreshCw, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBuilderStore } from '@/store/use-builder-store';
interface PreviewRendererProps {
  code?: string;
  category: string;
  name: string;
}
export function PreviewRenderer({ code, category, name }: PreviewRendererProps) {
  const theme = useBuilderStore(s => s.theme);
  const [error, setError] = useState<string | null>(null);
  // Transform JSX-like code for the iframe shell
  const htmlContent = useMemo(() => {
    if (!code) return '';
    // Simple regex for basic replacement of common JSX patterns
    let processed = code
      .replace(/className=/g, 'class=')
      .replace(/onClick=\{[^}]*\}/g, '')
      .replace(/export default [^;]*;/g, '')
      .replace(/import [^;]*;/g, '');
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=${theme.fontFamily}:wght@400;700&display=swap" rel="stylesheet">
          <style>
            :root {
              --primary: ${theme.primaryColor};
              --radius: ${theme.borderRadius}px;
            }
            body { 
              font-family: '${theme.fontFamily}', sans-serif;
              margin: 0;
              padding: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background-color: transparent;
            }
            .preview-container {
              width: 100%;
              border-radius: var(--radius);
            }
          </style>
        </head>
        <body>
          <div class="preview-container">
            ${processed}
          </div>
        </body>
      </html>
    `;
  }, [code, theme]);
  if (error || !code) {
    return (
      <div className="w-full h-full bg-muted/20 border border-dashed rounded-xl flex flex-col items-center justify-center p-4 text-center">
        <AlertCircle className="size-6 text-muted-foreground mb-2" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Blueprint View</p>
        <p className="text-xs mt-1 font-medium">{name}</p>
      </div>
    );
  }
  return (
    <div className="w-full h-full relative group/preview bg-white rounded-xl overflow-hidden border shadow-inner">
      <iframe
        title={`Preview of ${name}`}
        srcDoc={htmlContent}
        className="w-full h-full border-none pointer-events-none"
        sandbox="allow-scripts"
      />
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
        <div className="bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full border shadow-lg flex items-center gap-2 scale-90 group-hover/preview:scale-100 transition-transform">
          <Maximize2 className="size-3 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Live Preview</span>
        </div>
      </div>
    </div>
  );
}