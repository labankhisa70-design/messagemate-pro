import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <MessageSquare className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Abancool SMS</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional bulk SMS platform for businesses across Africa.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "API", "Status"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Cookie Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Abancool SMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
