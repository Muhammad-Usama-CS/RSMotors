import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { LoanCalculator } from "@/components/finance/loan-calculator";
import { FAQ } from "@/components/shared/faq";

export const metadata: Metadata = {
  title: "Finance Calculator",
  description:
    "Calculate your monthly car loan EMI at RS Motors. Adjust vehicle price, down payment, interest rate, and tenure to plan your financing.",
  alternates: { canonical: "/finance" },
};

const faqs = [
  {
    question: "What documents do I need for car financing in Pakistan?",
    answer:
      "You'll typically need a valid CNIC, proof of income (salary slip or bank statement), and a recent utility bill for address verification. Our team can guide you through the exact requirements for your chosen bank.",
  },
  {
    question: "What is the minimum down payment required?",
    answer:
      "Most banks in Pakistan require a minimum down payment of 15-30% of the vehicle price, though this varies by lender and vehicle type. Our calculator lets you experiment with different down payment amounts.",
  },
  {
    question: "How is the EMI calculated?",
    answer:
      "EMI is calculated using the reducing balance method based on your loan amount, annual interest rate (APR), and tenure in months. This is the standard method used by Pakistani banks and leasing companies.",
  },
  {
    question: "Can I get financing through RS Motors directly?",
    answer:
      "Yes, we partner with several major banks and leasing companies to offer competitive rates. Contact our sales team with your desired vehicle for a personalized financing quote.",
  },
  {
    question: "Is early loan settlement allowed?",
    answer:
      "Most auto financing plans in Pakistan allow early settlement, though some banks may charge a small early termination fee. We recommend confirming this with your specific lender.",
  },
];

export default function FinancePage() {
  return (
    <div className="container-px mx-auto max-w-6xl py-8">
      <Breadcrumbs items={[{ label: "Finance Calculator" }]} />

      <div className="mt-4 mb-10 text-center max-w-2xl mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Car Finance Calculator</h1>
        <p className="text-muted-foreground mt-3">
          Plan your car purchase with confidence. Adjust the values below to estimate your monthly
          installments before you visit our showroom.
        </p>
      </div>

      <LoanCalculator />

      <div className="mt-16 max-w-3xl mx-auto">
        <FAQ items={faqs} />
      </div>
    </div>
  );
}
