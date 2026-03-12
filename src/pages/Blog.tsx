import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

const blogPosts = [
  {
    id: "bulk-sms-marketing-kenya-2026",
    title: "The Ultimate Guide to Bulk SMS Marketing in Kenya (2026)",
    excerpt: "Learn how Kenyan businesses are leveraging bulk SMS to drive sales, improve customer engagement, and boost ROI with affordable messaging at KES 0.50 per SMS.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
    author: "Abancool Team",
    date: "March 10, 2026",
    readTime: "8 min read",
    category: "Marketing",
  },
  {
    id: "sms-api-integration-guide",
    title: "How to Integrate SMS API into Your Application",
    excerpt: "A step-by-step developer guide to integrating Abancool SMS API into your web or mobile application for OTP verification, notifications, and marketing campaigns.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    author: "Dev Team",
    date: "March 5, 2026",
    readTime: "12 min read",
    category: "Developers",
  },
  {
    id: "mpesa-sms-credits",
    title: "Buy SMS Credits Instantly via M-PESA",
    excerpt: "Discover how easy it is to purchase SMS credits using M-PESA. Our STK Push integration means you can top up your account in seconds and start sending messages immediately.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    author: "Abancool Team",
    date: "February 28, 2026",
    readTime: "5 min read",
    category: "Billing",
  },
  {
    id: "sender-id-registration-kenya",
    title: "How to Register a Sender ID in Kenya",
    excerpt: "Everything you need to know about registering a custom Sender ID for your business SMS campaigns in Kenya. Get approved and start sending branded messages.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    author: "Support Team",
    date: "February 20, 2026",
    readTime: "6 min read",
    category: "Guide",
  },
  {
    id: "sms-delivery-reports-analytics",
    title: "Understanding SMS Delivery Reports & Analytics",
    excerpt: "Learn how to read and interpret SMS delivery reports to optimize your campaign performance. Track delivery rates, identify failed messages, and improve your messaging strategy.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    author: "Abancool Team",
    date: "February 15, 2026",
    readTime: "7 min read",
    category: "Analytics",
  },
  {
    id: "sms-vs-email-marketing",
    title: "SMS vs Email Marketing: Which is Better for Your Business?",
    excerpt: "A comprehensive comparison of SMS and email marketing for Kenyan businesses. Discover why SMS has a 98% open rate compared to email's 20% and how to leverage both channels.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=400&fit=crop",
    author: "Marketing Team",
    date: "February 10, 2026",
    readTime: "9 min read",
    category: "Marketing",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="bg-hero pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground sm:text-5xl">Blog</h1>
          <p className="mt-4 text-lg text-primary-foreground/60">
            Tips, guides, and insights on SMS marketing in Kenya & Africa
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                    {post.category}
                  </span>
                  <h2 className="mb-2 text-lg font-bold text-card-foreground line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                    </div>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
