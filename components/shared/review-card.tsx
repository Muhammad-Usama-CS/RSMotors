import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ReviewT } from "@/lib/data";

export function ReviewCard({ review }: { review: ReviewT }) {
  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <Card className="p-6 h-full flex flex-col glass">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
          />
        ))}
      </div>
      <p className="text-sm text-foreground/90 flex-1">&ldquo;{review.comment}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">{review.name}</p>
          {review.carBought && <p className="text-xs text-muted-foreground">Bought {review.carBought}</p>}
        </div>
      </div>
    </Card>
  );
}
