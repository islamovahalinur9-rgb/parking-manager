import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Parking, ParkingFormValues, ParkingStatus } from '../types/Parking';

interface ParkingFormProps {
  isOpen: boolean;
  initialParking?: Parking | null;
  onCancel: () => void;
  onSave: (values: ParkingFormValues) => void;
}

type FormErrors = Partial<Record<keyof ParkingFormValues, string>>;

const emptyForm: ParkingFormValues = {
  placeNumber: 1,
  licensePlate: '',
  ownerName: '',
  status: 'Занято',
};

export default function ParkingForm({
  isOpen,
  initialParking,
  onCancel,
  onSave,
}: ParkingFormProps) {
  const [values, setValues] = useState<ParkingFormValues>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isOpen) {
      setValues(initialParking ?? emptyForm);
      setErrors({});
    }
  }, [initialParking, isOpen]);

  if (!isOpen) {
    return null;
  }

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!values.placeNumber || Number(values.placeNumber) < 1) {
      nextErrors.placeNumber = 'Поле обязательно для заполнения';
    }

    if (!values.licensePlate.trim()) {
      nextErrors.licensePlate = 'Поле обязательно для заполнения';
    }

    if (!values.ownerName.trim()) {
      nextErrors.ownerName = 'Поле обязательно для заполнения';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSave({
      ...values,
      placeNumber: Number(values.placeNumber),
      licensePlate: values.licensePlate.trim(),
      ownerName: values.ownerName.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 p-4">
      <form
        className="w-full max-w-lg rounded-app bg-white p-6 shadow-soft"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-950">
            {initialParking ? 'Редактировать запись' : 'Добавить автомобиль'}
          </h2>
          <button
            aria-label="Закрыть"
            className="flex h-9 w-9 items-center justify-center rounded-app text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            onClick={onCancel}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          <Field label="Номер парковочного места" error={errors.placeNumber}>
            <input
              className="h-11 w-full rounded-app border border-slate-200 px-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100"
              min={1}
              type="number"
              value={values.placeNumber}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  placeNumber: Number(event.target.value),
                }))
              }
            />
          </Field>

          <Field label="Государственный номер" error={errors.licensePlate}>
            <input
              className="h-11 w-full rounded-app border border-slate-200 px-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100"
              placeholder="123 ABC 02"
              type="text"
              value={values.licensePlate}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  licensePlate: event.target.value,
                }))
              }
            />
          </Field>

          <Field label="Имя владельца" error={errors.ownerName}>
            <input
              className="h-11 w-full rounded-app border border-slate-200 px-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100"
              type="text"
              value={values.ownerName}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  ownerName: event.target.value,
                }))
              }
            />
          </Field>

          <Field label="Статус">
            <select
              className="h-11 w-full rounded-app border border-slate-200 bg-white px-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100"
              value={values.status}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  status: event.target.value as ParkingStatus,
                }))
              }
            >
              <option>Занято</option>
              <option>Свободно</option>
            </select>
          </Field>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            className="h-11 rounded-app border border-slate-200 px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            onClick={onCancel}
            type="button"
          >
            Отмена
          </button>
          <button
            className="h-11 rounded-app bg-primary px-5 text-sm font-medium text-white transition hover:bg-blue-700"
            type="submit"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error ? <span className="text-sm text-red-600">{error}</span> : null}
    </label>
  );
}
