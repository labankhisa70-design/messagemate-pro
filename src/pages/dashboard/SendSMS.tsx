import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Upload, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { smsApi, senderIdsApi, contactsApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const SendSMS = () => {
  const { user, refreshUser } = useAuth();
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [senderId, setSenderId] = useState("");
  const [scheduleAt, setScheduleAt] = useState("");
  const [senderIds, setSenderIds] = useState<any[]>([]);
  const [contactLists, setContactLists] = useState<any[]>([]);
  const [sending, setSending] = useState(false);

  const maxChars = 160;
  const parts = Math.ceil(message.length / maxChars) || 1;
  const remaining = parts * maxChars - message.length;

  const phoneNumbers = recipients.split(/[\n,]+/).map(p => p.trim()).filter(p => p.length > 0);
  const totalSms = phoneNumbers.length * parts;
  const estimatedCost = totalSms * 0.5;

  useEffect(() => {
    const load = async () => {
      try {
        const [senderRes, listsRes] = await Promise.all([
          senderIdsApi.list(),
          contactsApi.getLists(),
        ]);
        if (senderRes.success) {
          setSenderIds((senderRes.data || []).filter((s: any) => s.status === "approved" || s.status === "Approved"));
        }
        if (listsRes.success) setContactLists(listsRes.data || []);
      } catch (err) {
        console.error("Failed to load sender IDs:", err);
      }
    };
    load();
  }, []);

  const handleSend = async () => {
    if (!senderId) return toast.error("Please select a sender ID");
    if (phoneNumbers.length === 0) return toast.error("Please enter at least one phone number");
    if (!message.trim()) return toast.error("Please enter a message");
    if ((user?.sms_balance || 0) < totalSms) return toast.error("Insufficient credits. Please top up.");

    try {
      setSending(true);
      const response = await smsApi.sendBulk({
        phones: phoneNumbers,
        message,
        sender_id: senderId,
        ...(scheduleAt ? { schedule_at: scheduleAt } : {}),
      });
      if (response.success) {
        toast.success(`${scheduleAt ? "Campaign scheduled" : "SMS sent"} successfully!`);
        setMessage("");
        setRecipients("");
        refreshUser();
      } else {
        toast.error(response.message || "Failed to send SMS");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to send SMS");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Send SMS</h1>
        <p className="text-sm text-muted-foreground">Compose and send messages to your contacts</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">Compose Message</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Sender ID</Label>
                <Select value={senderId} onValueChange={setSenderId}>
                  <SelectTrigger><SelectValue placeholder="Select sender ID" /></SelectTrigger>
                  <SelectContent>
                    {senderIds.map((s: any) => (
                      <SelectItem key={s.id || s.sender_name} value={s.sender_name}>{s.sender_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Recipients</Label>
                <Textarea
                  placeholder="Enter phone numbers (one per line or comma-separated)&#10;e.g. +254712345678, +254798765432"
                  rows={3}
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5"><Upload className="h-3.5 w-3.5" /> Upload CSV</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="Type your message here..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{message.length} characters • {parts} part(s)</span>
                  <span>{remaining} characters remaining</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Schedule (Optional)</Label>
                <Input type="datetime-local" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button className="gap-2" onClick={handleSend} disabled={sending}>
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {scheduleAt ? "Schedule" : "Send Now"}
            </Button>
          </div>
        </div>

        <Card className="shadow-card h-fit">
          <CardHeader><CardTitle className="text-base">Summary</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Recipients</span>
              <span className="font-medium text-card-foreground">{phoneNumbers.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Message Parts</span>
              <span className="font-medium text-card-foreground">{parts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total SMS</span>
              <span className="font-medium text-card-foreground">{totalSms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cost per SMS</span>
              <span className="font-medium text-card-foreground">KES 0.50</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-medium text-card-foreground">Estimated Cost</span>
              <span className="font-bold text-primary">KES {estimatedCost.toFixed(2)}</span>
            </div>
            <div className="mt-4 rounded-lg bg-info/10 p-3 text-xs text-info">
              Your balance: {user?.sms_balance?.toLocaleString() || 0} credits
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SendSMS;
