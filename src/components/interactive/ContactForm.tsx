"use client";

import { useState, type FormEvent } from "react";
import {
  FormField,
  SelectField,
  TextAreaField,
} from "@/components/interactive/FormField";
import { Icon } from "@/components/visual/Icon";

const INQUIRY_TYPES = [
  "Partnership",
  "Government program",
  "Industry / technology solution",
  "Academic collaboration",
  "Media inquiry",
  "Event inquiry",
  "General question",
];

/**
 * Accessible contact form. Uses native HTML5 validation and an explicit
 * success state. Wire `onSubmit` to a backend or form service in production.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Placeholder submit handler — integrate with a form endpoint/service.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="surface flex flex-col items-start gap-4 p-8" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(59,174,72,0.12)] text-ari-green">
          <Icon name="check" size={24} />
        </span>
        <h3 className="text-xl font-bold text-ari-white">Thank you.</h3>
        <p className="text-ari-muted">
          Your message has been received. A member of the ARI team will be in
          touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="surface p-6 sm:p-8"
      noValidate={false}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="contact-name"
          name="name"
          label="Name"
          required
          autoComplete="name"
        />
        <FormField
          id="contact-email"
          name="email"
          type="email"
          label="Email"
          required
          autoComplete="email"
        />
        <FormField
          id="contact-org"
          name="organization"
          label="Organization"
          autoComplete="organization"
        />
        <FormField
          id="contact-role"
          name="role"
          label="Role / Title"
          autoComplete="organization-title"
        />
        <div className="sm:col-span-2">
          <SelectField
            id="contact-inquiry"
            name="inquiry"
            label="Inquiry Type"
            required
            options={INQUIRY_TYPES}
          />
        </div>
        <div className="sm:col-span-2">
          <TextAreaField
            id="contact-message"
            name="message"
            label="Message"
            required
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">
        Send Message
        <Icon name="arrow-right" size={18} />
      </button>
    </form>
  );
}

export default ContactForm;
