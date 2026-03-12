import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Upload, Users, MoreHorizontal, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { contactsApi } from "@/lib/api";
import { toast } from "sonner";

const Contacts = () => {
  const [contactLists, setContactLists] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showListDialog, setShowListDialog] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "", list_id: "" });
  const [newListName, setNewListName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [listsRes, contactsRes] = await Promise.all([
        contactsApi.getLists(),
        contactsApi.list({ limit: 50 }),
      ]);
      if (listsRes.success) setContactLists(listsRes.data || []);
      if (contactsRes.success) setContacts(contactsRes.data || []);
    } catch (err) {
      console.error("Failed to load contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.phone) return toast.error("Name and phone are required");
    try {
      setSaving(true);
      const res = await contactsApi.create(newContact);
      if (res.success) {
        toast.success("Contact added");
        setShowAddDialog(false);
        setNewContact({ name: "", phone: "", list_id: "" });
        loadData();
      } else toast.error(res.message || "Failed to add contact");
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) return toast.error("Enter a list name");
    try {
      setSaving(true);
      const res = await contactsApi.createList({ list_name: newListName });
      if (res.success) {
        toast.success("List created");
        setShowListDialog(false);
        setNewListName("");
        loadData();
      } else toast.error(res.message || "Failed");
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contacts</h1>
          <p className="text-sm text-muted-foreground">Manage your contact lists and recipients</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1.5"><Upload className="h-4 w-4" /> Import CSV</Button>
          <Button variant="outline" className="gap-1.5" onClick={() => setShowListDialog(true)}><Plus className="h-4 w-4" /> New List</Button>
          <Button className="gap-1.5" onClick={() => setShowAddDialog(true)}><Plus className="h-4 w-4" /> Add Contact</Button>
        </div>
      </div>

      {contactLists.length > 0 && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactLists.map((list: any) => (
            <Card key={list.id} className="shadow-card cursor-pointer hover:shadow-card-hover transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Users className="h-5 w-5 text-primary" /></div>
                </div>
                <p className="mt-3 font-semibold text-card-foreground">{list.list_name || list.name}</p>
                <p className="text-sm text-muted-foreground">{list.contact_count || 0} contacts</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">All Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No contacts yet. Add your first contact!</p>
          ) : (
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
                  {contacts.map((c: any) => (
                    <tr key={c.id} className="border-b border-border/50 last:border-0">
                      <td className="py-3 font-medium text-card-foreground">{c.name}</td>
                      <td className="py-3 text-muted-foreground">{c.phone}</td>
                      <td className="py-3 text-muted-foreground">{c.list_name || "—"}</td>
                      <td className="py-3">
                        {c.tags && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{c.tags}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Contact</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Name</Label><Input value={newContact.name} onChange={e => setNewContact({...newContact, name: e.target.value})} placeholder="John Doe" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input value={newContact.phone} onChange={e => setNewContact({...newContact, phone: e.target.value})} placeholder="+254712345678" /></div>
            <Button onClick={handleAddContact} disabled={saving} className="w-full">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Add Contact
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showListDialog} onOpenChange={setShowListDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Contact List</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>List Name</Label><Input value={newListName} onChange={e => setNewListName(e.target.value)} placeholder="e.g. VIP Customers" /></div>
            <Button onClick={handleCreateList} disabled={saving} className="w-full">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Create List
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contacts;
