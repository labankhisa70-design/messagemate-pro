import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const offices = [
  {
    city: "Garissa",
    type: "Main Office",
    address: "Garissa Town, Garissa County",
    phone: "+254 700 000 000",
    email: "garissa@abancool.com",
    hours: "Mon – Fri: 8:00 AM – 5:00 PM",
  },
  {
    city: "Nairobi",
    type: "Branch Office",
    address: "Nairobi CBD, Nairobi County",
    phone: "+254 700 000 001",
    email: "nairobi@abancool.com",
    hours: "Mon – Fri: 8:00 AM – 6:00 PM",
  },
  {
    city: "Kerugoya",
    type: "Branch Office",
    address: "Kerugoya Town, Kirinyaga County",
    phone: "+254 700 000 002",
    email: "kerugoya@abancool.com",
    hours: "Mon – Fri: 8:00 AM – 5:00 PM",
  },
];

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("https://bulksms.abancool.com/backend/api/contact/submit.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Message sent! We'll get back to you shortly.");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="bg-hero pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-primary-foreground/60">
            Get in touch with our team across Kenya
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-16 grid gap-6 md:grid-cols-3">
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="shadow-card h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                        <MapPin className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-card-foreground">{office.city}</h3>
                        <span className="text-xs text-muted-foreground">{office.type}</span>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4 shrink-0" />
                        <a href={`tel:${office.phone}`} className="hover:text-primary">{office.phone}</a>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4 shrink-0" />
                        <a href={`mailto:${office.email}`} className="hover:text-primary">{office.email}</a>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 shrink-0" />
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-card">
                <CardContent className="p-8">
                  <h2 className="mb-2 text-2xl font-bold text-card-foreground">Send us a message</h2>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Fill in the form below and we'll get back to you as soon as possible.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Name *</Label>
                        <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Email *</Label>
                        <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@company.com" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+254 712 345 678" />
                      </div>
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="How can we help?" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Message *</Label>
                      <Textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us about your SMS needs..." rows={5} required />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
