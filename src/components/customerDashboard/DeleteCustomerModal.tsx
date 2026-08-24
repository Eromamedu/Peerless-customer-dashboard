import {
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";

import type { Customer } from "../../types/customer";

interface DeleteCustomerModalProps {
  customer: Customer | null;
  deleting: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteCustomerModal({
  customer,
  deleting,
  error,
  onClose,
  onConfirm,
}: DeleteCustomerModalProps) {
  if (!customer) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-customer-title"
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-700 bg-[#0b1728] shadow-2xl shadow-black/50">

        {/* MODAL HEADER */}

        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <Trash2 size={19} />
            </div>

            <h2
              id="delete-customer-title"
              className="text-lg font-bold text-white"
            >
              Delete Customer
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            aria-label="Close dialog"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>

        </div>

        {/* MODAL BODY */}

        <div className="px-5 py-6">

          <p className="text-sm leading-6 text-slate-400">

            Are you sure you want to delete{" "}

            <strong className="font-semibold text-white">
              {customer.businessName}
            </strong>

            ?

          </p>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            This action will remove the customer
            from the customer list.
          </p>

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

        </div>

        {/* MODAL ACTIONS */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-800 bg-[#091523] px-5 py-4 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-5 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white shadow-lg shadow-red-950/30 transition-all duration-200 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {deleting ? (
              <>
                <RefreshCw
                  size={17}
                  className="animate-spin"
                />

                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={17} />

                Delete Customer
              </>
            )}

          </button>

        </div>

      </div>
    </div>
  );
}