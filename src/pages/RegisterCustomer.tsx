import {
  useState,
} from "react";

import type {
  SubmitEvent,
} from "react";

import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Mail,
  Phone,
  User,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

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

import Completion from "./Completion";

export default function RegisterCustomer() {
  const navigate = useNavigate();

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

  const handleSubmit = async (
    event: SubmitEvent
  ) => {
    event.preventDefault();

    const validationErrors =
      validateCustomer(form);

    setErrors(validationErrors);

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

    //  SUCCESS

  if (success) {
    return (
      <Completion
        onRegisterAnother={() => {
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
      />
    );
  }

    //  MAIN FORM

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#070d1a] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">

      <div className="mx-auto max-w-5xl">

        {/* BACK */}

        <button
          type="button"
          onClick={() =>
            navigate("/customers")
          }
          className="
            mb-7
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-400
            transition
            duration-200
            hover:text-white
          "
        >
          <ArrowLeft size={17} />
          Back to Customers
        </button>

        {/* PAGE HEADER */}

        <div className="mb-8">

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
            Customer Management
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Register Customer
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Add a new business customer to the customer management system.
          </p>

        </div>

        {/* FORM */}

        <div className="
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-[#0d1628]
          shadow-2xl
          shadow-black/20
        ">

          <form
            onSubmit={handleSubmit}
            noValidate
          >

            {/* BUSINESS */}

            <FormSection
              icon={<Building2 size={20} />}
              title="Business information"
              description="Enter the basic information about the customer."
            >

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <Field
                  id="businessName"
                  label="Business name"
                  required
                  error={errors.businessName}
                  className="md:col-span-2"
                >
                  <input
                    id="businessName"
                    type="text"
                    value={form.businessName}
                    onChange={(e) =>
                      handleChange(
                        "businessName",
                        e.target.value
                      )
                    }
                    placeholder="Enter business name"
                    className={inputClass(
                      errors.businessName
                    )}
                  />
                </Field>

                <Field
                  id="type"
                  label="Business type"
                  required
                  error={errors.type}
                >
                  <select
                    id="type"
                    value={form.type}
                    onChange={(e) =>
                      handleChange(
                        "type",
                        e.target.value
                      )
                    }
                    className={inputClass(
                      errors.type
                    )}
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
                </Field>

                <Field
                  id="industry"
                  label="Industry"
                  required
                  error={errors.industry}
                >
                  <select
                    id="industry"
                    value={form.industry}
                    onChange={(e) =>
                      handleChange(
                        "industry",
                        e.target.value
                      )
                    }
                    className={inputClass(
                      errors.industry
                    )}
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
                </Field>

              </div>

            </FormSection>

            {/* CONTACT */}

            <FormSection
              icon={<User size={20} />}
              title="Contact information"
              description="Provide the primary contact details for this customer."
            >

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <Field
                  id="contactPerson"
                  label="Contact person"
                  required
                  error={errors.contactPerson}
                  className="md:col-span-2"
                >
                  <input
                    id="contactPerson"
                    type="text"
                    value={form.contactPerson}
                    onChange={(e) =>
                      handleChange(
                        "contactPerson",
                        e.target.value
                      )
                    }
                    placeholder="Enter contact person's name"
                    className={inputClass(
                      errors.contactPerson
                    )}
                  />
                </Field>

                <Field
                  id="phone"
                  label="Phone"
                  required
                  error={errors.phone}
                >
                  <div className={inputWrapper(
                    errors.phone
                  )}>

                    <Phone
                      size={17}
                      className="ml-3.5 text-slate-500"
                    />

                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        handleChange(
                          "phone",
                          e.target.value
                        )
                      }
                      placeholder="Enter phone number"
                      className="
                        w-full
                        border-0
                        bg-transparent
                        px-3
                        py-2.5
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-slate-600
                      "
                    />

                  </div>
                </Field>

                <Field
                  id="email"
                  label="Email"
                  required
                  error={errors.email}
                >
                  <div className={inputWrapper(
                    errors.email
                  )}>

                    <Mail
                      size={17}
                      className="ml-3.5 text-slate-500"
                    />

                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        handleChange(
                          "email",
                          e.target.value
                        )
                      }
                      placeholder="Enter business email"
                      className="
                        w-full
                        border-0
                        bg-transparent
                        px-3
                        py-2.5
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-slate-600
                      "
                    />
                  </div>
                </Field>

              </div>

            </FormSection>

            {/* STATUS */}
            <FormSection
              icon={<CheckCircle2 size={20} />}
              title="Customer status"
              description="Set the current status of the customer."
            >

              <div className="max-w-md">

                <Field
                  id="status"
                  label="Status"
                  required
                  error={errors.status}
                >

                  <select
                    id="status"
                    value={form.status}
                    onChange={(e) =>
                      handleChange(
                        "status",
                        e.target.value
                      )
                    }
                    className={inputClass(
                      errors.status
                    )}
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

                </Field>

              </div>

            </FormSection>

            {/* ERROR */}

            {submitError && (
              <div className="mx-5 mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 sm:mx-7">

                <p className="text-sm font-semibold text-red-400">
                  We couldn't register this customer.
                </p>

                <p className="mt-1 text-sm text-red-300/80">
                  {submitError}
                </p>

              </div>
            )}

            {/* ACTIONS */}

            <div className="flex flex-col-reverse gap-3 border-t border-white/10 bg-[#0a1221] p-5 sm:flex-row sm:items-center sm:justify-end sm:p-7">

              <button
                type="button"
                disabled={submitting}
                onClick={() =>
                  navigate("/customers")
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-300
                  transition
                  hover:bg-white/10
                  hover:text-white
                  disabled:opacity-50
                  sm:w-auto
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-blue-500
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:w-auto
                "
              >
                {submitting
                  ? "Registering..."
                  : "Register Customer"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </main>
  );
}

  //  FORM SECTION

function FormSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-white/10 p-5 sm:p-7">

      <div className="mb-7 flex items-start gap-4">

        <div className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-blue-500/10
          text-blue-400
          ring-1
          ring-blue-500/10
        ">
          {icon}
        </div>

        <div>

          <h2 className="text-base font-semibold text-white sm:text-lg">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-5 text-slate-500">
            {description}
          </p>

        </div>

      </div>

      {children}

    </section>
  );
}

  //  FIELD

function Field({
  id,
  label,
  required,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>

      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-300"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-400">
            *
          </span>
        )}
      </label>

      {children}

      {error && (
        <p
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-400"
        >
          {error}
        </p>
      )}

    </div>
  );
}

  //  INPUT STYLES

function inputClass(
  error?: string
) {
  return `
    w-full
    rounded-xl
    border
    ${
      error
        ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/10"
        : "border-white/10 focus:border-blue-500 focus:ring-blue-500/10"
    }
    bg-[#111c30]
    px-3.5
    py-2.5
    text-sm
    text-white
    outline-none
    transition
    duration-200
    placeholder:text-slate-600
    focus:ring-4
  `;
}

function inputWrapper(
  error?: string
) {
  return `
    flex
    items-center
    rounded-xl
    border
    ${
      error
        ? "border-red-500/50 focus-within:border-red-400 focus-within:ring-red-500/10"
        : "border-white/10 focus-within:border-blue-500 focus-within:ring-blue-500/10"
    }
    bg-[#111c30]
    transition
    duration-200
    focus-within:ring-4
  `;
}




