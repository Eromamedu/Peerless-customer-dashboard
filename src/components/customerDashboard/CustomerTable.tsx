import type { Customer } from "../../types/customer";

import { CustomerTableRow } from "./CustomerTableRow";


interface CustomerTableProps {
  customers: Customer[];

  onDelete: (
    customer: Customer
  ) => void;

  deletingId: string | null;
}


export function CustomerTable({
  customers,
  onDelete,
  deletingId,
}: CustomerTableProps) {

  return (
    <div className="w-full overflow-x-auto">

      <table className="w-full min-w-[1200px] border-collapse text-left">

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


            <th className="px-7 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
              Status
            </th>


            <th className="px-7 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
              Created
            </th>


            {/* =================================================
                ACTION
            ================================================== */}

            <th className="px-11 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
              Action
            </th>

          </tr>

        </thead>


        <tbody className="divide-y divide-slate-800">

          {customers.map(
            (customer) => (

              <CustomerTableRow
                key={customer.id}
                customer={customer}
                onDelete={onDelete}
                deletingId={deletingId}
              />

            )
          )}

        </tbody>

      </table>

    </div>
  );
}


// import type { Customer } from "../../types/customer";

// import { CustomerTableRow } from "./CustomerTableRow";

// interface CustomerTableProps {
//   customers: Customer[];
// }

// export function CustomerTable({
//   customers,
// }: CustomerTableProps) {
//   return (
//     <div className="w-full overflow-x-auto">

//       <table className="w-full min-w-[1050px] border-collapse text-left">

//         <thead>

//           <tr className="border-b border-slate-800 bg-[#091523]">

//             <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//               Business
//             </th>

//             <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//               Contact Person
//             </th>

//             <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//               Contact Details
//             </th>

//             <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//               Type
//             </th>

//             <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//               Industry
//             </th>

//             <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//               Status
//             </th>

//             <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
//               Created
//             </th>

//           </tr>

//         </thead>

//         <tbody className="divide-y divide-slate-800">

//           {customers.map(
//             (customer) => (
//               <CustomerTableRow
//                 key={customer.id}
//                 customer={customer}
//               />
//             )
//           )}

//         </tbody>

//       </table>

//     </div>
//   );
// }