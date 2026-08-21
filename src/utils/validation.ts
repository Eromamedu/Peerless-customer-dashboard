import type { CustomerFormValues } from "../types/customer";

export type FormErrors =
  Partial<Record<keyof CustomerFormValues, string>>;

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phonePattern =
  /^[+0-9][0-9\s()-]{7,}$/;

export function validateCustomer(
  values: CustomerFormValues
): FormErrors {
  const errors: FormErrors = {};

  // Business name
  if (!values.businessName.trim()) {
    errors.businessName =
      "Business name is required.";
  } else if (
    values.businessName.trim().length < 2
  ) {
    errors.businessName =
      "Business name must be at least 2 characters.";
  }

  // Business type
  if (!values.type) {
    errors.type =
      "Select a business type.";
  }

  // Industry
  if (!values.industry) {
    errors.industry =
      "Select an industry.";
  }

  // Contact person
  if (!values.contactPerson.trim()) {
    errors.contactPerson =
      "Contact person is required.";
  }

  // Phone
  if (!values.phone.trim()) {
    errors.phone =
      "Phone number is required.";
  } else if (
    !phonePattern.test(values.phone.trim())
  ) {
    errors.phone =
      "Enter a valid phone number.";
  }

  // Email
  if (!values.email.trim()) {
    errors.email =
      "Email is required.";
  } else if (
    !emailPattern.test(values.email.trim())
  ) {
    errors.email =
      "Enter a valid email address.";
  }

  // Status
  if (!values.status) {
    errors.status =
      "Select a customer status.";
  }

  return errors;
}



// import type { CustomerFormValues } from "../types/customer";

// export type FormErrors =
//   Partial<Record<keyof CustomerFormValues, string>>;

// const emailPattern =
//   /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const phonePattern =
//   /^[+0-9][0-9\s()-]{7,}$/;

// export function validateCustomer(
//   values: CustomerFormValues
// ): FormErrors {
//   const errors: FormErrors = {};

//   if (!values.businessName.trim()) {
//     errors.businessName =
//       "Business name is required.";
//   } else if (values.businessName.trim().length < 2) {
//     errors.businessName =
//       "Business name must be at least 2 characters.";
//   }

//   if (!values.type) {
//     errors.type = "Select a business type.";
//   }

//   if (!values.industry) {
//     errors.industry = "Select an industry.";
//   }

//   if (!values.contactPerson.trim()) {
//     errors.contactPerson =
//       "Contact person is required.";
//   }

//   if (!values.phone.trim()) {
//     errors.phone =
//       "Phone number is required.";
//   } else if (!phonePattern.test(values.phone.trim())) {
//     errors.phone =
//       "Enter a valid phone number.";
//   }

//   if (!values.email.trim()) {
//     errors.email =
//       "Email is required.";
//   } else if (!emailPattern.test(values.email.trim())) {
//     errors.email =
//       "Enter a valid email address.";
//   }

//   if (!values.status) {
//     errors.status =
//       "Select a customer status.";
//   }

//   return errors;
// }