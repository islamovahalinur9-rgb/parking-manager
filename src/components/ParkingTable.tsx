import { Pencil, Trash2 } from 'lucide-react';
import { Parking } from '../types/Parking';

interface ParkingTableProps {
  parkings: Parking[];
  onEdit: (parking: Parking) => void;
  onDelete: (parking: Parking) => void;
}

export default function ParkingTable({
  parkings,
  onEdit,
  onDelete,
}: ParkingTableProps) {
  return (
    <section className="overflow-hidden rounded-app bg-white shadow-soft ring-1 ring-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="bg-slate-50 text-sm text-slate-500">
            <tr>
              <th className="px-5 py-4 font-semibold">№ парковочного места</th>
              <th className="px-5 py-4 font-semibold">Госномер</th>
              <th className="px-5 py-4 font-semibold">Владелец</th>
              <th className="px-5 py-4 font-semibold">Статус</th>
              <th className="px-5 py-4 text-right font-semibold">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {parkings.length > 0 ? (
              parkings.map((parking) => (
                <tr className="text-sm text-slate-700" key={parking.id}>
                  <td className="px-5 py-4 font-medium text-slate-950">
                    {parking.placeNumber}
                  </td>
                  <td className="px-5 py-4">{parking.licensePlate || '—'}</td>
                  <td className="px-5 py-4">{parking.ownerName || '—'}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        parking.status === 'Занято'
                          ? 'inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700'
                          : 'inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'
                      }
                    >
                      {parking.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        aria-label="Редактировать"
                        className="flex h-9 w-9 items-center justify-center rounded-app text-slate-500 transition hover:bg-blue-50 hover:text-primary"
                        onClick={() => onEdit(parking)}
                        title="Редактировать"
                        type="button"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        aria-label="Удалить"
                        className="flex h-9 w-9 items-center justify-center rounded-app text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        onClick={() => onDelete(parking)}
                        title="Удалить"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-5 py-10 text-center text-sm text-slate-500" colSpan={5}>
                  Записи не найдены
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
