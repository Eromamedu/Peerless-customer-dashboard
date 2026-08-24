import {
  ChevronDown,
  Search,
} from "lucide-react";

import type {
  CustomerStatus,
  Industry,
} from "../../types/customer";

interface CustomerFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  status: CustomerStatus | "All";
  setStatus: (
    value: CustomerStatus | "All"
  ) => void;

  industry: Industry | "All";
  setIndustry: (
    value: Industry | "All"
  ) => void;

  industries: Industry[];
}

export function CustomerFilters({
  search,
  setSearch,
  status,
  setStatus,
  industry,
  setIndustry,
  industries,
}: CustomerFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-3 border-b border-slate-800 bg-[#091523] p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[minmax(240px,1fr)_180px_180px]">

      {/* SEARCH */}

      <div className="relative w-full">

        <Search
          size={17}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-500"
        />

        <input
          type="search"
          placeholder="Search customers..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          aria-label="Search customers"
          className="h-11 w-full rounded-xl border border-slate-700 bg-[#0b1728] pl-10 pr-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-600 hover:border-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />

      </div>


      {/* STATUS */}

      <div className="relative">

        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target
                .value as CustomerStatus | "All"
            )
          }
          aria-label="Filter by status"
          className="h-11 w-full appearance-none rounded-xl border border-slate-700 bg-[#0b1728] px-3 pr-10 text-sm text-slate-300 outline-none transition-all duration-200 hover:border-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        >

          <option value="All">
            All Statuses
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Inactive">
            Inactive
          </option>

        </select>

        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />

      </div>


      {/* INDUSTRY */}

      <div className="relative">

        <select
          value={industry}
          onChange={(event) =>
            setIndustry(
              event.target
                .value as Industry | "All"
            )
          }
          aria-label="Filter by industry"
          className="h-11 w-full appearance-none rounded-xl border border-slate-700 bg-[#0b1728] px-3 pr-10 text-sm text-slate-300 outline-none transition-all duration-200 hover:border-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        >

          <option value="All">
            All Industries
          </option>

          {industries.map(
            (industryName) => (
              <option
                key={industryName}
                value={industryName}
              >
                {industryName}
              </option>
            )
          )}

        </select>

        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />

      </div>

    </div>
  );
}