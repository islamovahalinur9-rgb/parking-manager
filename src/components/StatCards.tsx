import { Car, CircleParking, ParkingCircle } from 'lucide-react';

interface StatCardsProps {
  total: number;
  occupied: number;
  free: number;
}

const cards = [
  { key: 'total', label: 'Всего мест', Icon: CircleParking },
  { key: 'occupied', label: 'Занято', Icon: Car },
  { key: 'free', label: 'Свободно', Icon: ParkingCircle },
] as const;

export default function StatCards({ total, occupied, free }: StatCardsProps) {
  const values = { total, occupied, free };

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {cards.map(({ key, label, Icon }) => (
        <article
          className="rounded-app bg-white p-5 shadow-soft ring-1 ring-slate-100"
          key={key}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{values[key]}</p>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-app bg-blue-50 text-primary">
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
