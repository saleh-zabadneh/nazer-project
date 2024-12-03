import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/toggle-theme";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "../logo";
export default function Header() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const clearSession = useAuthStore((state) => state.clearSession);
  const session = useAuthStore((state) => state.session);

  const handleLogout = () => {
    clearSession();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center w-full gap-4">
        <SidebarTrigger className="-ml-2" />
        <Separator orientation="vertical" className="h-6" />
        <Logo className="w-9 h-9" />
        <div className="flex-grow" />
        <div className="flex items-center gap-4">
          {session && (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={`https://avatar.vercel.sh/${session.user.name}.png`}
                  alt={session.user.name}
                />
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{session.user.name}</span>
            </div>
          )}
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
