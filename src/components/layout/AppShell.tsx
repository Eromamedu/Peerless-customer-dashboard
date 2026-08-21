import {
  LayoutDashboard,
  UserPlus,
} from "lucide-react";

import type { ReactNode } from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  const location = useLocation();

  const isDashboard =
    location.pathname === "/customers";

  const isRegister =
    location.pathname === "/customers/register";

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      {/* =====================================================
          TOP HEADER
      ====================================================== */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
        <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* BRAND */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0B1F3A] text-lg font-bold text-white shadow-sm"
              aria-hidden="true"
            >
              P
            </div>

            {/* Brand text */}
            <div className="leading-tight">
              <p className="text-base font-bold tracking-tight text-[#0B1F3A]">
                Peerless
              </p>

              <p className="hidden text-xs font-medium text-slate-500 sm:block">
                Customer Management
              </p>
            </div>
          </div>

          {/* =================================================
              MOBILE NAVIGATION
          ================================================== */}
          <nav
            className="flex items-center gap-1 sm:hidden"
            aria-label="Mobile navigation"
          >
            <Link
              to="/customers"
              className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition ${
                isDashboard
                  ? "bg-[#0B1F3A] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1F3A]"
              }`}
            >
              <LayoutDashboard
                size={16}
                aria-hidden="true"
              />

              <span>Dashboard</span>
            </Link>

            <Link
              to="/customers/register"
              className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition ${
                isRegister
                  ? "bg-[#0B1F3A] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1F3A]"
              }`}
            >
              <UserPlus
                size={16}
                aria-hidden="true"
              />

              <span>Register</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* =====================================================
          MAIN APPLICATION LAYOUT
      ====================================================== */}
      <div className="flex min-h-[calc(100vh-4rem)] w-full">
        
        {/* ===================================================
            DESKTOP SIDEBAR
        ==================================================== */}
        <aside
          className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-200 bg-white lg:block"
          aria-label="Main navigation"
        >
          <div className="flex h-full flex-col">
            
            {/* Sidebar navigation */}
            <nav className="flex-1 px-4 py-6">
              
              {/* Section label */}
              <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Workspace
              </p>

              {/* Dashboard */}
              <Link
                to="/customers"
                className={`group mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isDashboard
                    ? "bg-blue-50 text-[#0B1F3A]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#0B1F3A]"
                }`}
              >
                <LayoutDashboard
                  size={18}
                  className={
                    isDashboard
                      ? "text-blue-700"
                      : "text-slate-400 group-hover:text-[#0B1F3A]"
                  }
                  aria-hidden="true"
                />

                <span>Customers</span>

                {/* Active indicator */}
                {isDashboard && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                )}
              </Link>

              {/* Register Customer */}
              <Link
                to="/customers/register"
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isRegister
                    ? "bg-blue-50 text-[#0B1F3A]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#0B1F3A]"
                }`}
              >
                <UserPlus
                  size={18}
                  className={
                    isRegister
                      ? "text-blue-700"
                      : "text-slate-400 group-hover:text-[#0B1F3A]"
                  }
                  aria-hidden="true"
                />

                <span>Register customer</span>

                {/* Active indicator */}
                {isRegister && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                )}
              </Link>
            </nav>

            {/* Sidebar footer */}
            <div className="border-t border-slate-100 p-4">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-700">
                  Customer Management
                </p>

                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                  Internal workspace for managing business customers.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* ===================================================
            MAIN CONTENT
        ==================================================== */}
        <main className="min-w-0 flex-1 bg-slate-50">
          <div className="min-h-[calc(100vh-4rem)] w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}



// import {
//   LayoutDashboard,
//   UserPlus,
// } from "lucide-react";

// import type { ReactNode } from "react";

// import {
//   Link,
//   useLocation,
// } from "react-router-dom";

// interface AppShellProps {
//   children: ReactNode;
// }

// export default function AppShell({
//   children,
// }: AppShellProps) {
//   const location = useLocation();

//   const isDashboard =
//     location.pathname === "/customers";

//   const isRegister =
//     location.pathname === "/customers/register";

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900">

//       {/* =========================================
//           TOP HEADER
//       ========================================== */}
//       <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0f172a] shadow-sm">

//         <div className="flex min-h-[68px] items-center justify-between px-4 sm:px-6 lg:px-8">

//           {/* =====================================
//               BRAND
//           ====================================== */}
//           <div className="flex items-center gap-3">

//             {/* Peerless logo */}
//             <div
//               aria-hidden="true"
//               className="
//                 flex
//                 h-10
//                 w-10
//                 shrink-0
//                 items-center
//                 justify-center
//                 rounded-lg
//                 bg-blue-600
//                 text-lg
//                 font-bold
//                 text-white
//                 shadow-sm
//               "
//             >
//               P
//             </div>

//             {/* Brand text */}
//             <div className="leading-tight">

//               <p className="text-sm font-bold tracking-wide text-white sm:text-base">
//                 Peerless
//               </p>

//               <p className="mt-0.5 text-[11px] font-medium text-slate-400 sm:text-xs">
//                 Customer Management
//               </p>

//             </div>
//           </div>

//           {/* =====================================
//               MOBILE NAVIGATION
//           ====================================== */}
//           <nav
//             aria-label="Mobile navigation"
//             className="flex items-center gap-1 md:hidden"
//           >

//             {/* Dashboard */}
//             <Link
//               to="/customers"
//               className={`
//                 inline-flex
//                 items-center
//                 gap-1.5
//                 rounded-md
//                 px-2.5
//                 py-2
//                 text-xs
//                 font-medium
//                 transition
//                 sm:px-3
//                 sm:text-sm
//                 ${
//                   isDashboard
//                     ? "bg-white/10 text-white"
//                     : "text-slate-400 hover:bg-white/5 hover:text-white"
//                 }
//               `}
//             >
//               <LayoutDashboard
//                 size={16}
//                 aria-hidden="true"
//               />

//               <span className="hidden sm:inline">
//                 Dashboard
//               </span>
//             </Link>

//             {/* Register */}
//             <Link
//               to="/customers/register"
//               className={`
//                 inline-flex
//                 items-center
//                 gap-1.5
//                 rounded-md
//                 px-2.5
//                 py-2
//                 text-xs
//                 font-medium
//                 transition
//                 sm:px-3
//                 sm:text-sm
//                 ${
//                   isRegister
//                     ? "bg-white/10 text-white"
//                     : "text-slate-400 hover:bg-white/5 hover:text-white"
//                 }
//               `}
//             >
//               <UserPlus
//                 size={16}
//                 aria-hidden="true"
//               />

//               <span className="hidden sm:inline">
//                 Register
//               </span>
//             </Link>

//           </nav>
//         </div>
//       </header>

//       {/* =========================================
//           DESKTOP / TABLET LAYOUT
//       ========================================== */}
//       <div className="flex min-h-[calc(100vh-68px)]">

//         {/* =======================================
//             SIDEBAR
//         ======================================== */}
//         <aside
//           aria-label="Main navigation"
//           className="
//             hidden
//             w-60
//             shrink-0
//             border-r
//             border-slate-200
//             bg-white
//             md:block
//           "
//         >

//           <div className="sticky top-[68px] flex h-[calc(100vh-68px)] flex-col">

//             {/* Sidebar navigation */}
//             <nav className="flex-1 px-3 py-6">

//               {/* Section label */}
//               <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.12em] text-slate-400">
//                 WORKSPACE
//               </p>

//               {/* =================================
//                   CUSTOMERS
//               ================================== */}
//               <Link
//                 to="/customers"
//                 className={`
//                   group
//                   mb-1
//                   flex
//                   items-center
//                   gap-3
//                   rounded-lg
//                   px-3
//                   py-2.5
//                   text-sm
//                   font-medium
//                   transition
//                   ${
//                     isDashboard
//                       ? "bg-blue-50 text-blue-700"
//                       : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                   }
//                 `}
//               >

//                 <LayoutDashboard
//                   size={18}
//                   aria-hidden="true"
//                   className={
//                     isDashboard
//                       ? "text-blue-700"
//                       : "text-slate-400 group-hover:text-slate-600"
//                   }
//                 />

//                 <span>
//                   Customers
//                 </span>

//               </Link>

//               {/* =================================
//                   REGISTER CUSTOMER
//               ================================== */}
//               <Link
//                 to="/customers/register"
//                 className={`
//                   group
//                   flex
//                   items-center
//                   gap-3
//                   rounded-lg
//                   px-3
//                   py-2.5
//                   text-sm
//                   font-medium
//                   transition
//                   ${
//                     isRegister
//                       ? "bg-blue-50 text-blue-700"
//                       : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                   }
//                 `}
//               >

//                 <UserPlus
//                   size={18}
//                   aria-hidden="true"
//                   className={
//                     isRegister
//                       ? "text-blue-700"
//                       : "text-slate-400 group-hover:text-slate-600"
//                   }
//                 />

//                 <span>
//                   Register customer
//                 </span>

//               </Link>

//             </nav>

//             {/* =================================
//                 SIDEBAR FOOTER
//             ================================== */}
//             <div className="border-t border-slate-200 p-4">

//               <div className="rounded-lg bg-slate-50 p-3">

//                 <p className="text-xs font-semibold text-slate-700">
//                   Customer Management
//                 </p>

//                 <p className="mt-1 text-[11px] leading-4 text-slate-400">
//                   Internal relationship
//                   management workspace.
//                 </p>

//               </div>

//             </div>

//           </div>
//         </aside>

//         {/* =======================================
//             MAIN CONTENT
//         ======================================== */}
//         <main className="min-w-0 flex-1">

//           <div className="w-full">
//             {children}
//           </div>

//         </main>

//       </div>
//     </div>
//   );
// }



// import {
//   LayoutDashboard,
//   UserPlus,
// } from "lucide-react";

// import type { ReactNode } from "react";
// import {
//   Link,
//   useLocation,
// } from "react-router-dom";

// interface AppShellProps {
//   children: ReactNode;
// }

// export default function AppShell({
//   children,
// }: AppShellProps) {
//   const location = useLocation();

//   const isDashboard =
//     location.pathname === "/customers";

//   const isRegister =
//     location.pathname === "/customers/register";

//   return (
//     <div className="app-shell">
//       {/* Top navigation */}
//       <header className="app-header">
//         <div className="app-header-inner">
//           <div className="app-brand">
//             <div
//               className="app-brand-mark"
//               aria-hidden="true"
//             >
//               P
//             </div>

//             <div>
//               <p className="app-brand-name">
//                 Peerless
//               </p>

//               <p className="app-brand-subtitle">
//                 Customer Management
//               </p>
//             </div>
//           </div>

//           {/* Mobile navigation */}
//           <nav
//             className="mobile-navigation"
//             aria-label="Mobile navigation"
//           >
//             <Link
//               to="/customers"
//               className={
//                 isDashboard
//                   ? "mobile-nav-link mobile-nav-link-active"
//                   : "mobile-nav-link"
//               }
//             >
//               <LayoutDashboard
//                 size={17}
//                 aria-hidden="true"
//               />

//               Dashboard
//             </Link>

//             <Link
//               to="/customers/register"
//               className={
//                 isRegister
//                   ? "mobile-nav-link mobile-nav-link-active"
//                   : "mobile-nav-link"
//               }
//             >
//               <UserPlus
//                 size={17}
//                 aria-hidden="true"
//               />

//               Register
//             </Link>
//           </nav>
//         </div>
//       </header>

//       {/* Desktop / tablet layout */}
//       <div className="app-layout">
//         {/* Sidebar */}
//         <aside
//           className="app-sidebar"
//           aria-label="Main navigation"
//         >
//           <nav className="sidebar-nav">
//             <p className="sidebar-label">
//               WORKSPACE
//             </p>

//             <Link
//               to="/customers"
//               className={
//                 isDashboard
//                   ? "sidebar-link sidebar-link-active"
//                   : "sidebar-link"
//               }
//             >
//               <LayoutDashboard
//                 size={18}
//                 aria-hidden="true"
//               />

//               <span>
//                 Customers
//               </span>
//             </Link>

//             <Link
//               to="/customers/register"
//               className={
//                 isRegister
//                   ? "sidebar-link sidebar-link-active"
//                   : "sidebar-link"
//               }
//             >
//               <UserPlus
//                 size={18}
//                 aria-hidden="true"
//               />

//               <span>
//                 Register customer
//               </span>
//             </Link>
//           </nav>
//         </aside>

//         {/* Main content */}
//         <main className="app-main">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


// // import {
// //   LayoutDashboard,
// //   UserPlus,
// //   Menu,
// // } from "lucide-react";

// // import type { ReactNode } from "react";
// // import { Link, useLocation } from "react-router-dom";

// // interface AppShellProps {
// //   children: ReactNode;
// // }

// // export default function AppShell({
// //   children,
// // }: AppShellProps) {
// //   const location = useLocation();

// //   const isDashboard =
// //     location.pathname === "/customers";

// //   const isRegister =
// //     location.pathname ===
// //     "/customers/register";

// //   return (
// //     <div className="app-shell">
// //       <header className="app-header">
// //         <div className="app-header-inner">
// //           <div className="app-brand">
// //             <div
// //               className="app-brand-mark"
// //               aria-hidden="true"
// //             >
// //               P
// //             </div>

// //             <div>
// //               <p className="app-brand-name">
// //                 Peerless
// //               </p>

// //               <p className="app-brand-subtitle">
// //                 Customer Management
// //               </p>
// //             </div>
// //           </div>

// //           <button
// //             type="button"
// //             className="mobile-menu-button"
// //             aria-label="Open navigation menu"
// //           >
// //             <Menu size={20} />
// //           </button>
// //         </div>
// //       </header>

// //       <div className="app-layout">
// //         <aside
// //           className="app-sidebar"
// //           aria-label="Main navigation"
// //         >
// //           <nav className="sidebar-nav">
// //             <p className="sidebar-label">
// //               WORKSPACE
// //             </p>

// //             <Link
// //               to="/customers"
// //               className={`sidebar-link ${
// //                 isDashboard
// //                   ? "sidebar-link-active"
// //                   : ""
// //               }`}
// //             >
// //               <LayoutDashboard
// //                 size={18}
// //                 aria-hidden="true"
// //               />

// //               <span>
// //                 Customers
// //               </span>
// //             </Link>

// //             <Link
// //               to="/customers/register"
// //               className={`sidebar-link ${
// //                 isRegister
// //                   ? "sidebar-link-active"
// //                   : ""
// //               }`}
// //             >
// //               <UserPlus
// //                 size={18}
// //                 aria-hidden="true"
// //               />

// //               <span>
// //                 Register customer
// //               </span>
// //             </Link>
// //           </nav>
// //         </aside>

// //         <main className="app-main">
// //           {children}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }
// // // import type { ReactNode } from "react";

// // // interface AppShellProps {
// // //   children: ReactNode;
// // // }

// // // export default function AppShell({
// // //   children,
// // // }: AppShellProps) {
// // //   return (
// // //     <div className="app-shell">
// // //       <header className="app-header">
// // //         <div className="app-header-inner">
// // //           <div className="app-brand">
// // //             <div
// // //               className="app-brand-mark"
// // //               aria-hidden="true"
// // //             >
// // //               P
// // //             </div>

// // //             <div>
// // //               <p className="app-brand-name">
// // //                 Peerless
// // //               </p>

// // //               <p className="app-brand-subtitle">
// // //                 Customer Management
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <main className="app-main">
// // //         {children}
// // //       </main>
// // //     </div>
// // //   );
// // // }