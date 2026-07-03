"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { calculateEmi } from "@/lib/finance";
import { formatPKR, formatNumber } from "@/lib/utils";

export function LoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = React.useState(5000000);
  const [downPayment, setDownPayment] = React.useState(1500000);
  const [interestRate, setInterestRate] = React.useState(16);
  const [tenureMonths, setTenureMonths] = React.useState(60);

  const result = calculateEmi({ vehiclePrice, downPayment, interestRate, tenureMonths });

  const chartData = [
    { name: "Principal", value: result.loanAmount, color: "#c8102e" },
    { name: "Interest", value: result.totalInterest, color: "#18181b" },
  ];

  const downPaymentPct = vehiclePrice > 0 ? Math.round((downPayment / vehiclePrice) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
      <Card className="p-6 sm:p-8 space-y-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Vehicle Price</Label>
            <span className="text-sm font-semibold">{formatPKR(vehiclePrice)}</span>
          </div>
          <Input
            type="number"
            value={vehiclePrice}
            onChange={(e) => setVehiclePrice(Number(e.target.value) || 0)}
          />
          <Slider
            min={500000}
            max={40000000}
            step={100000}
            value={[vehiclePrice]}
            onValueChange={([v]) => setVehiclePrice(v)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Down Payment</Label>
            <span className="text-sm font-semibold">{formatPKR(downPayment)} ({downPaymentPct}%)</span>
          </div>
          <Input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
          />
          <Slider
            min={0}
            max={vehiclePrice}
            step={50000}
            value={[downPayment]}
            onValueChange={([v]) => setDownPayment(v)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Interest Rate (APR)</Label>
            <span className="text-sm font-semibold">{interestRate}%</span>
          </div>
          <Slider
            min={5}
            max={30}
            step={0.5}
            value={[interestRate]}
            onValueChange={([v]) => setInterestRate(v)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Loan Tenure</Label>
            <span className="text-sm font-semibold">{tenureMonths} months ({(tenureMonths / 12).toFixed(1)} yrs)</span>
          </div>
          <Slider
            min={12}
            max={84}
            step={6}
            value={[tenureMonths]}
            onValueChange={([v]) => setTenureMonths(v)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {[12, 24, 36, 48, 60, 72, 84].map((m) => (
            <Button
              key={m}
              variant={tenureMonths === m ? "default" : "outline"}
              size="sm"
              onClick={() => setTenureMonths(m)}
            >
              {m}mo
            </Button>
          ))}
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6 sm:p-8 text-center gradient-red text-white">
          <p className="text-sm text-white/80">Estimated Monthly EMI</p>
          <motion.p
            key={Math.round(result.monthlyEmi)}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold mt-2"
          >
            {formatPKR(Math.round(result.monthlyEmi))}
          </motion.p>
          <p className="text-xs text-white/70 mt-1">per month</p>
        </Card>

        <Card className="p-6">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatPKR(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-sm mt-2">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary" />Principal</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-foreground" />Interest</span>
          </div>

          <div className="mt-6 space-y-3 border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Loan Amount</span>
              <span className="font-medium">{formatPKR(result.loanAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Interest</span>
              <span className="font-medium">{formatPKR(Math.round(result.totalInterest))}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span>Total Payment</span>
              <span className="text-primary">{formatPKR(Math.round(result.totalPayment))}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
