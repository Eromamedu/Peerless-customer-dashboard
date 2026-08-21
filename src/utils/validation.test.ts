import {
  describe,
  expect,
  it,
} from "vitest";

import {
  validateCustomer,
} from "./validation";

import type {
  CustomerFormValues,
} from "../types/customer";

const validCustomer: CustomerFormValues = {
  businessName:
    "Northstar Technologies",
  type: "Private Company",
  industry: "Technology",
  contactPerson: "John Doe",
  phone: "+2348012345678",
  email: "john@northstar.com",
  status: "Active",
};

describe("validateCustomer", () => {
  describe("valid customer data", () => {
    it("returns no errors for a valid customer", () => {
      const errors =
        validateCustomer(validCustomer);

      expect(errors).toEqual({});
    });

    it("accepts a valid Nigerian phone number", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          phone: "+234 801 234 5678",
        });

      expect(errors.phone).toBeUndefined();
    });

    it("accepts a valid email address", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          email: "contact@company.com",
        });

      expect(errors.email).toBeUndefined();
    });
  });

  describe("business name validation", () => {
    it("requires a business name", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          businessName: "",
        });

      expect(errors.businessName).toBe(
        "Business name is required."
      );
    });

    it("rejects a business name shorter than two characters", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          businessName: "A",
        });

      expect(errors.businessName).toBe(
        "Business name must be at least 2 characters."
      );
    });

    it("rejects a business name containing only spaces", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          businessName: "   ",
        });

      expect(errors.businessName).toBe(
        "Business name is required."
      );
    });
  });

  describe("business type validation", () => {
    it("requires a business type", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          type: "",
        });

      expect(errors.type).toBe(
        "Select a business type."
      );
    });
  });

  describe("industry validation", () => {
    it("requires an industry", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          industry: "",
        });

      expect(errors.industry).toBe(
        "Select an industry."
      );
    });
  });

  describe("contact person validation", () => {
    it("requires a contact person", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          contactPerson: "",
        });

      expect(errors.contactPerson).toBe(
        "Contact person is required."
      );
    });

    it("rejects a contact person containing only spaces", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          contactPerson: "   ",
        });

      expect(errors.contactPerson).toBe(
        "Contact person is required."
      );
    });
  });

  describe("phone validation", () => {
    it("requires a phone number", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          phone: "",
        });

      expect(errors.phone).toBe(
        "Phone number is required."
      );
    });

    it("rejects an invalid phone number", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          phone: "invalid-phone",
        });

      expect(errors.phone).toBe(
        "Enter a valid phone number."
      );
    });

    it("rejects a phone number that is too short", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          phone: "123",
        });

      expect(errors.phone).toBe(
        "Enter a valid phone number."
      );
    });

    it("accepts phone numbers containing spaces and brackets", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          phone: "+234 (801) 234-5678",
        });

      expect(errors.phone).toBeUndefined();
    });
  });

  describe("email validation", () => {
    it("requires an email address", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          email: "",
        });

      expect(errors.email).toBe(
        "Email is required."
      );
    });

    it("rejects an invalid email address", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          email: "not-an-email",
        });

      expect(errors.email).toBe(
        "Enter a valid email address."
      );
    });

    it("rejects an email without a domain", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          email: "john@",
        });

      expect(errors.email).toBe(
        "Enter a valid email address."
      );
    });

    it("accepts a standard email address", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          email: "john@northstar.com",
        });

      expect(errors.email).toBeUndefined();
    });
  });

  describe("status validation", () => {
    it("requires a customer status", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          status: "",
        });

      expect(errors.status).toBe(
        "Select a customer status."
      );
    });
  });

  describe("multiple validation errors", () => {
    it("returns errors for every required field in an empty form", () => {
      const emptyForm: CustomerFormValues = {
        businessName: "",
        type: "",
        industry: "",
        contactPerson: "",
        phone: "",
        email: "",
        status: "",
      };

      const errors =
        validateCustomer(emptyForm);

      expect(
        Object.keys(errors)
      ).toHaveLength(7);

      expect(errors).toEqual({
        businessName:
          "Business name is required.",
        type:
          "Select a business type.",
        industry:
          "Select an industry.",
        contactPerson:
          "Contact person is required.",
        phone:
          "Phone number is required.",
        email:
          "Email is required.",
        status:
          "Select a customer status.",
      });
    });

    it("returns only the errors for invalid fields", () => {
      const errors =
        validateCustomer({
          ...validCustomer,
          email: "invalid",
          phone: "123",
        });

      expect(errors).toEqual({
        phone:
          "Enter a valid phone number.",
        email:
          "Enter a valid email address.",
      });
    });
  });
});



// import { describe, expect, it } from "vitest";

// import {
//   validateCustomer,
// } from "./validation";

// import type {
//   CustomerFormValues,
// } from "../types/customer";

// const valid: CustomerFormValues = {
//   businessName: "Northstar Technologies",
// //   type: "Corporate",
// type: "Private Company",
//   industry: "Technology",
//   contactPerson: "John Doe",
//   phone: "+2348012345678",
//   email: "john@northstar.com",
//   status: "Active",
// };

// describe("validateCustomer", () => {
//   it("returns errors for an empty form", () => {
//     const emptyForm: CustomerFormValues = {
//       businessName: "",
//       type: "",
//       industry: "",
//       contactPerson: "",
//       phone: "",
//       email: "",
//       status: "",
//     };

//     const errors =
//       validateCustomer(emptyForm);

//     expect(
//       Object.keys(errors)
//     ).toHaveLength(7);
//   });

//   it("returns no errors for a valid form", () => {
//     const errors =
//       validateCustomer(valid);

//     expect(errors).toEqual({});
//   });

//   it("rejects an invalid email address", () => {
//     const errors =
//       validateCustomer({
//         ...valid,
//         email: "not-an-email",
//       });

//     expect(errors.email).toBe(
//       "Enter a valid email address."
//     );
//   });
// });