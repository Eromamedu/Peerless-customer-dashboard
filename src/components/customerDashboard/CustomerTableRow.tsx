import {
  Mail,
  Phone,
} from "lucide-react";

import type { Customer } from "../../types/customer";

import { StatusBadge } from "../ui/StatusBadge";

import { DeleteCustomerButton } from "./DeleteCustomerButton";


interface CustomerTableRowProps {
  customer: Customer;

  onDelete: (
    customer: Customer
  ) => void;

  deletingId: string | null;
}


export function CustomerTableRow({
  customer,
  onDelete,
  deletingId,
}: CustomerTableRowProps) {

  return (
    <tr
      className="group transition-colors duration-200 hover:bg-blue-500/[0.035]"
    >

      {/* =====================================================
          BUSINESS
      ====================================================== */}

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


      {/* =====================================================
          CONTACT PERSON
      ====================================================== */}

      <td className="px-5 py-4">

        <span className="text-sm font-medium text-slate-300">

          {customer.contactPerson}

        </span>

      </td>


      {/* =====================================================
          CONTACT DETAILS
      ====================================================== */}

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


      {/* =====================================================
          TYPE
      ====================================================== */}

      <td className="whitespace-nowrap px-5 py-4 align-middle text-sm text-slate-400">

        {customer.type}

      </td>


      {/* =====================================================
          INDUSTRY
      ====================================================== */}

      <td className="whitespace-nowrap px-5 py-4 align-middle text-sm text-slate-400">

        {customer.industry}

      </td>


      {/* =====================================================
          STATUS
      ====================================================== */}

      <td className="whitespace-nowrap px-5 py-4 align-middle">

        <StatusBadge
          status={customer.status}
        />

      </td>


      {/* =====================================================
          CREATED
      ====================================================== */}

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


      {/* =====================================================
          DELETE ACTION
      ====================================================== */}

      <td className="px-5 py-4 text-right">

        <DeleteCustomerButton
          customerName={
            customer.businessName
          }

          disabled={
            deletingId === customer.id
          }

          onClick={() =>
            onDelete(customer)
          }
        />

      </td>

    </tr>
  );
}


// import {
//   Mail,
//   Phone,
// } from "lucide-react";

// import type { Customer } from "../../types/customer";

// import { StatusBadge } from "../ui/StatusBadge";

// interface CustomerTableRowProps {
//   customer: Customer;
// }

// export function CustomerTableRow({
//   customer,
// }: CustomerTableRowProps) {
//   return (
//     <tr
//       className="group transition-colors duration-200 hover:bg-blue-500/[0.035]"
//     >

//       {/* BUSINESS */}

//       <td className="px-5 py-4">

//         <div className="flex items-center gap-3">

//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/10 text-sm font-bold text-blue-400 transition-all duration-200 group-hover:border-blue-400/20 group-hover:bg-blue-500/15">
//             {customer.businessName
//               .charAt(0)
//               .toUpperCase()}
//           </div>

//           <div className="min-w-0">

//             <strong className="block truncate text-sm font-semibold text-slate-200">
//               {customer.businessName}
//             </strong>

//             <span className="mt-0.5 block text-xs text-slate-600">
//               {customer.id}
//             </span>

//           </div>

//         </div>

//       </td>


//       {/* CONTACT PERSON */}

//       <td className="px-5 py-4">

//         <span className="text-sm font-medium text-slate-300">
//           {customer.contactPerson}
//         </span>

//       </td>


//       {/* CONTACT DETAILS */}

//       <td className="px-5 py-4">

//         <div className="flex flex-col gap-1.5">

//           <span className="flex items-center gap-2 text-xs text-slate-400">

//             <Mail
//               size={14}
//               className="shrink-0 text-slate-600"
//             />

//             <span>
//               {customer.email}
//             </span>

//           </span>

//           <span className="flex items-center gap-2 text-xs text-slate-400">

//             <Phone
//               size={14}
//               className="shrink-0 text-slate-600"
//             />

//             <span>
//               {customer.phone}
//             </span>

//           </span>

//         </div>

//       </td>


//       {/* TYPE */}

//       <td className="whitespace-nowrap px-5 py-4 align-middle text-sm text-slate-400">
//         {customer.type}
//       </td>


//       {/* INDUSTRY */}

//       <td className="whitespace-nowrap px-5 py-4 align-middle text-sm text-slate-400">
//         {customer.industry}
//       </td>


//       {/* STATUS */}

//       <td className="whitespace-nowrap px-5 py-4 align-middle">

//         <StatusBadge
//           status={customer.status}
//         />

//       </td>


//       {/* CREATED */}

//       <td className="whitespace-nowrap px-5 py-4 align-middle text-sm text-slate-500">

//         {new Date(
//           customer.createdAt
//         ).toLocaleDateString(
//           "en-GB",
//           {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           }
//         )}

//       </td>

//     </tr>
//   );
// }