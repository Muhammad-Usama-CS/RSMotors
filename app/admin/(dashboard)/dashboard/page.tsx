import { getDashboardStats, getAllCars } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Car, Wallet, Inbox, Calendar, TrendingUp, ShieldCheck } from "lucide-react";
import { formatPKR } from "@/lib/utils";
import { DashboardCharts } from "@/components/admin/dashboard-charts";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const cars = await getAllCars();

  const statCards = [
    { icon: Car, label: "Total Vehicles", value: String(stats.totalCars), color: "text-primary" },
    { icon: Wallet, label: "Inventory Value", value: formatPKR(stats.totalValue), color: "text-success" },
    { icon: Inbox, label: "New Inquiries", value: String(stats.newInquiries), color: "text-warning" },
    { icon: Calendar, label: "Bookings", value: String(stats.totalBookings), color: "text-primary" },
    { icon: ShieldCheck, label: "Reservations", value: String(stats.totalReservations), color: "text-success" },
    { icon: TrendingUp, label: "Trade-In Requests", value: String(stats.totalTradeIns), color: "text-warning" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl sm:text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-1">Overview of RS Motors operations</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {statCards.map((s) => (
          <Card key={s.label} className="p-5">
            <s.icon className={`h-5 w-5 mb-3 ${s.color}`} />
            <p className="text-xl sm:text-2xl font-bold font-display">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Inventory by Status</h3>
          <div className="space-y-3">
            {[
              { label: "Available", value: stats.available, color: "bg-success" },
              { label: "Reserved", value: stats.reserved, color: "bg-warning" },
              { label: "Sold", value: stats.sold, color: "bg-muted-foreground" },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full ${row.color}`}
                    style={{ width: `${stats.totalCars ? (row.value / stats.totalCars) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <DashboardCharts brandCounts={stats.brandCounts} />
      </div>

      <Card className="mt-6 p-6">
        <h3 className="font-semibold mb-4">Recently Added Vehicles</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="pb-2 font-medium">Vehicle</th>
                <th className="pb-2 font-medium">Price</th>
                <th className="pb-2 font-medium">City</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {cars.slice(0, 6).map((car) => (
                <tr key={car.id} className="border-b border-border/60 last:border-0">
                  <td className="py-3">{car.brand} {car.model} {car.year}</td>
                  <td className="py-3">{formatPKR(car.price)}</td>
                  <td className="py-3">{car.city}</td>
                  <td className="py-3">{car.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
