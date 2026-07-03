"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  message: z.string().min(10, "Please provide more detail (min. 10 characters)"),
});
type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact" }),
      });
      if (!res.ok) throw new Error();
      toast.success("Message sent!", { description: "Our team will get back to you within 24 hours." });
      reset();
    } catch {
      toast.error("Something went wrong", { description: "Please try again or call us directly." });
    }
  }

  return (
    <Card className="p-6 sm:p-8">
      <h3 className="font-display font-semibold text-xl mb-6">Send Us a Message</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="c-name">Full Name</Label>
            <Input id="c-name" {...register("name")} placeholder="Ahmed Khan" />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-phone">Phone Number</Label>
            <Input id="c-phone" {...register("phone")} placeholder="03XX-XXXXXXX" />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-email">Email Address</Label>
          <Input id="c-email" type="email" {...register("email")} placeholder="you@example.com" />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-message">Message</Label>
          <Textarea id="c-message" rows={5} {...register("message")} placeholder="Tell us what you're looking for..." />
          {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
        </div>
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
          <Send className="h-4 w-4" />
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  );
}
