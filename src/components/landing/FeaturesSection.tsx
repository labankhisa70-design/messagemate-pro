import { Send, Users, BarChart3, Code, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Send,
    title: "Bulk Campaigns",
    description: "Send thousands of messages in seconds. Upload CSV, paste numbers, or select contact lists.",
  },
  {
    icon: Users,
    title: "Contact Manager",
    description: "Organize contacts into lists, add tags, and segment your audience for targeted messaging.",
  },
  {
    icon: BarChart3,
    title: "Real-time Reports",
    description: "Track delivery status, open rates, and campaign performance with detailed analytics.",
  },
  {
    icon: Code,
    title: "Developer API",
    description: "Integrate SMS into your apps with our RESTful API. Send OTPs, alerts, and notifications.",
  },
  {
    icon: Clock,
    title: "Scheduled Sending",
    description: "Schedule campaigns for the perfect time. Set it and forget it — we handle delivery.",
  },
  {
    icon: ShieldCheck,
    title: "Sender ID Management",
    description: "Register custom sender IDs like your brand name. Get approved in minutes.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Features</p>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Everything you need to send SMS at scale
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful tools for businesses of every size. From startups to enterprises.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
