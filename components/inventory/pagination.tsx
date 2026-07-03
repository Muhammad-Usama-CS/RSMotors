"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Pagination({ total, pageSize = 12 }: { total: number; pageSize?: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (totalPages <= 1) return null;

  function goTo(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/inventory?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <Button variant="outline" size="icon" disabled={currentPage === 1} onClick={() => goTo(currentPage - 1)}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pages.map((p, i) => (
        <React.Fragment key={p}>
          {i > 0 && pages[i - 1] !== p - 1 && <span className="px-1 text-muted-foreground">...</span>}
          <button
            onClick={() => goTo(p)}
            className={cn(
              "h-10 w-10 rounded-full text-sm font-medium transition-colors",
              p === currentPage ? "bg-primary text-primary-foreground" : "hover:bg-accent"
            )}
          >
            {p}
          </button>
        </React.Fragment>
      ))}
      <Button variant="outline" size="icon" disabled={currentPage === totalPages} onClick={() => goTo(currentPage + 1)}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
