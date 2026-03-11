import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";

const packages = [
  { credits: "500 SMS", price: "KES 500", perSms: "KES 1.00" },
  { credits: "5,000 SMS", price: "KES 4,500", perSms: "KES 0.90", popular: true },
  { credits: "10,000 SMS", price: "KES 8,000", perSms: "KES 0.80" },
  { credits: "50,000 SMS", price: "KES 35,000", perSms: "KES 0.70" },
];

const transactions = [
  { date: "Mar 10, 2026", type: "Purchase", amount: "+5,000 credits", payment: "M-PESA", cost: "KES 4,500" },
  { date: "Mar 9, 2026", type: "SMS Sent", amount: "-1,200 credits", payment: "—", cost: "—" },
  { date: "Mar 5, 2026", type: "Purchase", amount: "+10,000 credits", payment: "Card", cost: "KES 8,000" },
];

const Billing = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Billing</h1>
        <p className="text-sm text-muted-foreground">Manage credits and view transactions</p>
      </div>

      <Card className="shadow-card mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-3xl font-bold text-card-foreground">15,200 <span className="text-lg font-normal text-muted-foreground">credits</span></p>
            </div>
            <Button className="gap-1.5"><Plus className="h-4 w-4" /> Buy Credits</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((p) => (
          <Card key={p.credits} className={`shadow-card cursor-pointer transition-all hover:shadow-card-hover ${p.popular ? "border-primary ring-1 ring-primary/20" : ""}`}>
            <CardContent className="p-5 text-center">
              {p.popular && <span className="mb-2 inline-block rounded-full bg-gradient-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">Best Value</span>}
              <p className="text-lg font-bold text-card-foreground">{p.credits}</p>
              <p className="text-2xl font-bold text-primary">{p.price}</p>
              <p className="text-xs text-muted-foreground">{p.perSms} per SMS</p>
              <Button className="mt-4 w-full" variant={p.popular ? "default" : "outline"} size="sm">Purchase</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Transaction History</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="pb-3 text-left font-medium text-muted-foreground">Type</th>
                <th className="pb-3 text-left font-medium text-muted-foreground">Amount</th>
                <th className="pb-3 text-left font-medium text-muted-foreground">Payment</th>
                <th className="pb-3 text-left font-medium text-muted-foreground">Cost</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="py-3 text-muted-foreground">{t.date}</td>
                  <td className="py-3 text-card-foreground">{t.type}</td>
                  <td className={`py-3 font-medium ${t.amount.startsWith("+") ? "text-success" : "text-destructive"}`}>{t.amount}</td>
                  <td className="py-3 text-muted-foreground">{t.payment}</td>
                  <td className="py-3 text-muted-foreground">{t.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
