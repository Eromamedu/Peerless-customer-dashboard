import { Users } from "lucide-react";

interface CustomerEmptyStateProps {
  onClearFilters: () => void;
}

export function CustomerEmptyState({
  onClearFilters,
}: CustomerEmptyStateProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">

      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/10 bg-blue-500/10 text-blue-400">

        <Users size={30} />

      </div>

      <h3 className="text-lg font-bold text-white">
        No customers found
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        Try changing your search or
        filter settings.
      </p>

      <button
        type="button"
        onClick={onClearFilters}
        className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-4 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
      >
        Clear Filters
      </button>

    </div>
  );
}