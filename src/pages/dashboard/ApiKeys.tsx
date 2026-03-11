import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Copy, Key } from "lucide-react";
import { toast } from "sonner";

const apiKeys = [
  { name: "Production API Key", key: "ask_live_a1b2c3d4e5f6...x9y0", created: "Jan 10, 2026", lastUsed: "2 min ago" },
  { name: "Test API Key", key: "ask_test_z9y8x7w6v5u4...b1a0", created: "Feb 20, 2026", lastUsed: "1 day ago" },
];

const ApiKeys = () => {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">API Keys</h1>
          <p className="text-sm text-muted-foreground">Manage your API keys for SMS integration</p>
        </div>
        <Button className="gap-1.5"><Plus className="h-4 w-4" /> Generate Key</Button>
      </div>

      <div className="space-y-4">
        {apiKeys.map((k) => (
          <Card key={k.name} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Key className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{k.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">{k.key}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-xs text-muted-foreground">
                    <p>Created: {k.created}</p>
                    <p>Last used: {k.lastUsed}</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.success("API key copied!")}>
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApiKeys;
