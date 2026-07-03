import { getAllBookings, getAllReservations, getAllCars } from "@/lib/data";
import { BookingsTable } from "@/components/admin/bookings-table";

export default async function AdminBookingsPage() {
  const [bookings, reservations, cars] = await Promise.all([
    getAllBookings(),
    getAllReservations(),
    getAllCars(),
  ]);

  function carName(carId: string) {
    const car = cars.find((c) => c.id === carId);
    return car ? `${car.brand} ${car.model} ${car.year}` : "Unknown vehicle";
  }

  const rows = [
    ...bookings.map((b: any) => ({
      id: b.id,
      type: "Test Drive" as const,
      name: b.name,
      phone: b.phone,
      carName: carName(b.carId),
      status: b.status,
      createdAt: b.createdAt,
    })),
    ...reservations.map((r: any) => ({
      id: r.id,
      type: "Reservation" as const,
      name: r.name,
      phone: r.phone,
      carName: carName(r.carId),
      status: r.status,
      createdAt: r.createdAt,
    })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl sm:text-3xl font-bold">Bookings & Reservations</h1>
      <p className="text-muted-foreground mt-1 mb-6">{rows.length} total submissions</p>
      <BookingsTable rows={rows} />
    </div>
  );
}
