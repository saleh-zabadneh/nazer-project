import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "./header";
import { AppSidebar } from "../app-sidebar";
import { useAuthStore } from "@/store/authStore";
import { ProtectedRoute } from "../protected-routes";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const session = useAuthStore((state) => state.session);

  if (!session) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 overflow-y-auto">
          <ProtectedRoute>{children}</ProtectedRoute>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
