import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { TradeInForm } from "@/components/trade-in/trade-in-form";
import { ShieldCheck, Clock, Wallet } from "lucide-react";

export const metadata: Metadata = {
  title: "Trade-In Your Vehicle",
  description:
    "Get a fair, fast valuation for your current vehicle at RS Motors and trade up to your next car with ease.",
  alternates: { canonical: "/trade-in" },
};

const steps = [
  { icon: Clock, title: "Submit Details", description: "Fill out your vehicle info and upload a few photos." },
  { icon: ShieldCheck, title: "Get Valuation", description: "Receive an instant estimated value within seconds." },
  { icon: Wallet, title: "Confirm & Trade", description: "Our team inspects the vehicle and finalizes your offer." },
];

export default function TradeInPage() {
  return (
    <div className="container-px mx-auto max-w-6xl py-8">
      <Breadcrumbs items={[{ label: "Trade-In" }]} />

      <div className="mt-4 mb-10 text-center max-w-2xl mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Trade In Your Vehicle</h1>
        <p className="text-muted-foreground mt-3">
          Upgrade to your next car seamlessly. Get a fair, transparent valuation for your current
          vehicle in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
        {steps.map((s, i) => (
          <div key={s.title} className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full gradient-red text-white mb-3">
              <s.icon className="h-5 w-5" />
            </div>
            <p className="font-semibold text-sm">{i + 1}. {s.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
          </div>
        ))}
      </div>

      <TradeInForm />
    </div>
  );
}
