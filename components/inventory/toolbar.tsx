"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { SORT_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Toolbar({ total }: { total: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") === "list" ? "list" : "grid";
  const sort = searchParams.get("sort") || "newest";

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/inventory?${params.toString()}`);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{total}</span> vehicles found
      </p>
      <div className="flex items-center gap-3">
        <Select value={sort} onValueChange={(v) => setParam("sort", v)}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex items-center rounded-full border border-border p-1">
          <button
            onClick={() => setParam("view", "grid")}
            className={cn("rounded-full p-2 transition-colors", view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setParam("view", "list")}
            className={cn("rounded-full p-2 transition-colors", view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
