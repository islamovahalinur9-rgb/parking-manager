import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';
import ParkingForm from '../components/ParkingForm';
import ParkingTable from '../components/ParkingTable';
import SearchBar from '../components/SearchBar';
import StatCards from '../components/StatCards';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Parking, ParkingFormValues } from '../types/Parking';

const initialParkings: Parking[] = [
  {
    id: 'parking-1',
    placeNumber: 1,
    licensePlate: '123 ABC 02',
    ownerName: 'Иван Петров',
    status: 'Занято',
  },
  {
    id: 'parking-2',
    placeNumber: 2,
    licensePlate: '456 DEF 02',
    ownerName: 'Анна Иванова',
    status: 'Занято',
  },
  {
    id: 'parking-3',
    placeNumber: 3,
    licensePlate: '—',
    ownerName: '—',
    status: 'Свободно',
  },
];

export default function Home() {
  const [parkings, setParkings] = useLocalStorage<Parking[]>(
    'parking-manager-data',
    initialParkings,
  );
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingParking, setEditingParking] = useState<Parking | null>(null);
  const [parkingToDelete, setParkingToDelete] = useState<Parking | null>(null);

  const filteredParkings = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return parkings;
    }

    return parkings.filter((parking) => {
      return (
        parking.licensePlate.toLowerCase().includes(query) ||
        parking.ownerName.toLowerCase().includes(query)
      );
    });
  }, [parkings, search]);

  const occupied = parkings.filter((parking) => parking.status === 'Занято').length;
  const free = parkings.filter((parking) => parking.status === 'Свободно').length;

  const openCreateForm = () => {
    setEditingParking(null);
    setIsFormOpen(true);
  };

  const handleSave = (values: ParkingFormValues) => {
    if (editingParking) {
      setParkings((current) =>
        current.map((parking) =>
          parking.id === editingParking.id ? { ...parking, ...values } : parking,
        ),
      );
    } else {
      setParkings((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          ...values,
        },
      ]);
    }

    setIsFormOpen(false);
    setEditingParking(null);
  };

  const handleDelete = () => {
    if (parkingToDelete) {
      setParkings((current) =>
        current.filter((parking) => parking.id !== parkingToDelete.id),
      );
      setParkingToDelete(null);
    }
  };

  return (
    <main className="min-h-screen bg-surface px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
        <header className="flex flex-col gap-4 rounded-app bg-white p-5 shadow-soft ring-1 ring-slate-100 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Администрирование</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-950 sm:text-3xl">
              Parking Manager
            </h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchBar value={search} onChange={setSearch} />
            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-app bg-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              onClick={openCreateForm}
              type="button"
            >
              <Plus className="h-5 w-5" />
              Добавить автомобиль
            </button>
          </div>
        </header>

        <StatCards total={parkings.length} occupied={occupied} free={free} />

        <ParkingTable
          parkings={filteredParkings}
          onDelete={setParkingToDelete}
          onEdit={(parking) => {
            setEditingParking(parking);
            setIsFormOpen(true);
          }}
        />
      </div>

      <ParkingForm
        initialParking={editingParking}
        isOpen={isFormOpen}
        onCancel={() => {
          setIsFormOpen(false);
          setEditingParking(null);
        }}
        onSave={handleSave}
      />

      <ConfirmDialog
        isOpen={Boolean(parkingToDelete)}
        onCancel={() => setParkingToDelete(null)}
        onConfirm={handleDelete}
      />
    </main>
  );
}
