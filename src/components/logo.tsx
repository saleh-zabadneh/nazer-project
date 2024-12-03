import { cn } from "@/lib/utils";

function Logo({ className = "" }) {
  return (
    <img
      src="/logo.jpg"
      alt="Company Logo"
      className={cn("h-44 w-44", className)}
    />
  );
}

export default Logo;
