import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Send, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { campaignsApi } from "@/lib/api";

const statusConfig: Record<string, { icon: typeof Send; className: string }> = {
  active: { icon: Send, className: "bg-success/10 text-success" },
  Active: { icon: Send, className: "bg-success/10 text-success" },
  completed: { icon: CheckCircle, className: "bg-primary/10 text-primary" },
  Completed: { icon: CheckCircle, className: "bg-primary/10 text-primary" },
  scheduled: { icon: Clock, className: "bg-warning/10 text-warning" },
  Scheduled: { icon: Clock, className: "bg-warning/10 text-warning" },
  failed: { icon: XCircle, className: "bg-destructive/10 text-destructive" },
  Failed: { icon: XCircle, className: "bg-destructive/10 text-destructive" },
};

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await campaignsApi.list({ limit: 50 });
        if (res.success) setCampaigns(res.data || []);
      } catch (err) {
        console.error("Failed to load campaigns:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
          <p className="text-sm text-muted-foreground">Manage and monitor your SMS campaigns</p>
        </div>
        <Button className="gap-1.5"><Plus className="h-4 w-4" /> New Campaign</Button>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">All Campaigns</CardTitle></CardHeader>
        <CardContent>
          {campaigns.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No campaigns yet. Create your first campaign!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left font-medium text-muted-foreground">Campaign</th>
                    <th className="pb-3 text-left font-medium text-muted-foreground">Sender</th>
                    <th className="pb-3 text-right font-medium text-muted-foreground">Sent</th>
                    <th className="pb-3 text-right font-medium text-muted-foreground">Delivered</th>
                    <th className="pb-3 text-right font-medium text-muted-foreground">Failed</th>
                    <th className="pb-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 text-left font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c: any) => {
                    const config = statusConfig[c.status] || statusConfig.active;
                    return (
                      <tr key={c.id} className="border-b border-border/50 last:border-0">
                        <td className="py-3 font-medium text-card-foreground">{c.name}</td>
                        <td className="py-3 text-muted-foreground">{c.sender_id}</td>
                        <td className="py-3 text-right text-card-foreground">{(c.sent || 0).toLocaleString()}</td>
                        <td className="py-3 text-right text-success">{(c.delivered || 0).toLocaleString()}</td>
                        <td className="py-3 text-right text-destructive">{(c.failed || 0).toLocaleString()}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
                            <config.icon className="h-3 w-3" />{c.status}
                          </span>
                        </td>
                        <td className="py-3 text-muted-foreground">{c.created_at ? new Date(c.created_at).toLocaleDateString() : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Campaigns;
