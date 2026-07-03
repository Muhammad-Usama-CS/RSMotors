"use client";

import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/lib/utils";

interface BookingRow {
  id: string;
  type: "Test Drive" | "Reservation";
  name: string;
  phone: string;
  carName: string;
  date?: string;
  status: string;
  createdAt: string;
}

export function BookingsTable({ rows }: { rows: BookingRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
        No bookings or reservations yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border bg-secondary/40">
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Vehicle</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-border/60 last:border-0 hover:bg-accent/40">
                <td className="p-4">
                  <Badge variant={row.type === "Reservation" ? "default" : "outline"}>{row.type}</Badge>
                </td>
                <td className="p-4">
                  <div className="font-medium">{row.name}</div>
                  <div className="text-xs text-muted-foreground">{row.phone}</div>
                </td>
                <td className="p-4">{row.carName}</td>
                <td className="p-4">
                  <Badge variant={row.status === "Confirmed" ? "success" : row.status === "Pending" ? "warning" : "outline"}>
                    {row.status}
                  </Badge>
                </td>
                <td className="p-4 text-muted-foreground">{timeAgo(row.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
