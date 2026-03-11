import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const deliveryData = [
  { name: "Delivered", value: 94.2, color: "hsl(var(--success))" },
  { name: "Pending", value: 3.1, color: "hsl(var(--warning))" },
  { name: "Failed", value: 2.7, color: "hsl(var(--destructive))" },
];

const trendData = [
  { date: "Mar 1", sent: 3200 },
  { date: "Mar 3", sent: 4100 },
  { date: "Mar 5", sent: 3800 },
  { date: "Mar 7", sent: 5200 },
  { date: "Mar 9", sent: 4600 },
  { date: "Mar 11", sent: 6100 },
];

const Reports = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground">Analytics and delivery reports for your SMS campaigns</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Delivery Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deliveryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                      {deliveryData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {deliveryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-semibold text-card-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Sending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line type="monotone" dataKey="sent" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Delivery Log</CardTitle>
          </CardHeader>
          <CardContent>
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
                  {[
                    { phone: "+254712***678", campaign: "March Promo", network: "Safaricom", status: "Delivered", time: "2 min ago" },
                    { phone: "+254798***432", campaign: "March Promo", network: "Airtel", status: "Delivered", time: "3 min ago" },
                    { phone: "+254723***789", campaign: "OTP Alerts", network: "Safaricom", status: "Pending", time: "5 min ago" },
                    { phone: "+254734***890", campaign: "March Promo", network: "Telkom", status: "Failed", time: "8 min ago" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="py-3 font-mono text-card-foreground">{row.phone}</td>
                      <td className="py-3 text-muted-foreground">{row.campaign}</td>
                      <td className="py-3 text-muted-foreground">{row.network}</td>
                      <td className="py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          row.status === "Delivered" ? "bg-success/10 text-success" :
                          row.status === "Pending" ? "bg-warning/10 text-warning" :
                          "bg-destructive/10 text-destructive"
                        }`}>{row.status}</span>
                      </td>
                      <td className="py-3 text-muted-foreground">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
