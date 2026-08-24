import {
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface CustomerErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function CustomerErrorState({
  error,
  onRetry,
}: CustomerErrorStateProps) {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#07111f] px-4 py-6 text-white sm:px-6 lg:px-8">

      <div className="mx-auto flex min-h-[500px] w-full max-w-[1440px] items-center justify-center">

        <div className="w-full max-w-lg rounded-2xl border border-red-500/20 bg-[#0b1728] p-8 text-center shadow-2xl shadow-black/30">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-400">

            <AlertCircle size={30} />

          </div>

          <h2 className="text-xl font-bold text-white">
            Unable to load customers
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {error}
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          >
            <RefreshCw size={17} />
            Try Again
          </button>

        </div>

      </div>

    </main>
  );
}