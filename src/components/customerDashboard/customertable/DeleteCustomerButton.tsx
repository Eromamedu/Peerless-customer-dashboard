import { useState } from "react";

import { RefreshCw, Trash2 } from "lucide-react";

import type { Customer } from "../../../types/customer";

import { deleteCustomer } from "../../../services/customerService";

interface DeleteCustomerButtonProps {
  customer: Customer;
  onDeleted: (customerId: string) => void;
}

export function DeleteCustomerButton({
  customer,
  onDeleted,
}: DeleteCustomerButtonProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${customer.businessName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await deleteCustomer(customer.id);

      onDeleted(customer.id);
    } catch (error) {
      console.error(error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to delete customer."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      aria-label={`Delete ${customer.businessName}`}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 text-sm font-semibold text-red-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300 focus:outline-none focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {deleting ? (
        <>
          <RefreshCw
            size={16}
            className="animate-spin"
          />

          Deleting...
        </>
      ) : (
        <>
          <Trash2 size={16} />

          Delete
        </>
      )}
    </button>
  );
}