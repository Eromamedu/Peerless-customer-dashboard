export function CustomerLoadingState() {
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