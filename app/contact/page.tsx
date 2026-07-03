import type { Metadata } from "next";
import { Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { LocationMap } from "@/components/shared/location-map";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with RS Motors. Call, WhatsApp, or email our team, or visit our showroom in Gulberg, Lahore.",
  alternates: { canonical: "/contact" },
};

const contactMethods = [
  { icon: Phone, title: "Call Us", value: "+92 300 1234567", href: "tel:+923001234567" },
  { icon: MessageCircle, title: "WhatsApp", value: "+92 300 1234567", href: "https://wa.me/923001234567" },
  { icon: Mail, title: "Email", value: "info@rsmotors.pk", href: "mailto:info@rsmotors.pk" },
  { icon: Clock, title: "Business Hours", value: "Mon–Sat: 10 AM – 8 PM", href: undefined },
];

export default function ContactPage() {
  return (
    <div className="container-px mx-auto max-w-6xl py-8">
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <div className="mt-4 mb-10 text-center max-w-2xl mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Get In Touch</h1>
        <p className="text-muted-foreground mt-3">
          Have a question or want to schedule a visit? Reach out through any of the channels below.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {contactMethods.map((m) => {
          const content = (
            <Card key={m.title} className="p-5 text-center h-full card-hover">
              <m.icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">{m.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.value}</p>
            </Card>
          );
          return m.href ? (
            <a key={m.title} href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
              {content}
            </a>
          ) : (
            <div key={m.title}>{content}</div>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto">
        <ContactForm />
      </div>

      <div className="mt-16">
        <LocationMap compact />
      </div>
    </div>
  );
}
