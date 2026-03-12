import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Check, Clock, XCircle, Loader2 } from "lucide-react";
import { senderIdsApi } from "@/lib/api";
import { toast } from "sonner";

const SenderIds = () => {
  const [senderIds, setSenderIds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await senderIdsApi.list();
      if (res.success) setSenderIds(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async () => {
    if (!newName.trim()) return toast.error("Enter a sender name");
    try {
      setSaving(true);
      const res = await senderIdsApi.request({ sender_name: newName.trim().toUpperCase() });
      if (res.success) {
        toast.success("Sender ID requested. Pending approval.");
        setShowDialog(false);
        setNewName("");
        loadData();
      } else toast.error(res.message || "Failed");
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sender IDs</h1>
          <p className="text-sm text-muted-foreground">Manage your registered sender IDs</p>
        </div>
        <Button className="gap-1.5" onClick={() => setShowDialog(true)}><Plus className="h-4 w-4" /> Request Sender ID</Button>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Your Sender IDs</CardTitle></CardHeader>
        <CardContent>
          {senderIds.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No sender IDs yet. Request your first one!</p>
          ) : (
            <div className="space-y-3">
              {senderIds.map((s: any) => (
                <div key={s.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-semibold text-card-foreground">{s.sender_name}</p>
                    <p className="text-xs text-muted-foreground">Requested: {s.created_at ? new Date(s.created_at).toLocaleDateString() : "—"}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                    (s.status === "approved" || s.status === "Approved") ? "bg-success/10 text-success" :
                    (s.status === "pending" || s.status === "Pending") ? "bg-warning/10 text-warning" :
                    "bg-destructive/10 text-destructive"
                  }`}>
                    {(s.status === "approved" || s.status === "Approved") ? <Check className="h-3 w-3" /> :
                     (s.status === "pending" || s.status === "Pending") ? <Clock className="h-3 w-3" /> :
                     <XCircle className="h-3 w-3" />}
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Request Sender ID</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Sender Name</Label>
              <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. MYSHOP" maxLength={11} />
              <p className="text-xs text-muted-foreground">Max 11 characters, alphanumeric only</p>
            </div>
            <Button onClick={handleRequest} disabled={saving} className="w-full">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SenderIds;
