import type { Customer } from "../types/customer";

export const initialCustomers: Customer[] = [
  {
    id: "cus-1001",
    businessName: "Northstar Technologies",
    type: "Private Company",
    industry: "Technology",
    contactPerson: "Amaka Okafor",
    phone: "+234 803 555 0142",
    email: "amaka@northstar.example",
    status: "Active",
    createdAt: "2026-08-10T09:30:00.000Z",
  },

  {
    id: "cus-1002",
    businessName: "Harbourline Foods",
    type: "Private Company",
    industry: "Retail",
    contactPerson: "Daniel Cole",
    phone: "+234 805 555 0191",
    email: "daniel@harbourline.example",
    status: "Active",
    createdAt: "2026-08-09T12:10:00.000Z",
  },

  {
    id: "cus-1003",
    businessName: "Meridian Health Partners",
    type: "Partnership",
    industry: "Healthcare",
    contactPerson: "Fatima Bello",
    phone: "+234 807 555 0118",
    email: "fatima@meridian.example",
    status: "Pending",
    createdAt: "2026-08-07T15:20:00.000Z",
  },

  {
    id: "cus-1004",
    businessName: "Crestline Advisory",
    type: "Private Company",
    industry: "Professional Services",
    contactPerson: "Ifeanyi Nwosu",
    phone: "+234 809 555 0165",
    email: "ifeanyi@crestline.example",
    status: "Active",
    createdAt: "2026-08-04T08:45:00.000Z",
  },

  {
    id: "cus-1005",
    businessName: "Atlas Manufacturing",
    type: "Public Company",
    industry: "Manufacturing",
    contactPerson: "Grace Mensah",
    phone: "+234 810 555 0177",
    email: "grace@atlas.example",
    status: "Inactive",
    createdAt: "2026-08-02T11:05:00.000Z",
  },

  {
    id: "cus-1006",
    businessName: "Bluepeak Financial",
    type: "Public Company",
    industry: "Financial Services",
    contactPerson: "Tunde Adeyemi",
    phone: "+234 812 555 0124",
    email: "tunde@bluepeak.example",
    status: "Active",
    createdAt: "2026-07-29T10:00:00.000Z",
  },
];