import { Trash2 } from "lucide-react";

interface DeleteCustomerButtonProps {
  customerName: string;
  disabled?: boolean;
  onClick: () => void;
}

export function DeleteCustomerButton({
  customerName,
  disabled = false,
  onClick,
}: DeleteCustomerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Delete ${customerName}`}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-3 text-sm font-semibold text-red-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 focus:outline-none focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={16} />

      Delete
    </button>
  );
}