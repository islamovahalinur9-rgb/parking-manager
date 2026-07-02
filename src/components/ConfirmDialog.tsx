interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-sm rounded-app bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-950">Удалить запись?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Вы действительно хотите удалить запись?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="h-10 rounded-app border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            onClick={onCancel}
            type="button"
          >
            Нет
          </button>
          <button
            className="h-10 rounded-app bg-primary px-4 text-sm font-medium text-white transition hover:bg-blue-700"
            onClick={onConfirm}
            type="button"
          >
            Да
          </button>
        </div>
      </div>
    </div>
  );
}
