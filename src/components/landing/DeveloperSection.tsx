import { motion } from "framer-motion";

const codeExample = `// Send SMS with AbanSMS API
const response = await fetch('https://api.abansms.com/v1/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '+254712345678',
    message: 'Hello from AbanSMS!',
    sender_id: 'ABANCOOL'
  })
});

const data = await response.json();
// { id: "msg_abc123", status: "queued", cost: 1 }`;

const DeveloperSection = () => {
  return (
    <section id="developers" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Developer API</p>
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Built for developers
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Integrate SMS into your applications in minutes. Our RESTful API supports sending OTPs, notifications, marketing campaigns, and more.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["RESTful API with JSON responses", "Webhook callbacks for delivery reports", "SDKs for Node.js, Python, PHP", "Sandbox mode for testing"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden rounded-xl border border-border bg-sidebar shadow-lg">
              <div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-warning/60" />
                <div className="h-3 w-3 rounded-full bg-success/60" />
                <span className="ml-2 text-xs text-sidebar-foreground/50">send-sms.js</span>
              </div>
              <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-sidebar-foreground/80">
                <code>{codeExample}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
