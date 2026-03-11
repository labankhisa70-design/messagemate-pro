import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-hero lg:flex lg:items-center lg:justify-center">
        <div className="max-w-md px-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
              <MessageSquare className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h2 className="mb-3 text-3xl font-bold text-primary-foreground">Welcome back</h2>
          <p className="text-primary-foreground/60">
            Sign in to manage your SMS campaigns, contacts, and analytics.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Abancool SMS</span>
          </Link>

          <h1 className="mb-2 text-2xl font-bold text-foreground">Sign in</h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Enter your credentials to access your dashboard
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/dashboard";
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">Sign in</Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
