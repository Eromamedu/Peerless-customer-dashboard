import type {
  CustomerStatus,
} from "../../types/customer";

export function StatusBadge({
  status,
}: {
  status: CustomerStatus;
}) {
  const statusStyles = {
    Active: {
      badge:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
      dot: "bg-emerald-400",
    },

    Pending: {
      badge:
        "border-amber-500/20 bg-amber-500/10 text-amber-400",
      dot: "bg-amber-400",
    },

    Inactive: {
      badge:
        "border-red-500/20 bg-red-500/10 text-red-400",
      dot: "bg-red-400",
    },
  };

  const styles = statusStyles[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-2.5
        py-1
        text-xs
        font-semibold
        ${styles.badge}
      `}
    >
      <span
        className={`
          h-1.5
          w-1.5
          rounded-full
          ${styles.dot}
        `}
        aria-hidden="true"
      />

      {status}
    </span>
  );
}


// import type { CustomerStatus } from "../../types/customer";

// export function StatusBadge({
//   status,
// }: {
//   status: CustomerStatus;
// }) {
//   const statusStyles = {
//     Active: {
//       badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
//       dot: "text-emerald-500",
//     },

//     Pending: {
//       badge: "bg-amber-50 text-amber-700 border-amber-200",
//       dot: "text-amber-500",
//     },

//     Inactive: {
//       badge: "bg-red-50 text-red-700 border-red-200",
//       dot: "text-red-500",
//     },
//   };

//   const styles = statusStyles[status];

//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
//     >
//       <span
//         className={`text-[10px] leading-none ${styles.dot}`}
//         aria-hidden="true"
//       >
//         ●
//       </span>

//       {status}
//     </span>
//   );
// }


// // import type { CustomerStatus } from "../../types/customer";

// // export function StatusBadge({
// //   status,
// // }: {
// //   status: CustomerStatus;
// // }) {
// //   return (
// //     <span
// //       className={`status-badge status-${status.toLowerCase()}`}
// //     >
// //       <span
// //         className="status-icon"
// //         aria-hidden="true"
// //       >
// //         ●
// //       </span>

// //       {status}
// //     </span>
// //   );
// // }