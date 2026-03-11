import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "KES 500",
    credits: "500 SMS",
    features: ["Basic analytics", "1 Sender ID", "CSV upload", "Email support"],
    popular: false,
  },
  {
    name: "Business",
    price: "KES 4,500",
    credits: "5,000 SMS",
    features: ["Advanced analytics", "5 Sender IDs", "API access", "Priority support", "Scheduled sending", "Contact lists"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    credits: "Unlimited",
    features: ["Custom analytics", "Unlimited Sender IDs", "Dedicated API", "24/7 support", "SMPP access", "Account manager"],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Pricing</p>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Pay as you go. No monthly fees, no hidden charges.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl border bg-card p-8 shadow-card ${
                plan.popular
                  ? "border-primary ring-2 ring-primary/20 scale-105"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="mb-1 text-lg font-semibold text-card-foreground">{plan.name}</h3>
              <p className="mb-1 text-sm text-muted-foreground">{plan.credits}</p>
              <p className="mb-6 text-3xl font-bold text-card-foreground">{plan.price}</p>
              <ul className="mb-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <Link to="/register">Get Started</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
