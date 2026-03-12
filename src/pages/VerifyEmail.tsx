import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare, Mail, Loader2 } from "lucide-react";
import { authApi } from "@/lib/api";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return toast.error("Please enter verification code");

    try {
      setLoading(true);
      const response = await authApi.verifyEmail({ email, code: code.trim() });
      if (response.success) {
        toast.success("Email verified successfully!");
        navigate("/login");
      } else {
        toast.error(response.message || "Invalid verification code");
      }
    } catch (err: any) {
      toast.error(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      const response = await authApi.resendVerification({ email });
      if (response.success) {
        toast.success("Verification code resent to your email");
      } else {
        toast.error(response.message || "Failed to resend code");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to resend");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
            <Mail className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-foreground">Verify your email</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          We sent a verification code to <strong className="text-foreground">{email}</strong>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="text-center text-lg tracking-widest"
              maxLength={6}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</> : "Verify Email"}
          </Button>
        </form>

        <div className="mt-6 space-y-2">
          <Button variant="ghost" size="sm" onClick={handleResend} disabled={resending}>
            {resending ? "Resending..." : "Resend verification code"}
          </Button>
          <p className="text-sm text-muted-foreground">
            <Link to="/login" className="font-medium text-primary hover:underline">Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
