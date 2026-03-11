import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Check, Clock, XCircle } from "lucide-react";

const senderIds = [
  { name: "ABANCOOL", status: "Approved", date: "Jan 15, 2026" },
  { name: "AbanSMS", status: "Approved", date: "Feb 1, 2026" },
  { name: "MyShop", status: "Pending", date: "Mar 8, 2026" },
  { name: "ALERTS", status: "Rejected", date: "Mar 5, 2026" },
];

const SenderIds = () => {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sender IDs</h1>
          <p className="text-sm text-muted-foreground">Manage your registered sender IDs</p>
        </div>
        <Button className="gap-1.5"><Plus className="h-4 w-4" /> Request Sender ID</Button>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Your Sender IDs</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {senderIds.map((s) => (
              <div key={s.name} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-semibold text-card-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">Requested: {s.date}</p>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                  s.status === "Approved" ? "bg-success/10 text-success" :
                  s.status === "Pending" ? "bg-warning/10 text-warning" :
                  "bg-destructive/10 text-destructive"
                }`}>
                  {s.status === "Approved" ? <Check className="h-3 w-3" /> :
                   s.status === "Pending" ? <Clock className="h-3 w-3" /> :
                   <XCircle className="h-3 w-3" />}
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SenderIds;
