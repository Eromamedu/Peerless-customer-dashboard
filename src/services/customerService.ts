import { initialCustomers } from "../data/customers";

import type {
  Customer,
  CustomerFormValues,
} from "../types/customer";

let customers = [...initialCustomers];

let failureMode = false;

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/*
 * =========================================================
 * LIST CUSTOMERS
 * =========================================================
 */

export async function listCustomers(): Promise<Customer[]> {
  await wait(450);

  if (failureMode) {
    throw new Error("Unable to load customers.");
  }

  return [...customers];
}

/*
 * =========================================================
 * CREATE CUSTOMER
 * =========================================================
 */

export async function createCustomer(
  values: CustomerFormValues
): Promise<Customer> {
  await wait(650);

  if (failureMode) {
    throw new Error(
      "Unable to register customer. Please try again."
    );
  }

  const customer: Customer = {
    id: `cus-${Date.now()}`,

    businessName: values.businessName.trim(),

    type: values.type as Customer["type"],

    industry: values.industry as Customer["industry"],

    contactPerson: values.contactPerson.trim(),

    phone: values.phone.trim(),

    email: values.email.trim().toLowerCase(),

    status: values.status as Customer["status"],

    createdAt: new Date().toISOString(),
  };

  customers = [customer, ...customers];

  return customer;
}

/*
 * =========================================================
 * DELETE CUSTOMER
 * =========================================================
 */

export async function deleteCustomer(
  customerId: string
): Promise<void> {
  await wait(450);

  if (failureMode) {
    throw new Error(
      "Unable to delete customer. Please try again."
    );
  }

  const customerExists = customers.some(
    (customer) => customer.id === customerId
  );

  if (!customerExists) {
    throw new Error(
      "Customer could not be found."
    );
  }

  customers = customers.filter(
    (customer) => customer.id !== customerId
  );
}

/*
 * =========================================================
 * FAILURE MODE
 * =========================================================
 */

export function __setFailureMode(
  value: boolean
) {
  failureMode = value;
}

/*
 * =========================================================
 * RESET CUSTOMERS
 * =========================================================
 */

export function __resetCustomers() {
  customers = [...initialCustomers];

  failureMode = false;
}

// import { initialCustomers } from "../data/customers";
// import type {
//   Customer,
//   CustomerFormValues,
// } from "../types/customer";

// let customers = [...initialCustomers];

// let failureMode = false;

// const wait = (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

// export async function listCustomers(): Promise<Customer[]> {
//   await wait(450);

//   if (failureMode) {
//     throw new Error("Unable to load customers.");
//   }

//   return [...customers];
// }

// export async function createCustomer(
//   values: CustomerFormValues
// ): Promise<Customer> {
//   await wait(650);

//   if (failureMode) {
//     throw new Error(
//       "Unable to register customer. Please try again."
//     );
//   }

//   const customer: Customer = {
//     id: `cus-${Date.now()}`,
//     businessName: values.businessName.trim(),
//     type: values.type as Customer["type"],
//     industry: values.industry as Customer["industry"],
//     contactPerson: values.contactPerson.trim(),
//     phone: values.phone.trim(),
//     email: values.email.trim().toLowerCase(),
//     status: values.status as Customer["status"],
//     createdAt: new Date().toISOString(),
//   };

//   customers = [customer, ...customers];

//   return customer;
// }

// export function __setFailureMode(value: boolean) {
//   failureMode = value;
// }

// export function __resetCustomers() {
//   customers = [...initialCustomers];
//   failureMode = false;
// }