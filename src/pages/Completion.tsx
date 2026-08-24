import {
  CheckCircle2,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

interface CompletionProps {
  onRegisterAnother: () => void;
}

export default function Completion({
  onRegisterAnother,
}: CompletionProps) {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#070d1a] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">

        <div className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-[#0d1628]
          p-8
          text-center
          shadow-2xl
          shadow-black/30
          sm:p-12
        ">

          <div className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-2xl
            bg-emerald-500/10
            text-emerald-400
            ring-1
            ring-emerald-500/20
          ">
            <CheckCircle2 size={42} />
          </div>

          <h1 className="mt-7 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Customer registered successfully
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
            The customer has been successfully added to the customer management system.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <button
              type="button"
              onClick={onRegisterAnother}
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                bg-blue-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-blue-600/20
                transition
                duration-200
                hover:-translate-y-0.5
                hover:bg-blue-500
              "
            >
              Register Another Customer
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/customers")
              }
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-5
                py-2.5
                text-sm
                font-semibold
                text-slate-300
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              View Customers
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}