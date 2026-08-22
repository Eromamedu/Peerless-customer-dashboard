import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  Building2,
  ChevronDown,
  Mail,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import type {
  Customer,
  CustomerStatus,
  Industry,
} from "../types/customer";

import { listCustomers } from "../services/customerService";

import { StatusBadge } from "../components/ui/StatusBadge";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<CustomerStatus | "All">("All");
  const [industry, setIndustry] =
    useState<Industry | "All">("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  /*
   * =========================================================
   * DEBOUNCE SEARCH
   * =========================================================
   */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  /*
   * =========================================================
   * LOAD CUSTOMERS
   * =========================================================
   */

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await listCustomers();

      setCustomers(data);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load customers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  /*
   * =========================================================
   * FILTER CUSTOMERS
   * =========================================================
   */

  const filtered = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        !query ||
        [
          customer.businessName,
          customer.contactPerson,
          customer.email,
        ].some((value) =>
          value.toLowerCase().includes(query)
        );

      const matchesStatus =
        status === "All" ||
        customer.status === status;

      const matchesIndustry =
        industry === "All" ||
        customer.industry === industry;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesIndustry
      );
    });
  }, [
    customers,
    debouncedSearch,
    status,
    industry,
  ]);

  /*
   * =========================================================
   * DASHBOARD STATISTICS
   * =========================================================
   */

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) =>
      customer.status === "Active"
  ).length;

  const pendingCustomers = customers.filter(
    (customer) =>
      customer.status === "Pending"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) =>
      customer.status === "Inactive"
  ).length;

  /*
   * =========================================================
   * INDUSTRIES
   * =========================================================
   */

  const industries = useMemo(() => {
    return Array.from(
      new Set(
        customers.map(
          (customer) => customer.industry
        )
      )
    );
  }, [customers]);

  /*
   * =========================================================
   * LOADING STATE
   * =========================================================
   */

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-72px)] bg-[#07111f] px-4 py-6 text-white sm:px-6 lg:px-8 lg:py-9">

        <div className="mx-auto w-full max-w-[1440px]">

          <div className="mb-8 animate-pulse">
            <div className="h-8 w-64 rounded-lg bg-slate-800" />

            <div className="mt-3 h-4 w-80 max-w-full rounded bg-slate-800" />
          </div>

          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1728] shadow-2xl shadow-black/20">

            <div className="border-b border-slate-800 px-5 py-6 sm:px-6">

              <div className="h-5 w-28 rounded bg-slate-800" />

              <div className="mt-3 h-4 w-48 rounded bg-slate-800" />

            </div>

            <div className="p-6">

              <div className="space-y-4">

                <div className="h-12 rounded-lg bg-slate-800/70" />

                <div className="h-12 rounded-lg bg-slate-800/70" />

                <div className="h-12 rounded-lg bg-slate-800/70" />

              </div>

            </div>

          </section>

        </div>
      </main>
    );
  }

  /*
   * =========================================================
   * ERROR STATE
   * =========================================================
   */

  if (error) {
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
              onClick={loadCustomers}
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

  /*
   * =========================================================
   * MAIN DASHBOARD
   * =========================================================
   */

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#07111f] px-4 py-6 text-white sm:px-6 lg:px-8 lg:py-9">

      <div className="mx-auto w-full max-w-[1440px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="mb-8 flex animate-[fadeIn_0.5s_ease-out] flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="mb-3 flex items-center gap-2">

              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Customer Management
              </span>

            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px]">
              Customer Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-[15px]">
              Monitor and manage your business
              customers from one place.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/customers/register")
            }
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-blue-600 px-5 text-sm font-semibold text-white shadow-xl shadow-blue-950/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-900/50 focus:outline-none focus:ring-4 focus:ring-blue-500/20 sm:w-auto"
          >

            <Plus
              size={18}
              className="transition-transform duration-200 group-hover:rotate-90"
            />

            Register Customer

          </button>

        </header>

        {/* =====================================================
            STATISTICS
        ====================================================== */}

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

        {/* =====================================================
            CUSTOMER SECTION
        ====================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1728] shadow-2xl shadow-black/20">

          {/* SECTION HEADER */}

          <div className="flex flex-col gap-2 border-b border-slate-800 px-5 py-6 sm:px-6">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Users size={18} />
              </div>

              <div>

                <h2 className="text-lg font-bold text-white">
                  Customers
                </h2>

                <p className="text-sm text-slate-500">
                  {filtered.length}{" "}
                  {filtered.length === 1
                    ? "customer"
                    : "customers"}{" "}
                  found
                </p>

              </div>

            </div>

          </div>

          {/* ===================================================
              FILTERS
          ==================================================== */}

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

          {/* ===================================================
              EMPTY STATE
          ==================================================== */}

          {filtered.length === 0 ? (

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
                onClick={() => {
                  setSearch("");
                  setStatus("All");
                  setIndustry("All");
                }}
                className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-4 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              >
                Clear Filters
              </button>

            </div>

          ) : (

            /* =================================================
               CUSTOMER TABLE
            ================================================== */

            <div className="w-full overflow-x-auto">

              <table className="w-full min-w-[1050px] border-collapse text-left">

                <thead>

                  <tr className="border-b border-slate-800 bg-[#091523]">

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Business
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Contact Person
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Contact Details
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Type
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Industry
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Created
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-800">

                  {filtered.map(
                    (customer) => (

                      <tr
                        key={customer.id}
                        className="group transition-colors duration-200 hover:bg-blue-500/[0.035]"
                      >

                        {/* BUSINESS */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/10 text-sm font-bold text-blue-400 transition-all duration-200 group-hover:border-blue-400/20 group-hover:bg-blue-500/15">
                              {customer.businessName
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div className="min-w-0">

                              <strong className="block truncate text-sm font-semibold text-slate-200">
                                {customer.businessName}
                              </strong>

                              <span className="mt-0.5 block text-xs text-slate-600">
                                {customer.id}
                              </span>

                            </div>

                          </div>

                        </td>

                        {/* CONTACT PERSON */}

                        <td className="px-5 py-4">

                          <span className="text-sm font-medium text-slate-300">
                            {customer.contactPerson}
                          </span>

                        </td>

                        {/* CONTACT DETAILS */}

                        <td className="px-5 py-4">

                          <div className="flex flex-col gap-1.5">

                            <span className="flex items-center gap-2 text-xs text-slate-400">

                              <Mail
                                size={14}
                                className="shrink-0 text-slate-600"
                              />

                              <span>
                                {customer.email}
                              </span>

                            </span>

                            <span className="flex items-center gap-2 text-xs text-slate-400">

                              <Phone
                                size={14}
                                className="shrink-0 text-slate-600"
                              />

                              <span>
                                {customer.phone}
                              </span>

                            </span>

                          </div>

                        </td>

                        {/* TYPE */}

                        <td className="whitespace-nowrap px-5 py-4 align-middle text-sm text-slate-400">
                          {customer.type}
                        </td>

                        {/* INDUSTRY */}

                        <td className="whitespace-nowrap px-5 py-4 align-middle text-sm text-slate-400">
                          {customer.industry}
                        </td>

                        {/* STATUS */}

                        <td className="whitespace-nowrap px-5 py-4 align-middle">
                          <StatusBadge
                            status={customer.status}
                          />
                        </td>

                        {/* CREATED */}

                        <td className="whitespace-nowrap px-5 py-4 align-middle text-sm text-slate-500">

                          {new Date(
                            customer.createdAt
                          ).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </div>

      {/* Small local animation */}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `}
      </style>

    </main>
  );
}


// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   AlertCircle,
//   Building2,
//   ChevronDown,
//   Mail,
//   Phone,
//   Plus,
//   RefreshCw,
//   Search,
//   Users,
// } from "lucide-react";

// import { useNavigate } from "react-router-dom";

// import type {
//   Customer,
//   CustomerStatus,
//   Industry,
// } from "../types/customer";

// import { listCustomers } from "../services/customerService";

// import { StatusBadge } from "../components/ui/StatusBadge";
// // import { CustomerTableSkeleton } from "../components/ui/CustomerTableSkeleton";

// export default function CustomerDashboard() {
//   const navigate = useNavigate();

//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] =
//     useState<CustomerStatus | "All">("All");
//   const [industry, setIndustry] =
//     useState<Industry | "All">("All");

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [debouncedSearch, setDebouncedSearch] =
//     useState("");

//   /*
//    * =========================================================
//    * DEBOUNCE SEARCH
//    * =========================================================
//    */

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(search);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [search]);

//   /*
//    * =========================================================
//    * LOAD CUSTOMERS
//    * =========================================================
//    */

//   const loadCustomers = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const data = await listCustomers();

//       setCustomers(data);
//     } catch (err) {
//       console.error(err);

//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load customers."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCustomers();
//   }, []);

//   /*
//    * =========================================================
//    * FILTER CUSTOMERS
//    * =========================================================
//    */

//   const filtered = useMemo(() => {
//     const query = debouncedSearch.trim().toLowerCase();

//     return customers.filter((customer) => {
//       const matchesSearch =
//         !query ||
//         [
//           customer.businessName,
//           customer.contactPerson,
//           customer.email,
//         ].some((value) =>
//           value.toLowerCase().includes(query)
//         );

//       const matchesStatus =
//         status === "All" ||
//         customer.status === status;

//       const matchesIndustry =
//         industry === "All" ||
//         customer.industry === industry;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesIndustry
//       );
//     });
//   }, [
//     customers,
//     debouncedSearch,
//     status,
//     industry,
//   ]);

//   /*
   
//    * DASHBOARD STATISTICS
//    */

//   const totalCustomers = customers.length;

//   const activeCustomers = customers.filter(
//     (customer) =>
//       customer.status === "Active"
//   ).length;

//   const pendingCustomers = customers.filter(
//     (customer) =>
//       customer.status === "Pending"
//   ).length;

//   const inactiveCustomers = customers.filter(
//     (customer) =>
//       customer.status === "Inactive"
//   ).length;

//   /*
//    * INDUSTRIES
//    */

//   const industries = useMemo(() => {
//     return Array.from(
//       new Set(
//         customers.map(
//           (customer) => customer.industry
//         )
//       )
//     );
//   }, [customers]);

//   /*
//    * LOADING STATE
//    */

//   if (loading) {
//     return (
//       <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
//         <div className="mx-auto w-full max-w-[1440px]">

//           {/* Header */}

//           <div className="mb-7 flex flex-col gap-5">
//             <div>
//               <h1 className="text-2xl font-bold tracking-tight text-[#0f2747] sm:text-3xl lg:text-[36px]">
//                 Customer Dashboard
//               </h1>

//               <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
//                 Monitor and manage your business
//                 customers from one place.
//               </p>
//             </div>
//           </div>

//           {/* Loading section */}

//           <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

//             <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
//               <h2 className="text-lg font-bold text-[#0f2747]">
//                 Customers
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 Loading customers...
//               </p>
//             </div>

//             {/* <CustomerTableSkeleton /> */}
//           </section>
//         </div>
//       </main>
//     );
//   }

//   /*
//    * =========================================================
//    * ERROR STATE
//    * =========================================================
//    */

//   if (error) {
//     return (
//       <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">

//         <div className="mx-auto flex min-h-[500px] w-full max-w-[1440px] items-center justify-center">

//           <div className="w-full max-w-lg rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">

//             <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
//               <AlertCircle size={30} />
//             </div>

//             <h2 className="text-xl font-bold text-[#0f2747]">
//               Unable to load customers
//             </h2>

//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               {error}
//             </p>

//             <button
//               type="button"
//               onClick={loadCustomers}
//               className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0f2747] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#16385f] focus:outline-none focus:ring-4 focus:ring-blue-100"
//             >
//               <RefreshCw size={17} />

//               Try Again
//             </button>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   /*
//    * =========================================================
//    * MAIN DASHBOARD
//    * =========================================================
//    */

//   return (
//     <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 lg:py-9">

//       <div className="mx-auto w-full max-w-[1440px]">

//         {/* =====================================================
//             HEADER
//         ====================================================== */}

//         {/* <header className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"> */}
//         <header className="mb-7 flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start lg:justify-between">

//           <div>
//             <h1 className="text-2xl font-bold tracking-tight text-[#0f2747] sm:text-3xl lg:text-[36px]">
//               Customer Dashboard
//             </h1>

//             <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
//               Monitor and manage your business
//               customers from one place.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() =>
//               navigate("/customers/register")
//             }
//             className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0f2747] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#16385f] focus:outline-none focus:ring-4 focus:ring-blue-100 sm:w-auto"
//           >
//             <Plus size={18} />

//             Register Customer
//           </button>
//         </header>

//         {/* =====================================================
//             STATISTICS
//         ====================================================== */}

//         {/* <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"> */}
//         <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">

//           {/* TOTAL */}

//           {/* <div className="flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"> */}
// <div className="flex min-w-0 w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
//               <Users size={22} />
//             </div>

//             {/* <div className="min-w-0"> */}
//             <div className="min-w-0 flex-1">
//               <p className="text-sm font-medium text-slate-500">
//                 Total Customers
//               </p>

//               <strong className="mt-1 block text-2xl font-bold tracking-tight text-[#0f2747]">
//                 {totalCustomers}
//               </strong>
//             </div>
//           </div>

//           {/* ACTIVE */}

//           {/* <div className="flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"> */}
//           <div className="flex min-w-0 w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
//               <Building2 size={22} />
//             </div>

//             {/* <div className="min-w-0"> */}
//             <div className="min-w-0 flex-1">
//               <p className="text-sm font-medium text-slate-500">
//                 Active Customers
//               </p>

//               <strong className="mt-1 block text-2xl font-bold tracking-tight text-[#0f2747]">
//                 {activeCustomers}
//               </strong>
//             </div>
//           </div>

//           {/* PENDING */}

//           {/* <div className="flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"> */}
//           <div className="flex min-w-0 w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
//               <Users size={22} />
//             </div>

//             {/* <div className="min-w-0"> */}
//             <div className="min-w-0 flex-1">
//               <p className="text-sm font-medium text-slate-500">
//                 Pending
//               </p>

//               <strong className="mt-1 block text-2xl font-bold tracking-tight text-[#0f2747]">
//                 {pendingCustomers}
//               </strong>
//             </div>
//           </div>

//           {/* INACTIVE */}

//           {/* <div className="flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"> */}
//           <div className="flex min-w-0 w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">


//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
//               <Building2 size={22} />
//             </div>

//             {/* <div className="min-w-0"> */}
//             <div className="min-w-0 flex-1">
//               <p className="text-sm font-medium text-slate-500">
//                 Inactive
//               </p>

//               <strong className="mt-1 block text-2xl font-bold tracking-tight text-[#0f2747]">
//                 {inactiveCustomers}
//               </strong>
//             </div>
//           </div>
//         </section>

//         {/* =====================================================
//             CUSTOMER SECTION
//         ====================================================== */}

//         <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

//           {/* SECTION HEADER */}

//           <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-5 sm:px-6">

//             <h2 className="text-lg font-bold text-[#0f2747]">
//               Customers
//             </h2>

//             <p className="text-sm text-slate-500">
//               {filtered.length}{" "}
//               {filtered.length === 1
//                 ? "customer"
//                 : "customers"}{" "}
//               found
//             </p>
//           </div>

//           {/* ===================================================
//               FILTERS
//           ==================================================== */}

//           {/* <div className="grid grid-cols-1 gap-3 border-b border-slate-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(240px,1fr)_180px_180px]"> */}
//       <div className="grid grid-cols-1 gap-3 border-b border-slate-200 bg-white p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[minmax(240px,1fr)_180px_180px]">
//             {/* SEARCH */}

//             <div className="relative w-full">

//               <Search
//                 size={17}
//                 aria-hidden="true"
//                 className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400"
//               />

//               <input
//                 type="search"
//                 placeholder="Search customers..."
//                 value={search}
//                 onChange={(event) =>
//                   setSearch(event.target.value)
//                 }
//                 aria-label="Search customers"
//                 className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//               />
//             </div>

//             {/* STATUS */}

//             <div className="relative">

//               <select
//                 value={status}
//                 onChange={(event) =>
//                   setStatus(
//                     event.target
//                       .value as CustomerStatus | "All"
//                   )
//                 }
//                 aria-label="Filter by status"
//                 className="h-11 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 pr-10 text-sm text-slate-700 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//               >
//                 <option value="All">
//                   All Statuses
//                 </option>

//                 <option value="Active">
//                   Active
//                 </option>

//                 <option value="Pending">
//                   Pending
//                 </option>

//                 <option value="Inactive">
//                   Inactive
//                 </option>
//               </select>

//               <ChevronDown
//                 size={16}
//                 aria-hidden="true"
//                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />
//             </div>

//             {/* INDUSTRY */}

//             <div className="relative">

//               <select
//                 value={industry}
//                 onChange={(event) =>
//                   setIndustry(
//                     event.target
//                       .value as Industry | "All"
//                   )
//                 }
//                 aria-label="Filter by industry"
//                 className="h-11 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 pr-10 text-sm text-slate-700 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//               >
//                 <option value="All">
//                   All Industries
//                 </option>

//                 {industries.map(
//                   (industryName) => (
//                     <option
//                       key={industryName}
//                       value={industryName}
//                     >
//                       {industryName}
//                     </option>
//                   )
//                 )}
//               </select>

//               <ChevronDown
//                 size={16}
//                 aria-hidden="true"
//                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />
//             </div>
//           </div>

//           {/* ===================================================
//               EMPTY STATE
//           ==================================================== */}

//           {filtered.length === 0 ? (
//             <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">

//               <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
//                 <Users size={30} />
//               </div>

//               <h3 className="text-lg font-bold text-[#0f2747]">
//                 No customers found
//               </h3>

//               <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
//                 Try changing your search or
//                 filter settings.
//               </p>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setSearch("");
//                   setStatus("All");
//                   setIndustry("All");
//                 }}
//                 className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-[#0f2747] transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-50"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           ) : (

//             /* =================================================
//                CUSTOMER TABLE
//             ================================================== */

//             <div className="w-full overflow-x-auto">

//               {/* <table className="w-full min-w-[1050px] border-collapse"> */}
//               <table className="w-full min-w-[1050px] border-collapse text-left">

//                 <thead>
//                   <tr className="border-b border-slate-200 bg-slate-50">

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Business
//                     </th>

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Contact Person
//                     </th>

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Contact Details
//                     </th>

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Type
//                     </th>

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Industry
//                     </th>

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Status
//                     </th>

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Created
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-200">

//                   {filtered.map(
//                     (customer) => (
//                       <tr
//                         key={customer.id}
//                         className="transition hover:bg-slate-50"
//                       >

//                         {/* BUSINESS */}

//                         <td className="px-5 py-4">

//                           <div className="flex items-center gap-3">

//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0f2747] text-sm font-bold text-white">
//                               {customer.businessName
//                                 .charAt(0)
//                                 .toUpperCase()}
//                             </div>

//                             <div className="min-w-0">

//                               <strong className="block truncate text-sm font-semibold text-[#0f2747]">
//                                 {
//                                   customer.businessName
//                                 }
//                               </strong>

//                               <span className="mt-0.5 block text-xs text-slate-400">
//                                 {customer.id}
//                               </span>

//                             </div>
//                           </div>
//                         </td>

//                         {/* CONTACT PERSON */}

//                         <td className="px-5 py-4">

//                           <span className="text-sm font-medium text-slate-700">
//                             {
//                               customer.contactPerson
//                             }
//                           </span>

//                         </td>

//                         {/* CONTACT DETAILS */}

//                         <td className="px-5 py-4">

//                           <div className="flex flex-col gap-1.5">

//                             <span className="flex items-center gap-2 text-xs text-slate-600">

//                               <Mail
//                                 size={14}
//                                 className="shrink-0 text-slate-400"
//                               />

//                               <span>
//                                 {
//                                   customer.email
//                                 }
//                               </span>

//                             </span>

//                             <span className="flex items-center gap-2 text-xs text-slate-600">

//                               <Phone
//                                 size={14}
//                                 className="shrink-0 text-slate-400"
//                               />

//                               <span>
//                                 {
//                                   customer.phone
//                                 }
//                               </span>

//                             </span>

//                           </div>
//                         </td>

//                         {/* TYPE */}

//                         {/* <td className="px-5 py-4 text-sm text-slate-600"> */}
//                         <td className="whitespace-nowrap px-5 py-4 align-middle text-sm text-slate-600">
//                           {customer.type}
//                         </td>

//                         {/* INDUSTRY */}

//                         {/* <td className="px-5 py-4 text-sm text-slate-600"> */}
//                         <td className="whitespace-nowrap px-5 py-4 align-middle text-sm text-slate-600">
//                           {customer.industry}
//                         </td>

//                         {/* STATUS */}

//                         {/* <td className="px-5 py-4"> */}
//                         {/* <td className="whitespace-nowrap px-5 py-4 align-middle"> */}
//                      <td className="whitespace-nowrap px-1 py-4 align-middle text-sm text-slate-600">
//                           <StatusBadge
//                             status={
//                               customer.status
//                             }
//                           />
//                         </td>

//                         {/* CREATED */}

//                         {/* <td className="px-5 py-4 text-sm text-slate-600"> */}
//                         <td className="whitespace-nowrap px-5 py-4 align-middle text-sm text-slate-600">
//                           {new Date(
//                             customer.createdAt
//                           ).toLocaleDateString(
//                             "en-GB",
//                             {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                             }
//                           )}
//                         </td>

//                       </tr>
//                     )
//                   )}

//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// }


// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   AlertCircle,
//   Building2,
//   ChevronDown,
//   Mail,
//   Phone,
//   Plus,
//   RefreshCw,
//   Search,
//   Users,
// } from "lucide-react";

// import type {
//   Customer,
//   CustomerStatus,
//   Industry,
// } from "../types/customer";

// import {
//   listCustomers,
// } from "../services/customerService";

// import { StatusBadge } from "../components/ui/StatusBadge";
// import { CustomerTableSkeleton } from "../components/ui/CustomerTableSkeleton";
// import { useNavigate } from "react-router-dom";

// export default function CustomerDashboard() {
//   const navigate = useNavigate();
//   const [customers, setCustomers] = useState<Customer[]>([]);

//   const [search, setSearch] = useState("");

//   const [status, setStatus] =
//     useState<CustomerStatus | "All">("All");

//   const [industry, setIndustry] =
//     useState<Industry | "All">("All");

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState<string | null>(
//     null
//   );

//   const [debouncedSearch, setDebouncedSearch] =
//     useState("");

//   /*
//    * Debounce search input.
//    *
//    * Instead of filtering on every single keystroke,
//    * we wait 300ms after the user stops typing.
//    */
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(search);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [search]);

//   /*
//    * Load customers from the mock API.
//    */
//   const loadCustomers = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const data = await listCustomers();

//       setCustomers(data);
//     } catch (err) {
//       console.error(err);

//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load customers."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /*
//    * Load customers when the dashboard first opens.
//    */
//   useEffect(() => {
//     loadCustomers();
//   }, []);

//   /*
//    * Filter customers based on:
//    *
//    * - Search
//    * - Status
//    * - Industry
//    */
//   const filtered = useMemo(() => {
//     const query =
//       debouncedSearch.trim().toLowerCase();

//     return customers.filter((customer) => {
//       const matchesSearch =
//         !query ||
//         [
//           customer.businessName,
//           customer.contactPerson,
//           customer.email,
//         ].some((value) =>
//           value
//             .toLowerCase()
//             .includes(query)
//         );

//       const matchesStatus =
//         status === "All" ||
//         customer.status === status;

//       const matchesIndustry =
//         industry === "All" ||
//         customer.industry === industry;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesIndustry
//       );
//     });
//   }, [
//     customers,
//     debouncedSearch,
//     status,
//     industry,
//   ]);

//   /*
//    * Dashboard statistics.
//    */
//   const totalCustomers = customers.length;

//   const activeCustomers = customers.filter(
//     (customer) =>
//       customer.status === "Active"
//   ).length;

//   const pendingCustomers = customers.filter(
//     (customer) =>
//       customer.status === "Pending"
//   ).length;

//   const inactiveCustomers = customers.filter(
//     (customer) =>
//       customer.status === "Inactive"
//   ).length;

//   /*
//    * Get unique industries from the customer data.
//    */
//   const industries = useMemo(() => {
//     return Array.from(
//       new Set(
//         customers.map(
//           (customer) => customer.industry
//         )
//       )
//     );
//   }, [customers]);

//   /*
//    * Loading state.
//    */
//   if (loading) {
//     return (
//     //   <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 text-gray-600">
//     <div className="dashboard-page">
//         <div className="mx-auto w-full max-w-[1440px] text-gray-600">

//           {/* Loading Header */}
//           <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
//             <div>
//               <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-blue-600">
//                 Customer Management
//               </p>

//               <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-gray-600">
//               {/* <h1 className="text-gray-600"> */}
//                 Customer Dashboard
//               </h1>

//               <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
//                 Monitor and manage your business
//                 customers from one place.
//               </p>
//             </div>
//           </div>

//           {/* Loading Customer Section */}
//           <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

//             <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
//               <h2 className="text-lg font-bold text-[#0f2747]">
//                 Customers
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 Loading customers...
//               </p>
//             </div>
//             <CustomerTableSkeleton />
//           </section>
//         </div>
//       </div>
//     );
//   }

//   /*
//    * Error state.
//    */
//   if (error) {
//     return (
//       <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
//         <div className="mx-auto flex min-h-[500px] w-full max-w-[1440px] items-center justify-center">

//           <div className="w-full max-w-lg rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">

//             <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
//               <AlertCircle size={30} />
//             </div>

//             <h2 className="text-xl font-bold text-[#0f2747]">
//               Unable to load customers
//             </h2>

//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               {error}
//             </p>

//             <button
//               type="button"
//               onClick={loadCustomers}
//               className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0f2747] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#16385f] focus:outline-none focus:ring-4 focus:ring-blue-100"
//             >
//               <RefreshCw size={17} />

//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">

//       <div className="mx-auto w-full max-w-[1440px]">

//         {/* =====================================================
//             HEADER
//         ====================================================== */}

//         <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

//           <div>
//             {/* <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-blue-600">
//               Customer Management
//             </p> */}

//             <h1 className="text-2xl font-bold tracking-tight text-[#0f2747] sm:text-3xl lg:text-[36px]">
//               Customer Dashboard
//             </h1>

//             <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
//               Monitor and manage your business
//               customers from one place.
//             </p>
//           </div>

//           <button
//             type="button"
//               onClick={() => navigate("/customers/register")}
//             className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0f2747] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#16385f] focus:outline-none focus:ring-4 focus:ring-blue-100 sm:w-auto"
//           >
//             <Plus size={18} />

//             Register Customer
//           </button>
//         </div>

//         {/* =====================================================
//             STATISTICS
//         ====================================================== */}

//         <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

//           {/* Total Customers */}

//           <div className="flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
//               <Users size={22} />
//             </div>

//             <div className="min-w-0">
//               <p className="text-sm font-medium text-slate-500">
//                 Total Customers
//               </p>

//               <strong className="mt-1 block text-2xl font-bold tracking-tight text-[#0f2747]">
//                 {totalCustomers}
//               </strong>
//             </div>
//           </div>

//           {/* Active Customers */}

//           <div className="flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
//               <Building2 size={22} />
//             </div>

//             <div className="min-w-0">
//               <p className="text-sm font-medium text-slate-500">
//                 Active Customers
//               </p>

//               <strong className="mt-1 block text-2xl font-bold tracking-tight text-[#0f2747]">
//                 {activeCustomers}
//               </strong>
//             </div>
//           </div>

//           {/* Pending Customers */}

//           <div className="flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
//               <Users size={22} />
//             </div>

//             <div className="min-w-0">
//               <p className="text-sm font-medium text-slate-500">
//                 Pending
//               </p>

//               <strong className="mt-1 block text-2xl font-bold tracking-tight text-[#0f2747]">
//                 {pendingCustomers}
//               </strong>
//             </div>
//           </div>

//           {/* Inactive Customers */}

//           <div className="flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
//               <Building2 size={22} />
//             </div>

//             <div className="min-w-0">
//               <p className="text-sm font-medium text-slate-500">
//                 Inactive
//               </p>

//               <strong className="mt-1 block text-2xl font-bold tracking-tight text-[#0f2747]">
//                 {inactiveCustomers}
//               </strong>
//             </div>
//           </div>

//         </section>

//         {/* =====================================================
//             CUSTOMER LIST
//         ====================================================== */}

//         <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

//           {/* Section Header */}

//           <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-5 sm:px-6">

//             <h2 className="text-lg font-bold text-[#0f2747]">
//               Customers
//             </h2>

//             <p className="text-sm text-slate-500">
//               {filtered.length}{" "}
//               {filtered.length === 1
//                 ? "customer"
//                 : "customers"}{" "}
//               found
//             </p>
//           </div>

//           {/* =================================================
//               FILTERS
//           ================================================== */}

//           <div className="grid grid-cols-1 gap-3 border-b border-slate-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(240px,1fr)_180px_180px]">

//             {/* Search */}
//             <div className="search-input-wrapper">
//   <Search
//     size={16}
//     aria-hidden="true"
//   />

//   <input
//     type="search"
//     placeholder="Search customers..."
//     value={search}
//     onChange={(event) =>
//       setSearch(event.target.value)
//     }
//     aria-label="Search customers"
//   />
// </div>
//             {/* <div className="relative w-full">
//   <Search
//     size={18}
//     aria-hidden="true"
//     className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400"
//   />

//   <input
//     type="search"
//     placeholder="Search customers..."
//     value={search}
//     onChange={(event) => setSearch(event.target.value)}
//     aria-label="Search customers"
//     className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//   />
// </div> */}

//             {/* <div className="relative">

//               <Search
//                 size={18}
//                 aria-hidden="true"
//                 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />

//               <input
//                 type="search"
//                 placeholder="Search customers..."
//                 value={search}
//                 onChange={(event) =>
//                   setSearch(event.target.value)
//                 }
//                 aria-label="Search customers"
//                 className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//               />
//             </div> */}

//             {/* Status */}

//             <div className="relative">

//               <select
//                 value={status}
//                 onChange={(event) =>
//                   setStatus(
//                     event.target
//                       .value as CustomerStatus | "All"
//                   )
//                 }
//                 aria-label="Filter by status"
//                 className="h-11 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 pr-10 text-sm text-slate-700 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//               >
//                 <option value="All">
//                   All Statuses
//                 </option>

//                 <option value="Active">
//                   Active
//                 </option>

//                 <option value="Pending">
//                   Pending
//                 </option>

//                 <option value="Inactive">
//                   Inactive
//                 </option>
//               </select>

//               <ChevronDown
//                 size={16}
//                 aria-hidden="true"
//                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />
//             </div>

//             {/* Industry */}

//             <div className="relative">

//               <select
//                 value={industry}
//                 onChange={(event) =>
//                   setIndustry(
//                     event.target
//                       .value as Industry | "All"
//                   )
//                 }
//                 aria-label="Filter by industry"
//                 className="h-11 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 pr-10 text-sm text-slate-700 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//               >
//                 <option value="All">
//                   All Industries
//                 </option>

//                 {industries.map(
//                   (industryName) => (
//                     <option
//                       key={industryName}
//                       value={industryName}
//                     >
//                       {industryName}
//                     </option>
//                   )
//                 )}
//               </select>

//               <ChevronDown
//                 size={16}
//                 aria-hidden="true"
//                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />
//             </div>
//           </div>

//           {/* =================================================
//               EMPTY STATE
//           ================================================== */}

//           {filtered.length === 0 ? (
//             <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">

//               <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
//                 <Users size={30} />
//               </div>

//               <h3 className="text-lg font-bold text-[#0f2747]">
//                 No customers found
//               </h3>

//               <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
//                 Try changing your search or
//                 filter settings.
//               </p>

//               <button
//                 type="button"
//                 className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-[#0f2747] transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-50"
//                 onClick={() => {
//                   setSearch("");
//                   setStatus("All");
//                   setIndustry("All");
//                 }}
//               >
//                 Clear Filters
//               </button>
//             </div>
//           ) : (

//             /* =================================================
//                CUSTOMER TABLE
//             ================================================== */

//             <div className="w-full overflow-x-auto">

//               <table className="w-full min-w-[1050px] border-collapse">

//                 <thead>
//                   <tr className="border-b border-slate-200 bg-slate-50">

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Business
//                     </th>

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Contact Person
//                     </th>

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Contact Details
//                     </th>

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Type
//                     </th>

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Industry
//                     </th>

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Status
//                     </th>

//                     <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                       Created
//                     </th>

//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-200">

//                   {filtered.map(
//                     (customer) => (
//                       <tr
//                         key={customer.id}
//                         className="transition hover:bg-slate-50"
//                       >

//                         {/* BUSINESS */}

//                         <td className="px-5 py-4">

//                           <div className="flex items-center gap-3">

//                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0f2747] text-sm font-bold text-white">
//                               {customer.businessName
//                                 .charAt(0)
//                                 .toUpperCase()}
//                             </div>

//                             <div className="min-w-0">

//                               <strong className="block truncate text-sm font-semibold text-[#0f2747]">
//                                 {
//                                   customer.businessName
//                                 }
//                               </strong>

//                               <span className="mt-0.5 block text-xs text-slate-400">
//                                 {customer.id}
//                               </span>

//                             </div>

//                           </div>

//                         </td>

//                         {/* CONTACT PERSON */}

//                         <td className="px-5 py-4">

//                           <span className="text-sm font-medium text-slate-700">
//                             {
//                               customer.contactPerson
//                             }
//                           </span>

//                         </td>

//                         {/* CONTACT DETAILS */}

//                         <td className="px-5 py-4">

//                           <div className="flex flex-col gap-1.5">

//                             <span className="flex items-center gap-2 text-xs text-slate-600">

//                               <Mail
//                                 size={14}
//                                 className="shrink-0 text-slate-400"
//                               />

//                               <span>
//                                 {
//                                   customer.email
//                                 }
//                               </span>

//                             </span>

//                             <span className="flex items-center gap-2 text-xs text-slate-600">

//                               <Phone
//                                 size={14}
//                                 className="shrink-0 text-slate-400"
//                               />

//                               <span>
//                                 {
//                                   customer.phone
//                                 }
//                               </span>

//                             </span>

//                           </div>

//                         </td>

//                         {/* TYPE */}

//                         <td className="px-5 py-4 text-sm text-slate-600">
//                           {customer.type}
//                         </td>

//                         {/* INDUSTRY */}

//                         <td className="px-5 py-4 text-sm text-slate-600">
//                           {customer.industry}
//                         </td>

//                         {/* STATUS */}

//                         <td className="px-5 py-4">
//                           <StatusBadge
//                             status={
//                               customer.status
//                             }
//                           />
//                         </td>

//                         {/* CREATED */}

//                         <td className="px-5 py-4 text-sm text-slate-600">
//                           {new Date(
//                             customer.createdAt
//                           ).toLocaleDateString(
//                             "en-GB",
//                             {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                             }
//                           )}
//                         </td>

//                       </tr>
//                     )
//                   )}

//                 </tbody>

//               </table>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }



// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   AlertCircle,
//   Building2,
//   ChevronDown,
//   Mail,
//   Phone,
//   Plus,
//   RefreshCw,
//   Search,
//   Users,
// } from "lucide-react";

// import type {
//   Customer,
//   CustomerStatus,
//   Industry,
// } from "../types/customer";

// import {
//   listCustomers,
// } from "../services/customerService";

// import { StatusBadge } from "../components/ui/StatusBadge";
// import { CustomerTableSkeleton } from "../components/ui/CustomerTableSkeleton";

// export default function CustomerDashboard() {
//   const [customers, setCustomers] = useState<Customer[]>([]);

//   const [search, setSearch] = useState("");

//   const [status, setStatus] =
//     useState<CustomerStatus | "All">("All");

//   const [industry, setIndustry] =
//     useState<Industry | "All">("All");

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState<string | null>(
//     null
//   );

//   const [debouncedSearch, setDebouncedSearch] =
//     useState("");

//   /*
//    * Debounce search input.
//    *
//    * Instead of filtering on every single keystroke,
//    * we wait 300ms after the user stops typing.
//    */
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(search);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [search]);

//   /*
//    * Load customers from the mock API.
//    */
//   const loadCustomers = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const data = await listCustomers();

//       setCustomers(data);
//     } catch (err) {
//       console.error(err);

//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load customers."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /*
//    * Load customers when the dashboard first opens.
//    */
//   useEffect(() => {
//     loadCustomers();
//   }, []);

//   /*
//    * Filter customers based on:
//    *
//    * - Search
//    * - Status
//    * - Industry
//    */
//   const filtered = useMemo(() => {
//     const query =
//       debouncedSearch.trim().toLowerCase();

//     return customers.filter((customer) => {
//       const matchesSearch =
//         !query ||
//         [
//           customer.businessName,
//           customer.contactPerson,
//           customer.email,
//         ].some((value) =>
//           value
//             .toLowerCase()
//             .includes(query)
//         );

//       const matchesStatus =
//         status === "All" ||
//         customer.status === status;

//       const matchesIndustry =
//         industry === "All" ||
//         customer.industry === industry;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesIndustry
//       );
//     });
//   }, [
//     customers,
//     debouncedSearch,
//     status,
//     industry,
//   ]);

//   /*
//    * Dashboard statistics.
//    */
//   const totalCustomers = customers.length;

//   const activeCustomers = customers.filter(
//     (customer) =>
//       customer.status === "Active"
//   ).length;

//   const pendingCustomers = customers.filter(
//     (customer) =>
//       customer.status === "Pending"
//   ).length;

//   const inactiveCustomers = customers.filter(
//     (customer) =>
//       customer.status === "Inactive"
//   ).length;

//   /*
//    * Get unique industries from the customer data.
//    */
//   const industries = useMemo(() => {
//     return Array.from(
//       new Set(
//         customers.map(
//           (customer) => customer.industry
//         )
//       )
//     );
//   }, [customers]);

//   /*
//    * Loading state.
//    */
// if (loading) {
//   return (
//     <div className="dashboard-page">
//       <div className="dashboard-header">
//         <div>
//           <p className="dashboard-eyebrow">
//             Customer Management
//           </p>

//           <h1>Customer Dashboard</h1>

//           <p className="dashboard-description">
//             Monitor and manage your business
//             customers from one place.
//           </p>
//         </div>
//       </div>

//       <section className="customer-section">
//         <div className="section-heading">
//           <div>
//             <h2>Customers</h2>

//             <p>Loading customers...</p>
//           </div>
//         </div>

//         <CustomerTableSkeleton />
//       </section>
//     </div>
//   );
// }

// //   if (loading) {
// //     return (
// //       <div className="dashboard-page">
// //         <div className="dashboard-loading">
// //           <div className="loading-spinner">
// //             <RefreshCw
// //               size={28}
// //               className="spin"
// //             />
// //           </div>

// //           <h2>Loading customers...</h2>

// //           <p>
// //             Please wait while we retrieve the
// //             customer records.
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

//   /*
//    * Error state.
//    */
//   if (error) {
//     return (
//       <div className="dashboard-page">
//         <div className="dashboard-error">
//           <div className="error-icon">
//             <AlertCircle size={32} />
//           </div>

//           <h2>
//             Unable to load customers
//           </h2>

//           <p>{error}</p>

//           <button
//             type="button"
//             className="button button-primary"
//             onClick={loadCustomers}
//           >
//             <RefreshCw size={17} />

//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-page">
//       {/* =========================
//           HEADER
//       ========================== */}

//       <div className="dashboard-header">
//         <div>
//           <p className="dashboard-eyebrow">
//             Customer Management
//           </p>

//           <h1>
//             Customer Dashboard
//           </h1>

//           <p className="dashboard-description">
//             Monitor and manage your business
//             customers from one place.
//           </p>
//         </div>

//         <button
//           type="button"
//           className="button button-primary register-button"
//         >
//           <Plus size={18} />

//           Register Customer
//         </button>
//       </div>

//       {/* =========================
//           STATISTICS
//       ========================== */}

//       <section className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-card-icon">
//             <Users size={22} />
//           </div>

//           <div>
//             <p>Total Customers</p>

//             <strong>
//               {totalCustomers}
//             </strong>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-card-icon">
//             <Building2 size={22} />
//           </div>

//           <div>
//             <p>Active Customers</p>

//             <strong>
//               {activeCustomers}
//             </strong>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-card-icon">
//             <Users size={22} />
//           </div>

//           <div>
//             <p>Pending</p>

//             <strong>
//               {pendingCustomers}
//             </strong>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-card-icon">
//             <Building2 size={22} />
//           </div>

//           <div>
//             <p>Inactive</p>

//             <strong>
//               {inactiveCustomers}
//             </strong>
//           </div>
//         </div>
//       </section>

//       {/* =========================
//           CUSTOMER LIST
//       ========================== */}

//       <section className="customer-section">
//         <div className="section-heading">
//           <div>
//             <h2>Customers</h2>

//             <p>
//               {filtered.length}{" "}
//               {filtered.length === 1
//                 ? "customer"
//                 : "customers"}{" "}
//               found
//             </p>
//           </div>
//         </div>

//         {/* =========================
//             FILTERS
//         ========================== */}

//         <div className="customer-filters">
//           {/* SEARCH */}

//           <div className="search-wrapper">
//             <Search
//               size={18}
//               aria-hidden="true"
//             />

//             <input
//               type="search"
//               placeholder="Search customers..."
//               value={search}
//               onChange={(event) =>
//                 setSearch(event.target.value)
//               }
//               aria-label="Search customers"
//             />
//           </div>

//           {/* STATUS */}

//           <div className="select-wrapper">
//             <select
//               value={status}
//               onChange={(event) =>
//                 setStatus(
//                   event.target
//                     .value as CustomerStatus | "All"
//                 )
//               }
//               aria-label="Filter by status"
//             >
//               <option value="All">
//                 All Statuses
//               </option>

//               <option value="Active">
//                 Active
//               </option>

//               <option value="Pending">
//                 Pending
//               </option>

//               <option value="Inactive">
//                 Inactive
//               </option>
//             </select>

//             <ChevronDown
//               size={16}
//               aria-hidden="true"
//             />
//           </div>

//           {/* INDUSTRY */}

//           <div className="select-wrapper">
//             <select
//               value={industry}
//               onChange={(event) =>
//                 setIndustry(
//                   event.target
//                     .value as Industry | "All"
//                 )
//               }
//               aria-label="Filter by industry"
//             >
//               <option value="All">
//                 All Industries
//               </option>

//               {industries.map(
//                 (industryName) => (
//                   <option
//                     key={industryName}
//                     value={industryName}
//                   >
//                     {industryName}
//                   </option>
//                 )
//               )}
//             </select>

//             <ChevronDown
//               size={16}
//               aria-hidden="true"
//             />
//           </div>
//         </div>

//         {/* =========================
//             EMPTY STATE
//         ========================== */}

//         {filtered.length === 0 ? (
//           <div className="empty-state">
//             <div className="empty-state-icon">
//               <Users size={30} />
//             </div>

//             <h3>
//               No customers found
//             </h3>

//             <p>
//               Try changing your search or
//               filter settings.
//             </p>

//             <button
//               type="button"
//               className="button button-secondary"
//               onClick={() => {
//                 setSearch("");
//                 setStatus("All");
//                 setIndustry("All");
//               }}
//             >
//               Clear Filters
//             </button>
//           </div>
//         ) : (
//           /* =========================
//              CUSTOMER TABLE
//           ========================== */

//           <div className="customer-table-wrapper">
//             <table className="customer-table">
//               <thead>
//                 <tr>
//                   <th>Business</th>
//                   <th>Contact Person</th>
//                   <th>Contact Details</th>
//                   <th>Type</th>
//                   <th>Industry</th>
//                   <th>Status</th>
//                   <th>Created</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filtered.map(
//                   (customer) => (
//                     <tr key={customer.id}>
//                       {/* BUSINESS */}

//                       <td>
//                         <div className="business-cell">
//                           <div className="business-avatar">
//                             {customer.businessName
//                               .charAt(0)
//                               .toUpperCase()}
//                           </div>

//                           <div>
//                             <strong>
//                               {
//                                 customer.businessName
//                               }
//                             </strong>

//                             <span>
//                               {customer.id}
//                             </span>
//                           </div>
//                         </div>
//                       </td>

//                       {/* CONTACT PERSON */}

//                       <td>
//                         <span className="contact-name">
//                           {
//                             customer.contactPerson
//                           }
//                         </span>
//                       </td>

//                       {/* CONTACT DETAILS */}

//                       <td>
//                         <div className="contact-details">
//                           <span>
//                             <Mail
//                               size={14}
//                             />

//                             {
//                               customer.email
//                             }
//                           </span>

//                           <span>
//                             <Phone
//                               size={14}
//                             />

//                             {
//                               customer.phone
//                             }
//                           </span>
//                         </div>
//                       </td>

//                       {/* TYPE */}

//                       <td>
//                         {customer.type}
//                       </td>

//                       {/* INDUSTRY */}

//                       <td>
//                         {customer.industry}
//                       </td>

//                       {/* STATUS */}

//                       <td>
//                         <StatusBadge
//                           status={
//                             customer.status
//                           }
//                         />
//                       </td>

//                       {/* CREATED DATE */}

//                       <td>
//                         {new Date(
//                           customer.createdAt
//                         ).toLocaleDateString(
//                           "en-GB",
//                           {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           }
//                         )}
//                       </td>
//                     </tr>
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }