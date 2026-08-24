import {
  Building2,
  Users,
} from "lucide-react";

interface CustomerStatsProps {
  totalCustomers: number;
  activeCustomers: number;
  pendingCustomers: number;
  inactiveCustomers: number;
}

export function CustomerStats({
  totalCustomers,
  activeCustomers,
  pendingCustomers,
  inactiveCustomers,
}: CustomerStatsProps) {
  return (
    <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {/* TOTAL */}

      <div className="group animate-[fadeIn_0.5s_ease-out] rounded-2xl border border-slate-800 bg-[#0b1728] p-5 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-blue-950/20">

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Customers
            </p>

            <strong className="mt-2 block text-3xl font-bold tracking-tight text-white">
              {totalCustomers}
            </strong>

          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-110">
            <Users size={21} />
          </div>

        </div>

        <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-800">

          <div className="h-full w-full rounded-full bg-blue-500/70" />

        </div>

      </div>


      {/* ACTIVE */}

      <div className="group animate-[fadeIn_0.6s_ease-out] rounded-2xl border border-slate-800 bg-[#0b1728] p-5 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-emerald-950/10">

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Customers
            </p>

            <strong className="mt-2 block text-3xl font-bold tracking-tight text-white">
              {activeCustomers}
            </strong>

          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-500/10 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
            <Building2 size={21} />
          </div>

        </div>

        <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-800">

          <div className="h-full w-3/4 rounded-full bg-emerald-500/70" />

        </div>

      </div>


      {/* PENDING */}

      <div className="group animate-[fadeIn_0.7s_ease-out] rounded-2xl border border-slate-800 bg-[#0b1728] p-5 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-amber-950/10">

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pending
            </p>

            <strong className="mt-2 block text-3xl font-bold tracking-tight text-white">
              {pendingCustomers}
            </strong>

          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-400/10 bg-amber-500/10 text-amber-400 transition-transform duration-300 group-hover:scale-110">
            <Users size={21} />
          </div>

        </div>

        <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-800">

          <div className="h-full w-1/2 rounded-full bg-amber-500/70" />

        </div>

      </div>


      {/* INACTIVE */}

      <div className="group animate-[fadeIn_0.8s_ease-out] rounded-2xl border border-slate-800 bg-[#0b1728] p-5 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-black/20">

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Inactive
            </p>

            <strong className="mt-2 block text-3xl font-bold tracking-tight text-white">
              {inactiveCustomers}
            </strong>

          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/70 text-slate-400 transition-transform duration-300 group-hover:scale-110">
            <Building2 size={21} />
          </div>

        </div>

        <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-800">

          <div className="h-full w-1/4 rounded-full bg-slate-500/70" />

        </div>

      </div>

    </section>
  );
}