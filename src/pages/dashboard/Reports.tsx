import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Loader2 } from "lucide-react";
import { reportsApi } from "@/lib/api";

const Reports = () => {
  const [summary, setSummary] = useState<any>(null);
  const [deliveryLog, setDeliveryLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [summaryRes, deliveryRes] = await Promise.all([
          reportsApi.getSummary(),
          reportsApi.getDelivery(),
        ]);
        if (summaryRes.success) setSummary(summaryRes.data);
        if (deliveryRes.success) setDeliveryLog(deliveryRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  const deliveryData = summary?.delivery_breakdown || [
    { name: "Delivered", value: summary?.delivered_pct || 0, color: "hsl(var(--success))" },
    { name: "Pending", value: summary?.pending_pct || 0, color: "hsl(var(--warning))" },
    { name: "Failed", value: summary?.failed_pct || 0, color: "hsl(var(--destructive))" },
  ];

  const trendData = summary?.trend_data || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground">Analytics and delivery reports for your SMS campaigns</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Delivery Status</CardTitle></CardHeader>
          <CardContent>
            {deliveryData.some((d: any) => d.value > 0) ? (
              <div className="flex items-center gap-8">
                <div className="h-48 w-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={deliveryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                        {deliveryData.map((entry: any) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {deliveryData.map((item: any) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                      <span className="text-sm font-semibold text-card-foreground">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">No delivery data yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Sending Trend</CardTitle></CardHeader>
          <CardContent>
            {trendData.length > 0 ? (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                    <Line type="monotone" dataKey="sent" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">No trend data yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Delivery Log</CardTitle></CardHeader>
          <CardContent>
            {deliveryLog.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No delivery reports yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-left font-medium text-muted-foreground">Phone</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Campaign</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Network</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Status</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveryLog.map((row: any, i: number) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="py-3 font-mono text-card-foreground">{row.phone}</td>
                        <td className="py-3 text-muted-foreground">{row.campaign_name || "—"}</td>
                        <td className="py-3 text-muted-foreground">{row.network || "—"}</td>
                        <td className="py-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            row.status === "delivered" || row.status === "Delivered" ? "bg-success/10 text-success" :
                            row.status === "pending" || row.status === "Pending" ? "bg-warning/10 text-warning" :
                            "bg-destructive/10 text-destructive"
                          }`}>{row.status}</span>
                        </td>
                        <td className="py-3 text-muted-foreground">{row.delivered_at || row.created_at || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
