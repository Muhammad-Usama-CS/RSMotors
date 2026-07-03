"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/lib/utils";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  status: string;
  createdAt: string;
}

export function InquiriesTable({ inquiries }: { inquiries: Inquiry[] }) {
  if (inquiries.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
        No inquiries yet. Submissions from the Contact page will appear here.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border bg-secondary/40">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Contact</th>
              <th className="p-4 font-medium">Message</th>
              <th className="p-4 font-medium">Source</th>
              <th className="p-4 font-medium">Received</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq.id} className="border-b border-border/60 last:border-0 hover:bg-accent/40">
                <td className="p-4 font-medium">{inq.name}</td>
                <td className="p-4 text-muted-foreground">
                  <div>{inq.phone}</div>
                  <div className="text-xs">{inq.email}</div>
                </td>
                <td className="p-4 max-w-xs truncate">{inq.message}</td>
                <td className="p-4"><Badge variant="outline">{inq.source}</Badge></td>
                <td className="p-4 text-muted-foreground">{timeAgo(inq.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
