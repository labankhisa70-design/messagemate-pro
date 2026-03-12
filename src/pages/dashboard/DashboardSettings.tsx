import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { settingsApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const DashboardSettings = () => {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", company: "" });
  const [passwords, setPasswords] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        company: user.company || "",
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);
      const res = await settingsApi.updateProfile(profile);
      if (res.success) {
        toast.success("Profile updated");
        refreshUser();
      } else toast.error(res.message || "Failed");
    } catch (err: any) { toast.error(err.message); }
    finally { setSavingProfile(false); }
  };

  const handleChangePassword = async () => {
    if (passwords.new_password !== passwords.confirm_password) return toast.error("Passwords don't match");
    if (passwords.new_password.length < 6) return toast.error("Password must be at least 6 characters");
    try {
      setSavingPassword(true);
      const res = await settingsApi.changePassword({
        current_password: passwords.current_password,
        new_password: passwords.new_password,
      });
      if (res.success) {
        toast.success("Password updated");
        setPasswords({ current_password: "", new_password: "", confirm_password: "" });
      } else toast.error(res.message || "Failed");
    } catch (err: any) { toast.error(err.message); }
    finally { setSavingPassword(false); }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Full Name</Label><Input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} /></div>
            <div className="space-y-2"><Label>Email</Label><Input value={profile.email} type="email" disabled className="opacity-60" /><p className="text-xs text-muted-foreground">Email cannot be changed</p></div>
            <div className="space-y-2"><Label>Phone</Label><Input value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} /></div>
            <div className="space-y-2"><Label>Company</Label><Input value={profile.company} onChange={e => setProfile({...profile, company: e.target.value})} /></div>
            <Button onClick={handleSaveProfile} disabled={savingProfile}>
              {savingProfile ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Change Password</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Current Password</Label><Input type="password" value={passwords.current_password} onChange={e => setPasswords({...passwords, current_password: e.target.value})} /></div>
            <div className="space-y-2"><Label>New Password</Label><Input type="password" value={passwords.new_password} onChange={e => setPasswords({...passwords, new_password: e.target.value})} /></div>
            <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" value={passwords.confirm_password} onChange={e => setPasswords({...passwords, confirm_password: e.target.value})} /></div>
            <Button onClick={handleChangePassword} disabled={savingPassword}>
              {savingPassword ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : "Update Password"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSettings;
