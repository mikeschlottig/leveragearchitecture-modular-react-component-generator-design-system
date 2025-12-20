import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UploadCloud,
  Library,
  Palette,
  Box,
  Command,
  Search,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useBuilderStore } from "@/store/use-builder-store";
export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const components = useBuilderStore(s => s.components);
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search primitives..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => navigate("/app/dashboard"))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/app/upload"))}>
            <UploadCloud className="mr-2 h-4 w-4" />
            <span>Upload Assets</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/app/library"))}>
            <Library className="mr-2 h-4 w-4" />
            <span>Library</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/app/palette"))}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Palette Studio</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/app/architect"))}>
            <Box className="mr-2 h-4 w-4" />
            <span>Architect Corner</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Library Components">
          {components.map((comp) => (
            <CommandItem
              key={comp.id}
              onSelect={() => runCommand(() => navigate("/app/library"))}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded bg-muted mr-2">
                <Search className="h-3 w-3" />
              </div>
              <span>{comp.name}</span>
              <span className="ml-auto text-xs text-muted-foreground uppercase">{comp.category}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}