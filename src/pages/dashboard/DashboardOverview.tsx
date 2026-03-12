import { useState, useEffect } from "react";
import { Send, Users, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardApi, campaignsApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const DashboardOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, campaignsRes] = await Promise.all([
          dashboardApi.getStats(),
          campaignsApi.list({ limit: 4 }),
        ]);
        if (statsRes.success) setStats(statsRes.data);
        if (campaignsRes.success) setCampaigns(campaignsRes.data || []);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    { label: "Messages Sent", value: stats?.messages_sent?.toLocaleString() || "0", change: stats?.messages_change || "+0%", up: true, icon: Send },
    { label: "Contacts", value: stats?.total_contacts?.toLocaleString() || "0", change: stats?.contacts_change || "+0%", up: true, icon: Users },
    { label: "SMS Credits", value: user?.sms_balance?.toLocaleString() || "0", change: "", up: false, icon: CreditCard },
    { label: "Delivery Rate", value: stats?.delivery_rate || "0%", change: stats?.delivery_change || "+0%", up: true, icon: TrendingUp },
  ];

  const chartData = stats?.chart_data || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, {user?.name || "User"}! Here's your SMS overview.</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                {stat.change && (
                  <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? "text-success" : "text-destructive"}`}>
                    {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="mt-4 text-2xl font-bold text-card-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">SMS Activity (This Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                    <Bar dataKey="sent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="delivered" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No activity data yet. Start sending SMS!</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            {campaigns.length === 0 ? (
              <p className="text-sm text-muted-foreground">No campaigns yet</p>
            ) : (
              <div className="space-y-4">
                {campaigns.map((c: any) => (
                  <div key={c.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.sent?.toLocaleString() || 0} sent</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      c.status === "Completed" || c.status === "completed" ? "bg-success/10 text-success" :
                      c.status === "Active" || c.status === "active" ? "bg-info/10 text-info" :
                      "bg-warning/10 text-warning"
                    }`}>{c.status}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
