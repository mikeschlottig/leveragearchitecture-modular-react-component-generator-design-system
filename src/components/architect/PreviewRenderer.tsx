import React, { useState, useMemo } from 'react';
import { AlertCircle, Maximize2 } from 'lucide-react';
import { useBuilderStore } from '@/store/use-builder-store';
import { useDebounce } from 'react-use';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
interface PreviewRendererProps {
  code?: string;
  category: string;
  name: string;
}
export function PreviewRenderer({ code, name }: PreviewRendererProps) {
  const fontFamily = useBuilderStore(s => s.theme.fontFamily);
  const primaryColor = useBuilderStore(s => s.theme.primaryColor);
  const borderRadius = useBuilderStore(s => s.theme.borderRadius);
  const [debouncedTheme, setDebouncedTheme] = useState({ fontFamily, primaryColor, borderRadius });
  const [isFullscreen, setIsFullscreen] = useState(false);
  useDebounce(
    () => {
      setDebouncedTheme({ fontFamily, primaryColor, borderRadius });
    },
    300,
    [fontFamily, primaryColor, borderRadius]
  );
  const htmlContent = useMemo(() => {
    if (!code) return '';
    // Clean code for browser execution
    // Handle markdown blocks and common JSX attributes
    const processed = code
      .replace(/```(?:jsx|tsx|html|javascript|js)?\n?([\s\S]*?)```/g, '$1')
      .replace(/className=/g, 'class=')
      .replace(/\{['"]([^'"]+)['"]\}/g, '$1')
      .replace(/export default [^;]*;/g, '')
      .replace(/import [^;]*;/g, '')
      .trim();
    const fontSlug = debouncedTheme.fontFamily.replace(/\s+/g, '+');
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=${fontSlug}:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            :root {
              --primary: ${debouncedTheme.primaryColor};
              --radius: ${debouncedTheme.borderRadius}px;
            }
            * {
              transition: all 0.2s ease-in-out;
            }
            body {
              font-family: '${debouncedTheme.fontFamily}', sans-serif;
              margin: 0;
              padding: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background-color: transparent;
            }
            .preview-wrap {
              width: 100%;
              max-width: 100%;
              border-radius: var(--radius);
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .bg-primary { background-color: var(--primary) !important; }
            .text-primary { color: var(--primary) !important; }
            .border-primary { border-color: var(--primary) !important; }
            .rounded-lg { border-radius: var(--radius) !important; }
            .rounded-xl { border-radius: calc(var(--radius) * 1.5) !important; }
          </style>
        </head>
        <body>
          <div class="preview-wrap">
            ${processed}
          </div>
        </body>
      </html>
    `;
  }, [code, debouncedTheme]);
  const PreviewFrame = ({ className }: { className?: string }) => (
    <div className={className || "w-full h-full relative group/preview bg-white/80 dark:bg-slate-900/50 rounded-xl overflow-hidden border shadow-inner transition-all hover:bg-white dark:hover:bg-slate-900"}>
      {code ? (
        <iframe
          title={`Preview of ${name}`}
          srcDoc={htmlContent}
          className="w-full h-full border-none"
          sandbox="allow-scripts"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
          <AlertCircle className="size-6 text-muted-foreground mb-2" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-50">Blueprint View</p>
          <p className="text-xs mt-1 font-medium">{name}</p>
        </div>
      )}
      <div className="absolute top-3 right-3 flex gap-2">
        <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="secondary" className="size-8 rounded-full opacity-0 group-hover/preview:opacity-100 transition-opacity shadow-lg">
              <Maximize2 className="size-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 overflow-hidden border-none shadow-2xl">
            <div className="w-full h-full bg-slate-100 dark:bg-slate-950">
               <iframe
                title={`Fullscreen Preview of ${name}`}
                srcDoc={htmlContent}
                className="w-full h-full border-none"
                sandbox="allow-scripts"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover/preview:opacity-100 transition-opacity">
        <div className="bg-background/90 backdrop-blur-md px-3 py-1 rounded-full border shadow-sm text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
          Live Render
        </div>
      </div>
    </div>
  );
  return <PreviewFrame />;
}