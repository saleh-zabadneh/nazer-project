import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/authStore";
import { simulateLogin } from "@/lib/auth";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion } from "framer-motion";

function LoginForm() {
  const [nationalNumber, setNationalNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    if (useAuthStore.getState().isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const loginMutation = useMutation({
    mutationFn: simulateLogin,
    onSuccess: (data) => {
      setSession(data);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      const from =
        (location.state as { from?: { pathname: string } })?.from?.pathname ||
        "/dashboard";
      navigate(from, { replace: true });
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ nationalNumber, password });
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Please sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="national-number">National Number</Label>
            <div className="relative">
              <User className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2" />
              <Input
                id="national-number"
                name="nationalNumber"
                type="text"
                required
                className="py-6 pl-10 text-lg"
                placeholder="Enter your national number"
                value={nationalNumber}
                onChange={(e) => setNationalNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="py-6 pl-10 text-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </motion.div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <a
          href="/reset-password"
          className="text-sm font-medium text-primary hover:underline"
        >
          Forgot your password?
        </a>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
