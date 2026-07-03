"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email().optional().or(z.literal("")),
  date: z.string().min(1, "Please select a date"),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export function BookTestDriveDialog({
  open,
  onClose,
  carId,
  carName,
}: {
  open: boolean;
  onClose: () => void;
  carId: string;
  carName: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, carId }),
      });
      if (!res.ok) throw new Error();
      toast.success("Test drive booked!", { description: `We'll confirm your slot for the ${carName} shortly.` });
      reset();
      onClose();
    } catch {
      toast.error("Something went wrong", { description: "Please try again or call us directly." });
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a Test Drive</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground -mt-2">{carName}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register("name")} placeholder="Ahmed Khan" />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" {...register("phone")} placeholder="03XX-XXXXXXX" />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email (optional)</Label>
            <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="date">Preferred Date & Time</Label>
            <Input id="date" type="datetime-local" {...register("date")} />
            {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea id="notes" {...register("notes")} placeholder="Any specific requirements..." />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
