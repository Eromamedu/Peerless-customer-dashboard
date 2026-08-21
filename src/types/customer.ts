export const CUSTOMER_STATUSES = [
  "Active",
  "Pending",
  "Inactive",
] as const;

export type CustomerStatus =
  (typeof CUSTOMER_STATUSES)[number];


export const CUSTOMER_TYPES = [
  "Private Company",
  "Public Company",
  "Partnership",
  "Sole Proprietorship",
] as const;

export type CustomerType =
  (typeof CUSTOMER_TYPES)[number];


export const INDUSTRIES = [
  "Technology",
  "Financial Services",
  "Healthcare",
  "Retail",
  "Manufacturing",
  "Professional Services",
  "Other",
] as const;

export type Industry =
  (typeof INDUSTRIES)[number];


export interface Customer {
  id: string;

  businessName: string;

  type: CustomerType;

  industry: Industry;

  contactPerson: string;

  phone: string;

  email: string;

  status: CustomerStatus;

  createdAt: string;
}


export interface CustomerFormValues {
  businessName: string;

  type: CustomerType | "";

  industry: Industry | "";

  contactPerson: string;

  phone: string;

  email: string;

  status: CustomerStatus | "";
}