import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-hero pt-32 pb-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground/80">
            <Zap className="h-4 w-4" />
            Trusted by 10,000+ businesses
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Send Bulk SMS
            <span className="block text-gradient">at Scale, Instantly</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg text-primary-foreground/60">
            Reach millions of customers with our powerful SMS platform. Reliable delivery, real-time analytics, and developer-friendly APIs.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 px-8 shadow-glow" asChild>
              <Link to="/register">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href="#developers">View API Docs</a>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: Zap, label: "99.9% Delivery Rate", desc: "Industry-leading reliability" },
              { icon: Shield, label: "Enterprise Security", desc: "SOC 2 compliant platform" },
              { icon: Globe, label: "200+ Countries", desc: "Global SMS coverage" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-5 backdrop-blur-sm"
              >
                <item.icon className="mb-2 h-6 w-6 text-accent" />
                <p className="font-semibold text-primary-foreground">{item.label}</p>
                <p className="text-sm text-primary-foreground/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
