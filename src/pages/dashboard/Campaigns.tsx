import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Send, Clock, CheckCircle, XCircle } from "lucide-react";

const campaigns = [
  { name: "March Promotion", sender: "ABANCOOL", sent: 5200, delivered: 5108, failed: 92, status: "Completed", date: "Mar 10, 2026" },
  { name: "OTP Service", sender: "Abancool SMS", sent: 12400, delivered: 12380, failed: 20, status: "Active", date: "Ongoing" },
  { name: "Easter Sale", sender: "ABANCOOL", sent: 0, delivered: 0, failed: 0, status: "Scheduled", date: "Apr 1, 2026" },
  { name: "Customer Survey", sender: "Abancool SMS", sent: 3200, delivered: 3150, failed: 50, status: "Completed", date: "Mar 5, 2026" },
  { name: "Welcome Series", sender: "ABANCOOL", sent: 890, delivered: 885, failed: 5, status: "Active", date: "Ongoing" },
];

const statusConfig: Record<string, { icon: typeof Send; className: string }> = {
  Active: { icon: Send, className: "bg-success/10 text-success" },
  Completed: { icon: CheckCircle, className: "bg-primary/10 text-primary" },
  Scheduled: { icon: Clock, className: "bg-warning/10 text-warning" },
  Failed: { icon: XCircle, className: "bg-destructive/10 text-destructive" },
};

const Campaigns = () => {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
          <p className="text-sm text-muted-foreground">Manage and monitor your SMS campaigns</p>
        </div>
        <Button className="gap-1.5">
          <Plus className="h-4 w-4" /> New Campaign
        </Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
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
                {campaigns.map((c) => {
                  const config = statusConfig[c.status];
                  return (
                    <tr key={c.name} className="border-b border-border/50 last:border-0">
                      <td className="py-3 font-medium text-card-foreground">{c.name}</td>
                      <td className="py-3 text-muted-foreground">{c.sender}</td>
                      <td className="py-3 text-right text-card-foreground">{c.sent.toLocaleString()}</td>
                      <td className="py-3 text-right text-success">{c.delivered.toLocaleString()}</td>
                      <td className="py-3 text-right text-destructive">{c.failed.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
                          <config.icon className="h-3 w-3" />
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">{c.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Campaigns;
