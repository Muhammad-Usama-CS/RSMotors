import { MapPin, Clock, Phone } from "lucide-react";

export function LocationMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "section-y container-px mx-auto max-w-7xl"}>
      {!compact && (
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Visit Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Find Our Showroom</h2>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-3xl overflow-hidden border border-border">
        <div className="lg:col-span-2 h-80 lg:h-auto min-h-[320px]">
          <iframe
            title="RS Motors Location"
            src="https://www.google.com/maps?q=Gulberg,Lahore,Pakistan&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 320 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="p-8 bg-secondary/40 dark:bg-black/20 flex flex-col justify-center gap-6">
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Showroom Address</p>
              <p className="text-sm text-muted-foreground">Main Boulevard, Gulberg, Lahore, Pakistan</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Business Hours</p>
              <p className="text-sm text-muted-foreground">Mon - Sat: 10:00 AM - 8:00 PM</p>
              <p className="text-sm text-muted-foreground">Sunday: Closed</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Contact</p>
              <p className="text-sm text-muted-foreground">+92 300 1234567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
