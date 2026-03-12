import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, FileText, MoreHorizontal, Loader2 } from "lucide-react";
import { templatesApi } from "@/lib/api";
import { toast } from "sonner";

const Templates = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ name: "", message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await templatesApi.list();
      if (res.success) setTemplates(res.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!newTemplate.name || !newTemplate.message) return toast.error("Name and message required");
    try {
      setSaving(true);
      const res = await templatesApi.create(newTemplate);
      if (res.success) {
        toast.success("Template created");
        setShowDialog(false);
        setNewTemplate({ name: "", message: "" });
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
          <h1 className="text-2xl font-bold text-foreground">Templates</h1>
          <p className="text-sm text-muted-foreground">Save and reuse SMS message templates</p>
        </div>
        <Button className="gap-1.5" onClick={() => setShowDialog(true)}><Plus className="h-4 w-4" /> New Template</Button>
      </div>

      {templates.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">No templates yet. Create your first one!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {templates.map((t: any) => (
            <Card key={t.id} className="shadow-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <p className="font-semibold text-card-foreground">{t.name}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3">{t.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Template</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Template Name</Label><Input value={newTemplate.name} onChange={e => setNewTemplate({...newTemplate, name: e.target.value})} placeholder="e.g. OTP Verification" /></div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea value={newTemplate.message} onChange={e => setNewTemplate({...newTemplate, message: e.target.value})} placeholder="Your verification code is {code}. Valid for 5 minutes." rows={4} />
              <p className="text-xs text-muted-foreground">Use {'{variable}'} for dynamic content</p>
            </div>
            <Button onClick={handleCreate} disabled={saving} className="w-full">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Create Template
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Templates;
