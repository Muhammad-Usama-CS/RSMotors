import { ShieldCheck, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { InspectionItemT } from "@/lib/data";

export function InspectionReport({ items, status }: { items: InspectionItemT[]; status: string }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg">Inspection Report</h3>
        {status === "Passed" ? (
          <Badge variant="success"><ShieldCheck className="h-3 w-3" /> Passed</Badge>
        ) : status === "Pending" ? (
          <Badge variant="warning"><ShieldAlert className="h-3 w-3" /> Pending</Badge>
        ) : (
          <Badge variant="outline">Not Inspected</Badge>
        )}
      </div>
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-border/60 pb-3 text-sm">
              <div>
                <p className="font-medium">{item.label}</p>
                {item.notes && <p className="text-xs text-muted-foreground">{item.notes}</p>}
              </div>
              <Badge variant={item.status === "Excellent" || item.status === "Verified" ? "success" : "outline"}>
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Inspection report not yet available for this vehicle.</p>
      )}
    </Card>
  );
}
