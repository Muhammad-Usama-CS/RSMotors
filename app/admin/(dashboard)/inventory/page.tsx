import { getAllCars } from "@/lib/data";
import { InventoryTable } from "@/components/admin/inventory-table";

export default async function AdminInventoryPage() {
  const cars = await getAllCars();
  return <InventoryTable initialCars={cars} />;
}
