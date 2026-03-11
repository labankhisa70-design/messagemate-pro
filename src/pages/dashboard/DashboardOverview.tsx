import { Send, Users, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Messages Sent", value: "24,832", change: "+12.5%", up: true, icon: Send },
  { label: "Contacts", value: "8,421", change: "+5.2%", up: true, icon: Users },
  { label: "SMS Credits", value: "15,200", change: "-8.1%", up: false, icon: CreditCard },
  { label: "Delivery Rate", value: "98.7%", change: "+0.3%", up: true, icon: TrendingUp },
];

const chartData = [
  { name: "Mon", sent: 4200, delivered: 4100 },
  { name: "Tue", sent: 3800, delivered: 3750 },
  { name: "Wed", sent: 5100, delivered: 5020 },
  { name: "Thu", sent: 4600, delivered: 4500 },
  { name: "Fri", sent: 3900, delivered: 3850 },
  { name: "Sat", sent: 2100, delivered: 2080 },
  { name: "Sun", sent: 1800, delivered: 1770 },
];

const recentCampaigns = [
  { name: "March Promo", status: "Delivered", sent: 5200, rate: "98.2%" },
  { name: "OTP Alerts", status: "Sending", sent: 1200, rate: "99.1%" },
  { name: "Newsletter #12", status: "Scheduled", sent: 0, rate: "—" },
  { name: "Flash Sale", status: "Delivered", sent: 8400, rate: "97.8%" },
];

const DashboardOverview = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's your SMS overview.</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? "text-success" : "text-destructive"}`}>
                  {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </span>
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
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="sent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="delivered" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.sent.toLocaleString()} sent • {c.rate}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      c.status === "Delivered"
                        ? "bg-success/10 text-success"
                        : c.status === "Sending"
                        ? "bg-info/10 text-info"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
