import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

export function FeaturesList({ features }: { features: string }) {
  const list = features.split(",").map((f) => f.trim()).filter(Boolean);

  return (
    <Card className="p-6">
      <h3 className="font-display font-semibold text-lg mb-4">Features & Options</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {list.map((f) => (
          <div key={f} className="flex items-center gap-2 text-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
              <Check className="h-3 w-3" />
            </span>
            {f}
          </div>
        ))}
      </div>
    </Card>
  );
}
