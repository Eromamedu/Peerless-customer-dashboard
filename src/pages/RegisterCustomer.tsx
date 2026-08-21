import {
  useState,
} from "react";

import type { SubmitEvent } from "react";

import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { Button } from "../components/ui/Button";

import {
  createCustomer,
} from "../services/customerService";

import {
  validateCustomer,
  type FormErrors,
} from "../utils/validation";

import type {
  CustomerFormValues,
} from "../types/customer";

export default function RegisterCustomer() {
  const [form, setForm] =
    useState<CustomerFormValues>({
      businessName: "",
      type: "",
      industry: "",
      contactPerson: "",
      phone: "",
      email: "",
      status: "",
    });

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [submitting, setSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState(false);

  /*
   * Update a single form field.
   */
  const handleChange = (
    field: keyof CustomerFormValues,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previous) => {
        const next = {
          ...previous,
        };

        delete next[field];

        return next;
      });
    }

    if (submitError) {
      setSubmitError(null);
    }
  };

  /*
   * Submit registration form.
   */
  const handleSubmit = async (
    event: SubmitEvent
  ) => {
    event.preventDefault();

    const validationErrors =
      validateCustomer(form);

    setErrors(validationErrors);

    /*
     * Stop when validation fails.
     */
    if (
      Object.keys(validationErrors).length > 0
    ) {
      const firstInvalidField =
        Object.keys(
          validationErrors
        )[0] as keyof CustomerFormValues;

      requestAnimationFrame(() => {
        const element =
          document.getElementById(
            firstInvalidField
          ) as
            | HTMLInputElement
            | HTMLSelectElement
            | null;

        element?.focus();
      });

      return;
    }

    /*
     * Prevent duplicate submissions.
     */
    if (submitting) {
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      await createCustomer(form);

      setSuccess(true);
    } catch (error) {
      console.error(error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to register customer. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /*
   * ==========================================
   * SUCCESS STATE
   * ==========================================
   */
  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">

            {/* Success icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={40} />
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Customer registered successfully
            </h1>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
              The customer has been successfully
              added to the customer management
              system.
            </p>

            {/* Success actions */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);

                  setForm({
                    businessName: "",
                    type: "",
                    industry: "",
                    contactPerson: "",
                    phone: "",
                    email: "",
                    status: "",
                  });

                  setErrors({});
                  setSubmitError(null);
                }}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-700
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-blue-800
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-600
                  focus:ring-offset-2
                "
              >
                Register Another Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ==========================================
   * MAIN REGISTER PAGE
   * ==========================================
   */
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">

      {/* ======================================
          PAGE HEADER
      ======================================= */}
      <div className="mx-auto max-w-5xl">

        {/* Back button */}
        <button
          type="button"
          onClick={() => {
            window.history.back();
          }}
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            rounded-md
            text-sm
            font-medium
            text-slate-600
            transition
            hover:text-slate-900
            focus:outline-none
            focus:ring-2
            focus:ring-blue-600
            focus:ring-offset-2
          "
        >
          <ArrowLeft size={17} />

          Back to Customers
        </button>

        {/* Header */}
        <div className="mb-8">
          {/* <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            Customer Management
          </p> */}

          {/* <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Register Customer
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Add a new business customer to the
            customer management system.
          </p> */}
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
  Register Customer
</h1>

<p className="mt-1.5 text-sm leading-6 text-slate-500 sm:text-base">
  Add a new business customer to the customer management system.
</p>
        </div>

        {/* ======================================
            FORM CARD
        ======================================= */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <form
            onSubmit={handleSubmit}
            noValidate
          >

            {/* ==================================
                BUSINESS INFORMATION
            =================================== */}
            <section className="border-b border-slate-200 p-5 sm:p-7">

              {/* Section heading */}
              <div className="mb-7 flex items-start gap-4">

                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <Building2 size={20} />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                    Business information
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Enter the basic information
                    about the customer.
                  </p>
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Business name */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="businessName"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Business name
                    <span className="ml-1 text-red-600">
                      *
                    </span>
                  </label>

                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={form.businessName}
                    onChange={(event) =>
                      handleChange(
                        "businessName",
                        event.target.value
                      )
                    }
                    aria-invalid={Boolean(
                      errors.businessName
                    )}
                    aria-describedby={
                      errors.businessName
                        ? "businessName-error"
                        : undefined
                    }
                    autoComplete="organization"
                    placeholder="Enter business name"
                    className={`
                      w-full
                      rounded-lg
                      border
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:ring-2
                      ${
                        errors.businessName
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                      }
                    `}
                  />

                  {errors.businessName && (
                    <p
                      id="businessName-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-600"
                    >
                      {errors.businessName}
                    </p>
                  )}
                </div>

                {/* Business type */}
                <div>
                  <label
                    htmlFor="type"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Business type
                    <span className="ml-1 text-red-600">
                      *
                    </span>
                  </label>

                  <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={(event) =>
                      handleChange(
                        "type",
                        event.target.value
                      )
                    }
                    aria-invalid={Boolean(
                      errors.type
                    )}
                    aria-describedby={
                      errors.type
                        ? "type-error"
                        : undefined
                    }
                    className={`
                      w-full
                      rounded-lg
                      border
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-900
                      outline-none
                      transition
                      focus:ring-2
                      ${
                        errors.type
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                      }
                    `}
                  >
                    <option value="">
                      Select business type
                    </option>

                    <option value="SME">
                      Private Company
                    </option>

                    <option value="Corporate">
                      Corporate
                    </option>

                    <option value="Enterprise">
                      Public Company
                    </option>
                  </select>

                  {errors.type && (
                    <p
                      id="type-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-600"
                    >
                      {errors.type}
                    </p>
                  )}
                </div>

                {/* Industry */}
                <div>
                  <label
                    htmlFor="industry"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Industry
                    <span className="ml-1 text-red-600">
                      *
                    </span>
                  </label>

                  <select
                    id="industry"
                    name="industry"
                    value={form.industry}
                    onChange={(event) =>
                      handleChange(
                        "industry",
                        event.target.value
                      )
                    }
                    aria-invalid={Boolean(
                      errors.industry
                    )}
                    aria-describedby={
                      errors.industry
                        ? "industry-error"
                        : undefined
                    }
                    className={`
                      w-full
                      rounded-lg
                      border
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-900
                      outline-none
                      transition
                      focus:ring-2
                      ${
                        errors.industry
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                      }
                    `}
                  >
                    <option value="">
                      Select industry
                    </option>

                    <option value="Technology">
                      Technology
                    </option>

                    <option value="Retail">
                      Retail
                    </option>

                    <option value="Manufacturing">
                      Manufacturing
                    </option>

                    <option value="Healthcare">
                      Healthcare
                    </option>

                    <option value="Finance">
                      Finance
                    </option>

                    <option value="Education">
                      Education
                    </option>

                    <option value="Agriculture">
                      Agriculture
                    </option>

                    <option value="Construction">
                      Construction
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>

                  {errors.industry && (
                    <p
                      id="industry-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-600"
                    >
                      {errors.industry}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* ==================================
                CONTACT INFORMATION
            =================================== */}
            <section className="border-b border-slate-200 p-5 sm:p-7">

              {/* Section heading */}
              <div className="mb-7 flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <User size={20} />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                    Contact information
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Provide the primary contact
                    details for this customer.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Contact person */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="contactPerson"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Contact person
                    <span className="ml-1 text-red-600">
                      *
                    </span>
                  </label>

                  <input
                    id="contactPerson"
                    name="contactPerson"
                    type="text"
                    value={form.contactPerson}
                    onChange={(event) =>
                      handleChange(
                        "contactPerson",
                        event.target.value
                      )
                    }
                    aria-invalid={Boolean(
                      errors.contactPerson
                    )}
                    aria-describedby={
                      errors.contactPerson
                        ? "contactPerson-error"
                        : undefined
                    }
                    autoComplete="name"
                    placeholder="Enter contact person's name"
                    className={`
                      w-full
                      rounded-lg
                      border
                      bg-white
                      px-3.5
                      py-2.5
                      text-sm
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:ring-2
                      ${
                        errors.contactPerson
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                      }
                    `}
                  />

                  {errors.contactPerson && (
                    <p
                      id="contactPerson-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-600"
                    >
                      {errors.contactPerson}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Phone
                    <span className="ml-1 text-red-600">
                      *
                    </span>
                  </label>

                  <div
                    className={`
                      flex
                      items-center
                      rounded-lg
                      border
                      bg-white
                      transition
                      focus-within:ring-2
                      ${
                        errors.phone
                          ? "border-red-300 focus-within:border-red-500 focus-within:ring-red-100"
                          : "border-slate-300 focus-within:border-blue-600 focus-within:ring-blue-100"
                      }
                    `}
                  >
                    <Phone
                      size={17}
                      aria-hidden="true"
                      className="ml-3.5 shrink-0 text-slate-400"
                    />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(event) =>
                        handleChange(
                          "phone",
                          event.target.value
                        )
                      }
                      aria-invalid={Boolean(
                        errors.phone
                      )}
                      aria-describedby={
                        errors.phone
                          ? "phone-error"
                          : undefined
                      }
                      autoComplete="tel"
                      placeholder="Enter phone number"
                      className="
                        w-full
                        border-0
                        bg-transparent
                        px-3
                        py-2.5
                        text-sm
                        text-slate-900
                        outline-none
                        ring-0
                        placeholder:text-slate-400
                        focus:border-0
                        focus:outline-none
                        focus:ring-0
                      "
                    />
                  </div>

                  {errors.phone && (
                    <p
                      id="phone-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-600"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email
                    <span className="ml-1 text-red-600">
                      *
                    </span>
                  </label>

                  <div
                    className={`
                      flex
                      items-center
                      rounded-lg
                      border
                      bg-white
                      transition
                      focus-within:ring-2
                      ${
                        errors.email
                          ? "border-red-300 focus-within:border-red-500 focus-within:ring-red-100"
                          : "border-slate-300 focus-within:border-blue-600 focus-within:ring-blue-100"
                      }
                    `}
                  >
                    <Mail
                      size={17}
                      aria-hidden="true"
                      className="ml-3.5 shrink-0 text-slate-400"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        handleChange(
                          "email",
                          event.target.value
                        )
                      }
                      aria-invalid={Boolean(
                        errors.email
                      )}
                      aria-describedby={
                        errors.email
                          ? "email-error"
                          : undefined
                      }
                      autoComplete="email"
                      placeholder="Enter business email"
                      className="
                        w-full
                        border-0
                        bg-transparent
                        px-3
                        py-2.5
                        text-sm
                        text-slate-900
                        outline-none
                        ring-0
                        placeholder:text-slate-400
                        focus:border-0
                        focus:outline-none
                        focus:ring-0
                      "
                    />
                  </div>

                  {errors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-600"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* ==================================
                CUSTOMER STATUS
            =================================== */}
            <section className="border-b border-slate-200 p-5 sm:p-7">

              {/* Section heading */}
              <div className="mb-7 flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                    Customer status
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Set the current status of the
                    customer.
                  </p>
                </div>
              </div>

              <div className="max-w-md">

                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Status
                  <span className="ml-1 text-red-600">
                    *
                  </span>
                </label>

                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={(event) =>
                    handleChange(
                      "status",
                      event.target.value
                    )
                  }
                  aria-invalid={Boolean(
                    errors.status
                  )}
                  aria-describedby={
                    errors.status
                      ? "status-error"
                      : undefined
                  }
                  className={`
                    w-full
                    rounded-lg
                    border
                    bg-white
                    px-3.5
                    py-2.5
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    focus:ring-2
                    ${
                      errors.status
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                    }
                  `}
                >
                  <option value="">
                    Select customer status
                  </option>

                  <option value="Active">
                    Active
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>

                {errors.status && (
                  <p
                    id="status-error"
                    role="alert"
                    className="mt-1.5 text-xs font-medium text-red-600"
                  >
                    {errors.status}
                  </p>
                )}
              </div>
            </section>

            {/* ==================================
                API ERROR
            =================================== */}
            {submitError && (
              <div className="mx-5 mt-6 rounded-lg border border-red-200 bg-red-50 p-4 sm:mx-7">

                <p className="text-sm font-semibold text-red-800">
                  We couldn't register this
                  customer.
                </p>

                <p className="mt-1 text-sm leading-5 text-red-700">
                  {submitError}
                </p>
              </div>
            )}

            {/* ==================================
                FORM ACTIONS
            =================================== */}
            <div className="flex flex-col-reverse gap-3 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-end sm:p-7">

              {/* Cancel */}
              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  window.history.back();
                }}
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-300
                  bg-white
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-700
                  shadow-sm
                  transition
                  hover:bg-slate-50
                  hover:text-slate-900
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-600
                  focus:ring-offset-2
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:w-auto
                "
              >
                Cancel
              </button>

              {/* Submit */}
              {/* <Button
                type="submit"
                loading={submitting}
              >
                Register Customer
              </Button> */}

              {/* <Button
  type="submit"
  loading={submitting}
  className="
    inline-flex
    w-full
    items-center
    justify-center
    rounded-lg
    border
    border-blue-700
    bg-blue-700
    px-6
    py-2.5
    text-sm
    font-semibold
    text-white
    shadow-sm
    transition-all
    duration-200
    hover:border-blue-800
    hover:bg-blue-800
    hover:shadow-md
    focus:outline-none
    focus:ring-2
    focus:ring-blue-600
    focus:ring-offset-2
    disabled:cursor-not-allowed
    disabled:border-slate-300
    disabled:bg-slate-300
    disabled:text-slate-500
    sm:w-auto
  "
>
  Register Customer
</Button> */}
<Button
  type="submit"
  loading={submitting}
  className="
    inline-flex
    w-full
    items-center
    justify-center
    rounded-lg
    border
    border-emerald-600
    bg-emerald-600
    px-5
    py-2.5
    text-sm
    font-semibold
    text-white
    shadow-sm
    transition-all
    duration-200
    hover:border-emerald-700
    hover:bg-emerald-700
    hover:shadow-md
    focus:outline-none
    focus:ring-2
    focus:ring-emerald-500
    focus:ring-offset-2
    disabled:cursor-not-allowed
    disabled:opacity-50
    sm:w-auto
  "
>
  Register Customer
</Button>
            </div>

          </form>
        </div>

        {/* Bottom helper text */}
        <p className="mt-5 text-center text-xs text-slate-400">
          Fields marked with{" "}
          <span className="font-semibold text-red-600">
            *
          </span>{" "}
          are required.
        </p>
      </div>
    </div>
  );
}

// // import {
// //   FormEvent,
// //   useState,
// // } from "react";
// import {
//   useRef,
//   useState,
// } from "react";
// import type { SubmitEvent } from "react";
// import {
//   ArrowLeft,
//   Building2,
//   CheckCircle2,
//   Mail,
//   Phone,
//   User,
// } from "lucide-react";

// import { Button } from "../components/ui/Button";

// import {
//   createCustomer,
// } from "../services/customerService";

// import {
//   validateCustomer,
//   type FormErrors,
// } from "../utils/validation";

// import type {
//   CustomerFormValues,
//   CustomerStatus,
//   Industry,
// } from "../types/customer";

// export default function RegisterCustomer() {
//     const firstInvalidFieldRef =
//   useRef<HTMLInputElement | HTMLSelectElement | null>(
//     null
//   );
//   const [form, setForm] =
//     useState<CustomerFormValues>({
//       businessName: "",
//       type: "",
//       industry: "",
//       contactPerson: "",
//       phone: "",
//       email: "",
//       status: "",
//     });

//   const [errors, setErrors] =
//     useState<FormErrors>({});

//   const [submitting, setSubmitting] =
//     useState(false);

//   const [submitError, setSubmitError] =
//     useState<string | null>(null);

//   const [success, setSuccess] =
//     useState(false);

//   /*
//    * Update a single form field.
//    */
//   const handleChange = (
//     field: keyof CustomerFormValues,
//     value: string
//   ) => {
//     setForm((previous) => ({
//       ...previous,
//       [field]: value,
//     }));

//     /*
//      * Remove the error for this field
//      * once the user starts correcting it.
//      */
//     if (errors[field]) {
//       setErrors((previous) => {
//         const next = {
//           ...previous,
//         };

//         delete next[field];

//         return next;
//       });
//     }

//     /*
//      * Clear any previous API error
//      * when the user edits the form.
//      */
//     if (submitError) {
//       setSubmitError(null);
//     }
//   };

//   /*
//    * Submit the registration form.
//    */
//   const handleSubmit = async (
//     event: SubmitEvent
//   ) => {
//     event.preventDefault();

//     /*
//      * Validate before sending
//      * anything to the mock API.
//      */
// const validationErrors =
//   validateCustomer(form);

// setErrors(validationErrors);

// if (
//   Object.keys(validationErrors).length > 0
// ) {
//   const firstInvalidField =
//     Object.keys(validationErrors)[0] as keyof CustomerFormValues;

//   requestAnimationFrame(() => {
//     const element =
//       document.getElementById(
//         firstInvalidField
//       ) as
//         | HTMLInputElement
//         | HTMLSelectElement
//         | null;

//     element?.focus();
//   });

//   return;
// }


//     // const validationErrors =
//     //   validateCustomer(form);

//     // setErrors(validationErrors);

//     // /*
//     //  * Stop if validation failed.
//     //  */
//     // if (
//     //   Object.keys(validationErrors).length > 0
//     // ) {
//     //   return;
//     // }

//     /*
//      * Protect against accidental
//      * repeat submission.
//      */
//     if (submitting) {
//       return;
//     }

//     try {
//       setSubmitting(true);
//       setSubmitError(null);

//       /*
//        * Send the valid form data
//        * to our mock API.
//        */
//       await createCustomer(form);

//       /*
//        * Show the completion state.
//        */
//       setSuccess(true);
//     } catch (error) {
//       console.error(error);

//       setSubmitError(
//         error instanceof Error
//           ? error.message
//           : "Unable to register customer. Please try again."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   /*
//    * Completion state.
//    *
//    * This will be used fully in Part 16,
//    * but keeping it here allows the
//    * registration journey to work.
//    */
//   if (success) {
//     return (
//       <div className="register-page">
//         <div className="registration-success">
//           <div className="success-icon">
//             <CheckCircle2 size={42} />
//           </div>

//           <h1>
//             Customer registered successfully
//           </h1>

//           <p>
//             The customer has been added to
//             the customer management system.
//           </p>

//           <div className="success-actions">
//             <button
//               type="button"
//               className="button button-primary"
//               onClick={() => {
//                 setSuccess(false);

//                 setForm({
//                   businessName: "",
//                   type: "",
//                   industry: "",
//                   contactPerson: "",
//                   phone: "",
//                   email: "",
//                   status: "",
//                 });

//                 setErrors({});
//               }}
//             >
//               Register Another Customer
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="register-page">
//       {/* =========================
//           PAGE HEADER
//       ========================== */}

//       <div className="register-header">
//         <button
//           type="button"
//           className="back-button"
//           onClick={() => {
//             window.history.back();
//           }}
//         >
//           <ArrowLeft size={18} />

//           Back to Customers
//         </button>

//         <div>
//           {/* <p className="dashboard-eyebrow">
//             Customer Management
//           </p> */}

//           <h1 >
//             Register Customer
//           </h1>

//           <p className="dashboard-description">
//             Add a new business customer to the
//             customer management system.
//           </p>
//         </div>
//       </div>

//       {/* =========================
//           FORM
//       ========================== */}

//       <div className="register-card">
//         <form
//           onSubmit={handleSubmit}
//           noValidate
//         >
//           {/* =========================
//               BUSINESS INFORMATION
//           ========================== */}

//           <div className="form-section">
//             <div className="form-section-heading">
//               <div className="form-section-icon">
//                 <Building2 size={20} />
//               </div>

//               <div>
//                 <h2>
//                   Business information
//                 </h2>

//                 <p>
//                   Enter the basic information
//                   about the customer.
//                 </p>
//               </div>
//             </div>

//             {/* BUSINESS NAME */}

//             <div className="form-field">
//               <label htmlFor="businessName">
//                 Business name
//                 <span aria-hidden="true">
//                   *
//                 </span>
//               </label>

//               <input
//                 id="businessName"
//                 name="businessName"
//                 type="text"
//                 value={form.businessName}
//                 onChange={(event) =>
//                   handleChange(
//                     "businessName",
//                     event.target.value
//                   )
//                 }
//                 aria-invalid={
//                   Boolean(
//                     errors.businessName
//                   )
//                 }
//                 aria-describedby={
//                   errors.businessName
//                     ? "businessName-error"
//                     : undefined
//                 }
//                 autoComplete="organization"
//                 placeholder="Enter business name"
//               />

//               {errors.businessName && (
//                 <p
//                   id="businessName-error"
//                   className="field-error"
//                   role="alert"
//                 >
//                   {errors.businessName}
//                 </p>
//               )}
//             </div>

//             {/* BUSINESS TYPE */}

//             <div className="form-field">
//               <label htmlFor="type">
//                 Business type
//                 <span aria-hidden="true">
//                   *
//                 </span>
//               </label>

//               <select
//                 id="type"
//                 name="type"
//                 value={form.type}
//                 onChange={(event) =>
//                   handleChange(
//                     "type",
//                     event.target.value
//                   )
//                 }
//                 aria-invalid={Boolean(errors.type)}
//                 aria-describedby={
//                   errors.type
//                     ? "type-error"
//                     : undefined
//                 }
//               >
//                 <option value="">
//                   Select business type
//                 </option>

//                 <option value="SME">
//                   SME
//                 </option>

//                 <option value="Corporate">
//                   Corporate
//                 </option>

//                 <option value="Enterprise">
//                   Enterprise
//                 </option>
//               </select>

//               {errors.type && (
//                 <p
//                   id="type-error"
//                   className="field-error"
//                   role="alert"
//                 >
//                   {errors.type}
//                 </p>
//               )}
//             </div>

//             {/* INDUSTRY */}

//             <div className="form-field">
//               <label htmlFor="industry">
//                 Industry
//                 <span aria-hidden="true">
//                   *
//                 </span>
//               </label>

//               <select
//                 id="industry"
//                 name="industry"
//                 value={form.industry}
//                 onChange={(event) =>
//                   handleChange(
//                     "industry",
//                     event.target.value
//                   )
//                 }
//                 aria-invalid={Boolean(
//                   errors.industry
//                 )}
//                 aria-describedby={
//                   errors.industry
//                     ? "industry-error"
//                     : undefined
//                 }
//               >
//                 <option value="">
//                   Select industry
//                 </option>

//                 <option value="Technology">
//                   Technology
//                 </option>

//                 <option value="Retail">
//                   Retail
//                 </option>

//                 <option value="Manufacturing">
//                   Manufacturing
//                 </option>

//                 <option value="Healthcare">
//                   Healthcare
//                 </option>

//                 <option value="Finance">
//                   Finance
//                 </option>

//                 <option value="Education">
//                   Education
//                 </option>

//                 <option value="Agriculture">
//                   Agriculture
//                 </option>

//                 <option value="Construction">
//                   Construction
//                 </option>

//                 <option value="Other">
//                   Other
//                 </option>
//               </select>

//               {errors.industry && (
//                 <p
//                   id="industry-error"
//                   className="field-error"
//                   role="alert"
//                 >
//                   {errors.industry}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* =========================
//               CONTACT INFORMATION
//           ========================== */}

//           <div className="form-section">
//             <div className="form-section-heading">
//               <div className="form-section-icon">
//                 <User size={20} />
//               </div>

//               <div>
//                 <h2>
//                   Contact information
//                 </h2>

//                 <p>
//                   Provide the primary contact
//                   details for this customer.
//                 </p>
//               </div>
//             </div>

//             {/* CONTACT PERSON */}

//             <div className="form-field">
//               <label htmlFor="contactPerson">
//                 Contact person
//                 <span aria-hidden="true">
//                   *
//                 </span>
//               </label>

//               <input
//                 id="contactPerson"
//                 name="contactPerson"
//                 type="text"
//                 value={form.contactPerson}
//                 onChange={(event) =>
//                   handleChange(
//                     "contactPerson",
//                     event.target.value
//                   )
//                 }
//                 aria-invalid={Boolean(
//                   errors.contactPerson
//                 )}
//                 aria-describedby={
//                   errors.contactPerson
//                     ? "contactPerson-error"
//                     : undefined
//                 }
//                 autoComplete="name"
//                 placeholder="Enter contact person's name"
//               />

//               {errors.contactPerson && (
//                 <p
//                   id="contactPerson-error"
//                   className="field-error"
//                   role="alert"
//                 >
//                   {errors.contactPerson}
//                 </p>
//               )}
//             </div>

//             {/* PHONE */}

//             <div className="form-field">
//               <label htmlFor="phone">
//                 Phone
//                 <span aria-hidden="true">
//                   *
//                 </span>
//               </label>

//               <div className="input-with-icon">
//                 <Phone
//                   size={17}
//                   aria-hidden="true"
//                 />

//                 <input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   value={form.phone}
//                   onChange={(event) =>
//                     handleChange(
//                       "phone",
//                       event.target.value
//                     )
//                   }
//                   aria-invalid={Boolean(
//                     errors.phone
//                   )}
//                   aria-describedby={
//                     errors.phone
//                       ? "phone-error"
//                       : undefined
//                   }
//                   autoComplete="tel"
//                   placeholder="Enter phone number"
//                 />
//               </div>

//               {errors.phone && (
//                 <p
//                   id="phone-error"
//                   className="field-error"
//                   role="alert"
//                 >
//                   {errors.phone}
//                 </p>
//               )}
//             </div>

//             {/* EMAIL */}

//             <div className="form-field">
//               <label htmlFor="email">
//                 Email
//                 <span aria-hidden="true">
//                   *
//                 </span>
//               </label>

//               <div className="input-with-icon">
//                 <Mail
//                   size={17}
//                   aria-hidden="true"
//                 />

//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={(event) =>
//                     handleChange(
//                       "email",
//                       event.target.value
//                     )
//                   }
//                   aria-invalid={Boolean(
//                     errors.email
//                   )}
//                   aria-describedby={
//                     errors.email
//                       ? "email-error"
//                       : undefined
//                   }
//                   autoComplete="email"
//                   placeholder="Enter business email"
//                 />
//               </div>

//               {errors.email && (
//                 <p
//                   id="email-error"
//                   className="field-error"
//                   role="alert"
//                 >
//                   {errors.email}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* =========================
//               CUSTOMER STATUS
//           ========================== */}

//           <div className="form-section">
//             <div className="form-section-heading">
//               <div className="form-section-icon">
//                 <CheckCircle2 size={20} />
//               </div>

//               <div>
//                 <h2>
//                   Customer status
//                 </h2>

//                 <p>
//                   Set the current status of the
//                   customer.
//                 </p>
//               </div>
//             </div>

//             <div className="form-field">
//               <label htmlFor="status">
//                 Status
//                 <span aria-hidden="true">
//                   *
//                 </span>
//               </label>

//               <select
//                 id="status"
//                 name="status"
//                 value={form.status}
//                 onChange={(event) =>
//                   handleChange(
//                     "status",
//                     event.target.value
//                   )
//                 }
//                 aria-invalid={Boolean(
//                   errors.status
//                 )}
//                 aria-describedby={
//                   errors.status
//                     ? "status-error"
//                     : undefined
//                 }
//               >
//                 <option value="">
//                   Select customer status
//                 </option>

//                 <option value="Active">
//                   Active
//                 </option>

//                 <option value="Pending">
//                   Pending
//                 </option>

//                 <option value="Inactive">
//                   Inactive
//                 </option>
//               </select>

//               {errors.status && (
//                 <p
//                   id="status-error"
//                   className="field-error"
//                   role="alert"
//                 >
//                   {errors.status}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* =========================
//               API ERROR
//           ========================== */}

//           {submitError && (
//             <div
//               className="form-submit-error"
//               role="alert"
//             >
//               <strong>
//                 We couldn't register this
//                 customer.
//               </strong>

//               <p>
//                 {submitError}
//               </p>
//             </div>
//           )}

//           {/* =========================
//               FORM ACTIONS
//           ========================== */}

//           <div className="form-actions">
//             <button
//               type="button"
//               className="button button-secondary"
//               disabled={submitting}
//               onClick={() => {
//                 window.history.back();
//               }}
//             >
//               Cancel
//             </button>

//             <Button
//               type="submit"
//               loading={submitting}
//             >
//               Register Customer
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }