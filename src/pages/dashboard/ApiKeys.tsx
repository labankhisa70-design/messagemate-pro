import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Copy, Key, Loader2 } from "lucide-react";
import { apiKeysApi } from "@/lib/api";
import { toast } from "sonner";

const ApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await apiKeysApi.list();
      if (res.success) setApiKeys(res.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!newKeyName.trim()) return toast.error("Enter a name for the key");
    try {
      setSaving(true);
      const res = await apiKeysApi.create({ name: newKeyName });
      if (res.success) {
        toast.success("API key generated");
        if (res.data?.key) {
          navigator.clipboard.writeText(res.data.key);
          toast.info("Key copied to clipboard! Save it securely.");
        }
        setShowDialog(false);
        setNewKeyName("");
        loadData();
      } else toast.error(res.message || "Failed");
    } catch (err: any) { toast.error(err.message); }
    finally { setSaving(false); }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">API Keys</h1>
          <p className="text-sm text-muted-foreground">Manage your API keys for SMS integration</p>
        </div>
        <Button className="gap-1.5" onClick={() => setShowDialog(true)}><Plus className="h-4 w-4" /> Generate Key</Button>
      </div>

      {apiKeys.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">No API keys yet. Generate your first one!</p>
      ) : (
        <div className="space-y-4">
          {apiKeys.map((k: any) => (
            <Card key={k.id} className="shadow-card">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Key className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground">{k.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">{k.key ? `${k.key.substring(0, 20)}...` : "••••••••"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-xs text-muted-foreground">
                      <p>Created: {k.created_at ? new Date(k.created_at).toLocaleDateString() : "—"}</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => {
                      if (k.key) { navigator.clipboard.writeText(k.key); toast.success("API key copied!"); }
                    }}>
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Generate API Key</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Key Name</Label><Input value={newKeyName} onChange={e => setNewKeyName(e.target.value)} placeholder="e.g. Production API Key" /></div>
            <Button onClick={handleCreate} disabled={saving} className="w-full">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Generate Key
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiKeys;
