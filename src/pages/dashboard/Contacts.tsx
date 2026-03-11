import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Upload, Users, MoreHorizontal } from "lucide-react";

const contactLists = [
  { name: "All Customers", count: 5420, updated: "2 hours ago" },
  { name: "VIP Clients", count: 342, updated: "1 day ago" },
  { name: "Newsletter Subscribers", count: 2100, updated: "3 days ago" },
  { name: "Event Attendees", count: 890, updated: "1 week ago" },
];

const contacts = [
  { name: "John Kamau", phone: "+254712345678", list: "All Customers", tags: ["VIP"] },
  { name: "Mary Wanjiku", phone: "+254798765432", list: "VIP Clients", tags: ["Active"] },
  { name: "Peter Ochieng", phone: "+254723456789", list: "Newsletter", tags: [] },
  { name: "Grace Muthoni", phone: "+254734567890", list: "All Customers", tags: ["New"] },
  { name: "David Kipchoge", phone: "+254745678901", list: "Event Attendees", tags: ["VIP", "Active"] },
];

const Contacts = () => {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contacts</h1>
          <p className="text-sm text-muted-foreground">Manage your contact lists and recipients</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1.5">
            <Upload className="h-4 w-4" /> Import CSV
          </Button>
          <Button className="gap-1.5">
            <Plus className="h-4 w-4" /> New List
          </Button>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contactLists.map((list) => (
          <Card key={list.name} className="shadow-card cursor-pointer hover:shadow-card-hover transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 font-semibold text-card-foreground">{list.name}</p>
              <p className="text-sm text-muted-foreground">{list.count.toLocaleString()} contacts • {list.updated}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">All Contacts</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search contacts..." className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left font-medium text-muted-foreground">Name</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">Phone</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">List</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">Tags</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.phone} className="border-b border-border/50 last:border-0">
                    <td className="py-3 font-medium text-card-foreground">{c.name}</td>
                    <td className="py-3 text-muted-foreground">{c.phone}</td>
                    <td className="py-3 text-muted-foreground">{c.list}</td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        {c.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;
