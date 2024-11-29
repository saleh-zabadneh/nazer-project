import { Separator } from "../ui/separator";
import { ThemeToggle } from "../toggle-theme";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  return (
    <header className="flex  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center w-full gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4 mr-2" />
        <div className="flex-grow" />
        {/* This empty div maintains the layout */}
        <ThemeToggle />
      </div>
    </header>
  );
}
