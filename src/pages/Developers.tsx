import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code, Zap, Shield, Globe, ArrowRight } from "lucide-react";

const codeExamples = {
  curl: `curl -X POST https://api.abancool.com/v1/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+254712345678",
    "message": "Hello from Abancool SMS!",
    "sender_id": "ABANCOOL"
  }'`,
  nodejs: `const axios = require('axios');

const response = await axios.post(
  'https://api.abancool.com/v1/send',
  {
    to: '+254712345678',
    message: 'Hello from Abancool SMS!',
    sender_id: 'ABANCOOL'
  },
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

console.log(response.data);
// { id: "msg_abc123", status: "queued", cost: 1 }`,
  python: `import requests

response = requests.post(
    'https://api.abancool.com/v1/send',
    json={
        'to': '+254712345678',
        'message': 'Hello from Abancool SMS!',
        'sender_id': 'ABANCOOL'
    },
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
)

data = response.json()
# {"id": "msg_abc123", "status": "queued", "cost": 1}`,
  php: `<?php
$ch = curl_init('https://api.abancool.com/v1/send');

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer YOUR_API_KEY',
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'to' => '+254712345678',
        'message' => 'Hello from Abancool SMS!',
        'sender_id' => 'ABANCOOL'
    ])
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
// ["id" => "msg_abc123", "status" => "queued", "cost" => 1]`,
};

const endpoints = [
  { method: "POST", path: "/v1/send", desc: "Send a single SMS message" },
  { method: "POST", path: "/v1/send-bulk", desc: "Send SMS to multiple recipients" },
  { method: "GET", path: "/v1/balance", desc: "Check your SMS credit balance" },
  { method: "GET", path: "/v1/delivery-report/{id}", desc: "Get delivery status of a message" },
  { method: "GET", path: "/v1/messages", desc: "List sent messages with pagination" },
  { method: "POST", path: "/v1/contacts", desc: "Create a new contact" },
  { method: "GET", path: "/v1/sender-ids", desc: "List your approved sender IDs" },
];

const Developers = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="bg-hero pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground/80">
              <Code className="h-4 w-4" /> Developer API
            </div>
            <h1 className="text-4xl font-extrabold text-primary-foreground sm:text-5xl">
              SMS API for Developers
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/60">
              Integrate SMS into your applications in minutes. RESTful API with SDKs for Node.js, Python, PHP, and more.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/register">Get API Key <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="https://api.abancool.com/docs" target="_blank" rel="noopener">Full Documentation</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { icon: Zap, title: "Fast Integration", desc: "Send your first SMS in under 5 minutes" },
              { icon: Shield, title: "Secure", desc: "API key authentication with HTTPS encryption" },
              { icon: Globe, title: "Reliable", desc: "99.9% uptime with automatic failover" },
              { icon: Code, title: "SDKs", desc: "Node.js, Python, PHP, and cURL examples" },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 shadow-card text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mb-1 font-semibold text-card-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">API Endpoints</h2>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-card">
            {endpoints.map((ep, i) => (
              <div key={ep.path} className={`flex items-center gap-4 px-6 py-4 ${i < endpoints.length - 1 ? 'border-b border-border' : ''}`}>
                <span className={`rounded px-2 py-0.5 text-xs font-bold ${ep.method === 'POST' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                  {ep.method}
                </span>
                <code className="text-sm font-mono text-card-foreground">{ep.path}</code>
                <span className="ml-auto text-sm text-muted-foreground hidden sm:inline">{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">Quick Start</h2>
          <div className="mx-auto max-w-4xl space-y-6">
            {Object.entries(codeExamples).map(([lang, code]) => (
              <motion.div key={lang} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="overflow-hidden rounded-xl border border-border bg-sidebar shadow-lg">
                  <div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-3">
                    <div className="h-3 w-3 rounded-full bg-destructive/60" />
                    <div className="h-3 w-3 rounded-full bg-warning/60" />
                    <div className="h-3 w-3 rounded-full bg-success/60" />
                    <span className="ml-2 text-xs font-medium uppercase text-sidebar-foreground/50">{lang}</span>
                  </div>
                  <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-sidebar-foreground/80">
                    <code>{code}</code>
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Example */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">API Response</h2>
          <div className="mx-auto max-w-2xl">
            <div className="overflow-hidden rounded-xl border border-border bg-sidebar shadow-lg">
              <div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-3">
                <span className="rounded bg-success/20 px-2 py-0.5 text-xs font-bold text-success">200 OK</span>
                <span className="text-xs text-sidebar-foreground/50">application/json</span>
              </div>
              <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-sidebar-foreground/80">
                <code>{JSON.stringify({
                  success: true,
                  data: {
                    id: "msg_abc123",
                    to: "+254712345678",
                    message: "Hello from Abancool SMS!",
                    sender_id: "ABANCOOL",
                    status: "queued",
                    cost: 1,
                    balance: 14999,
                    created_at: "2026-03-12T10:30:00Z"
                  }
                }, null, 2)}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Simple Pricing</h2>
          <p className="mb-2 text-lg text-muted-foreground">Every SMS costs just</p>
          <p className="text-5xl font-extrabold text-primary">KES 0.50</p>
          <p className="mt-2 text-muted-foreground">per SMS. No hidden fees. No monthly charges.</p>
          <Button size="lg" className="mt-8" asChild>
            <Link to="/register">Start Sending <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Developers;
