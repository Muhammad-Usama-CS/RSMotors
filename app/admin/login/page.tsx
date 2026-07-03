"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";

const schema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password is required"),
});
type FormValues = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Login failed");
      }
      toast.success("Welcome back!");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (e) {
      toast.error("Login failed", { description: e instanceof Error ? e.message : "Please check your credentials." });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-foreground p-4">
      <Card className="w-full max-w-md p-8 relative">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h1 className="font-display text-xl font-semibold text-center mb-1">Admin Login</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Secure access to RS Motors dashboard
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" className="pl-9" {...register("email")} placeholder="admin@rsmotors.pk" />
            </div>
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" className="pl-9" {...register("password")} placeholder="••••••••" />
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 rounded-xl bg-secondary/60 dark:bg-white/5 p-3 text-xs text-muted-foreground text-center">
          Demo credentials: <span className="font-medium text-foreground">admin@rsmotors.pk</span> /{" "}
          <span className="font-medium text-foreground">RSMotors@2026</span>
        </div>
      </Card>
    </div>
  );
}
