import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, MoreHorizontal } from "lucide-react";

const templates = [
  { name: "OTP Verification", message: "Your verification code is {code}. Valid for 5 minutes.", category: "Transactional" },
  { name: "Welcome Message", message: "Welcome to {company}! We're excited to have you.", category: "Marketing" },
  { name: "Flash Sale", message: "🔥 {discount}% OFF everything! Shop now at {link}. Offer ends {date}.", category: "Promotional" },
  { name: "Appointment Reminder", message: "Reminder: Your appointment is on {date} at {time}. Reply YES to confirm.", category: "Transactional" },
];

const Templates = () => {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Templates</h1>
          <p className="text-sm text-muted-foreground">Save and reuse SMS message templates</p>
        </div>
        <Button className="gap-1.5"><Plus className="h-4 w-4" /> New Template</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {templates.map((t) => (
          <Card key={t.name} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{t.name}</p>
                    <span className="text-xs text-muted-foreground">{t.category}</span>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3">{t.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Templates;
