import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Upload, Clock } from "lucide-react";
import { toast } from "sonner";

const SendSMS = () => {
  const [message, setMessage] = useState("");
  const maxChars = 160;
  const parts = Math.ceil(message.length / maxChars) || 1;
  const remaining = parts * maxChars - message.length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Send SMS</h1>
        <p className="text-sm text-muted-foreground">Compose and send messages to your contacts</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Compose Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Sender ID</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sender ID" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ABANCOOL">ABANCOOL</SelectItem>
                    <SelectItem value="AbanSMS">AbanSMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Recipients</Label>
                <Textarea placeholder="Enter phone numbers (one per line) or paste comma-separated numbers&#10;e.g. +254712345678, +254798765432" rows={3} />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Upload className="h-3.5 w-3.5" /> Upload CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    Select Contact List
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Type your message here..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{message.length} characters • {parts} part(s)</span>
                  <span>{remaining} characters remaining</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Schedule (Optional)</Label>
                <Input type="datetime-local" />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button className="gap-2" onClick={() => toast.success("Campaign queued for sending!")}>
              <Send className="h-4 w-4" /> Send Now
            </Button>
            <Button variant="outline" className="gap-2">
              <Clock className="h-4 w-4" /> Schedule
            </Button>
          </div>
        </div>

        <Card className="shadow-card h-fit">
          <CardHeader>
            <CardTitle className="text-base">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Recipients</span>
              <span className="font-medium text-card-foreground">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Message Parts</span>
              <span className="font-medium text-card-foreground">{parts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total SMS</span>
              <span className="font-medium text-card-foreground">0</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-medium text-card-foreground">Estimated Cost</span>
              <span className="font-bold text-primary">0 credits</span>
            </div>
            <div className="mt-4 rounded-lg bg-info/10 p-3 text-xs text-info">
              Your balance: 15,200 credits
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SendSMS;
