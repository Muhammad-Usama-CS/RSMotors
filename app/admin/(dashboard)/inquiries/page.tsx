import { getAllInquiries, getAllTradeIns } from "@/lib/data";
import { InquiriesTable } from "@/components/admin/inquiries-table";

export default async function AdminInquiriesPage() {
  const [inquiries, tradeIns] = await Promise.all([getAllInquiries(), getAllTradeIns()]);

  const combined = [
    ...inquiries,
    ...tradeIns.map((t: any) => ({
      id: t.id,
      name: t.name,
      email: t.email || "—",
      phone: t.phone,
      message: `Trade-in: ${t.brand} ${t.model} (${t.year}), ${t.mileageKm}km, ${t.condition} condition`,
      source: "trade-in",
      status: t.status,
      createdAt: t.createdAt,
    })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl sm:text-3xl font-bold">Inquiries & Trade-Ins</h1>
      <p className="text-muted-foreground mt-1 mb-6">{combined.length} total submissions</p>
      <InquiriesTable inquiries={combined} />
    </div>
  );
}
