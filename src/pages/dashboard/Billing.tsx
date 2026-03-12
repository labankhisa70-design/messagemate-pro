import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Loader2, CreditCard } from "lucide-react";
import { billingApi, mpesaApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Package {
  id: number;
  name: string;
  sms_count: number;
  price: number;
  price_per_sms: number;
  is_popular: boolean;
}

interface Transaction {
  id: number;
  type: string;
  amount: number;
  sms_credits: number;
  payment_method: string;
  status: string;
  created_at: string;
}

const Billing = () => {
  const { user, refreshUser } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [packagesRes, transactionsRes] = await Promise.all([
        billingApi.getPackages(),
        billingApi.getTransactions({ limit: 10 }),
      ]);
      if (packagesRes.success) setPackages(packagesRes.data || []);
      if (transactionsRes.success) setTransactions(transactionsRes.data || []);
    } catch (error) {
      console.error("Failed to load billing data:", error);
      toast.error("Failed to load billing data");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = (pkg: Package) => {
    setSelectedPackage(pkg);
    setShowPaymentDialog(true);
  };

  const handleMpesaPayment = async () => {
    if (!selectedPackage || !phoneNumber) {
      toast.error("Please enter your M-PESA phone number");
      return;
    }
    try {
      setProcessing(true);
      const response = await mpesaApi.initiate({
        package_id: selectedPackage.id,
        phone: phoneNumber,
      });
      if (response.success) {
        toast.success("STK Push sent! Check your phone to complete payment.");
        const transactionId = response.data?.transaction_id;
        if (transactionId) pollPaymentStatus(transactionId);
      } else {
        toast.error(response.message || "Payment initiation failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  const pollPaymentStatus = async (transactionId: string) => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const response = await mpesaApi.checkStatus(transactionId);
        if (response.data?.status === "completed") {
          clearInterval(interval);
          toast.success("Payment successful! Credits added to your account.");
          setShowPaymentDialog(false);
          loadData();
          refreshUser();
        } else if (response.data?.status === "failed") {
          clearInterval(interval);
          toast.error("Payment failed. Please try again.");
        }
        if (attempts >= 30) {
          clearInterval(interval);
          toast.info("Payment is taking longer than expected. Check transaction history.");
        }
      } catch (error) {
        console.error("Status check failed:", error);
      }
    }, 1000);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const formatCurrency = (amount: number) => `KES ${amount.toLocaleString()}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
              <p className="text-3xl font-bold text-card-foreground">
                {user?.sms_balance?.toLocaleString() || 0}{" "}
                <span className="text-lg font-normal text-muted-foreground">credits</span>
              </p>
            </div>
            <Button className="gap-1.5" onClick={() => document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' })}>
              <Plus className="h-4 w-4" /> Buy Credits
            </Button>
          </div>
        </CardContent>
      </Card>

      <div id="packages-section" className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((p) => (
          <Card
            key={p.id}
            className={`shadow-card cursor-pointer transition-all hover:shadow-card-hover ${
              p.is_popular ? "border-primary ring-1 ring-primary/20" : ""
            }`}
          >
            <CardContent className="p-5 text-center">
              {p.is_popular && (
                <span className="mb-2 inline-block rounded-full bg-gradient-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Best Value
                </span>
              )}
              <p className="text-lg font-bold text-card-foreground">{p.sms_count.toLocaleString()} SMS</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(p.price)}</p>
              <p className="text-xs text-muted-foreground">KES {p.price_per_sms?.toFixed(2) || '0.50'} per SMS</p>
              <Button
                className="mt-4 w-full"
                variant={p.is_popular ? "default" : "outline"}
                size="sm"
                onClick={() => handlePurchase(p)}
              >
                Purchase
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No transactions yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">Type</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">Credits</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">Payment</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">Amount</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3 text-muted-foreground">{formatDate(t.created_at)}</td>
                    <td className="py-3 text-card-foreground">{t.type}</td>
                    <td className={`py-3 font-medium ${t.sms_credits > 0 ? "text-success" : "text-destructive"}`}>
                      {t.sms_credits > 0 ? "+" : ""}{t.sms_credits.toLocaleString()}
                    </td>
                    <td className="py-3 text-muted-foreground">{t.payment_method || "—"}</td>
                    <td className="py-3 text-muted-foreground">{t.amount > 0 ? formatCurrency(t.amount) : "—"}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        t.status === "completed" ? "bg-success/10 text-success" :
                        t.status === "pending" ? "bg-warning/10 text-warning" :
                        "bg-destructive/10 text-destructive"
                      }`}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Purchase</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Package</p>
              <p className="font-semibold text-card-foreground">{selectedPackage?.sms_count.toLocaleString()} SMS Credits</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-2xl font-bold text-primary">{selectedPackage && formatCurrency(selectedPackage.price)}</p>
            </div>
            <div className="space-y-2">
              <Label>M-PESA Phone Number</Label>
              <Input
                placeholder="e.g. 0712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Enter your Safaricom number to receive STK Push</p>
            </div>
            <Button className="w-full gap-2" onClick={handleMpesaPayment} disabled={processing}>
              {processing ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
              ) : (
                <><CreditCard className="h-4 w-4" /> Pay with M-PESA</>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Billing;
