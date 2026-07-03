"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Share2, AtSign, Video, Phone, Mail, MapPin, Send } from "lucide-react";
import { Logo } from "./logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as React from "react";

const footerLinks = {
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/inventory", label: "Browse Inventory" },
    { href: "/admin/login", label: "Admin Login" },
  ],
  Services: [
    { href: "/finance", label: "Finance Calculator" },
    { href: "/trade-in", label: "Trade-In Valuation" },
    { href: "/inventory", label: "Sell Your Car" },
    { href: "/contact", label: "Book Test Drive" },
  ],
  Popular: [
    { href: "/inventory?brand=Toyota", label: "Toyota Cars" },
    { href: "/inventory?brand=Honda", label: "Honda Cars" },
    { href: "/inventory?brand=Suzuki", label: "Suzuki Cars" },
    { href: "/inventory?bodyType=SUV", label: "SUVs" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = React.useState("");

  if (pathname?.startsWith("/admin")) return null;

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed!", { description: "You'll now receive our latest listings and offers." });
    setEmail("");
  }

  return (
    <footer className="border-t border-border bg-secondary/40 dark:bg-black/40">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Pakistan&apos;s trusted destination for premium new and used vehicles. Verified inspections,
              transparent pricing, and financing made simple.
            </p>
            <div className="mt-5 flex gap-3">
              {[Share2, AtSign, Video].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1">
            <h4 className="font-semibold text-sm mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-3">Get new arrivals and offers in your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10"
                required
              />
              <Button type="submit" size="icon" className="h-10 w-10 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-3">
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-primary shrink-0" />
            <span>+92 300 1234567</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-primary shrink-0" />
            <span>info@rsmotors.pk</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <span>Main Boulevard, Gulberg, Lahore</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} RS Motors. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/about" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
