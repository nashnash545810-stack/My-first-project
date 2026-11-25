import { useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  Info,
  Mail,
  Send,
  SlidersHorizontal,
} from 'lucide-react';
import { ContactFormValues, ProfileIdentity } from '../types/portfolio';

interface ContactSectionProps {
  identity: ProfileIdentity;
  onOpenCustomize: () => void;
}

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection({ identity, onOpenCustomize }: ContactSectionProps) {
  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isPreparing, setIsPreparing] = useState(false);
  const [preparedMailtoUrl, setPreparedMailtoUrl] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isPlaceholderEmail =
    !identity.email ||
    identity.email.includes('[') ||
    identity.email.toLowerCase().includes('example.com');

  const targetEmail = isPlaceholderEmail ? 'your.email@example.com' : identity.email;

  const validate = (formValues: ContactFormValues): FieldErrors => {
    const nextErrors: FieldErrors = {};

    if (!formValues.name.trim() || formValues.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!formValues.email.trim() || !EMAIL_REGEX.test(formValues.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!formValues.subject.trim() || formValues.subject.trim().length < 3) {
      nextErrors.subject = 'Please enter a brief subject (at least 3 characters).';
    }
    if (!formValues.message.trim() || formValues.message.trim().length < 10) {
      nextErrors.message = 'Please enter a message of at least 10 characters.';
    }

    return nextErrors;
  };

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (preparedMailtoUrl) {
      setPreparedMailtoUrl(null);
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const buildMailtoHref = (formValues: ContactFormValues) => {
    const body = [
      `Name: ${formValues.name.trim()}`,
      `Reply-To: ${formValues.email.trim()}`,
      '',
      formValues.message.trim(),
    ].join('\n');

    return `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(
      formValues.subject.trim()
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitError('Please fix the highlighted fields before continuing.');
      return;
    }

    setIsPreparing(true);
    const mailtoHref = buildMailtoHref(values);

    // Brief micro-delay so the UI state transition is clear and predictable
    window.setTimeout(() => {
      setIsPreparing(false);
      setPreparedMailtoUrl(mailtoHref);
      window.location.href = mailtoHref;
    }, 180);
  };

  const handleCopyDraft = async () => {
    const formatted = [
      `To: ${targetEmail}`,
      `Subject: ${values.subject.trim()}`,
      `From: ${values.name.trim()} <${values.email.trim()}>`,
      '',
      values.message.trim(),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setSubmitError('Clipboard access was denied by your browser. Please use the email draft link.');
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 max-w-2xl">
          <p className="text-xs font-medium text-blue-400 tracking-wide mb-2">Contact</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-50 mb-2">
            Get in Touch
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Interested in connecting about software engineering projects, internships, or study
            collaborations? Send a message using the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Direct Details & Honest Mailto Disclosure */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-white/[0.08] bg-[#101219] p-5 sm:p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-sm font-semibold text-slate-100">
                    Direct Email
                  </h3>
                  <p className="mt-1 font-mono text-xs sm:text-sm text-slate-300 break-all">
                    {identity.email}
                  </p>
                  {isPlaceholderEmail && (
                    <button
                      type="button"
                      onClick={onOpenCustomize}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Set your real email address</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="border-t border-white/[0.06] pt-4 text-xs text-slate-400 leading-relaxed space-y-2">
                <div className="flex items-start gap-2.5 text-slate-300">
                  <Info className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="font-medium">How form submission works</span>
                </div>
                <p>
                  This static portfolio does not include a backend email server or third-party mail
                  API. Submitting the form validates your message and opens a pre-filled{' '}
                  <code className="font-mono text-slate-200">mailto:</code> draft in your default
                  email client—no message is silently claimed as delivered on a server.
                </p>
                <p>
                  If your browser does not have a desktop mail client configured, you can copy the
                  formatted message directly after validation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <form
              noValidate
              onSubmit={handleSubmit}
              className="rounded-xl border border-white/[0.08] bg-[#101219] p-5 sm:p-8 space-y-5"
            >
              {submitError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-200"
                >
                  <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{submitError}</span>
                </div>
              )}

              {preparedMailtoUrl && (
                <div
                  role="status"
                  className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 space-y-3"
                >
                  <div className="flex items-start gap-2.5 text-xs text-blue-100">
                    <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-slate-100">
                        Email draft prepared (not sent via server)
                      </p>
                      <p className="mt-1 text-slate-300 leading-relaxed">
                        Your message passed validation and opened a{' '}
                        <code className="font-mono text-blue-200">mailto:</code> draft addressed to{' '}
                        <span className="font-mono text-slate-100">{targetEmail}</span>. Finish
                        sending it inside your email client, or copy the draft below.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <a
                      href={preparedMailtoUrl}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Re-open Email Client</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.15] bg-[#090A0F] px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/[0.05] transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                          <span>Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                          <span>Copy Formatted Draft</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={`w-full rounded-lg border bg-[#090A0F] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none ${
                      errors.name
                        ? 'border-rose-500/60 focus:border-rose-400'
                        : 'border-white/[0.1] focus:border-blue-500'
                    }`}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-1.5 text-xs text-rose-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={`w-full rounded-lg border bg-[#090A0F] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none ${
                      errors.email
                        ? 'border-rose-500/60 focus:border-rose-400'
                        : 'border-white/[0.1] focus:border-blue-500'
                    }`}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-1.5 text-xs text-rose-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="Project collaboration, internship, or feedback"
                  value={values.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  className={`w-full rounded-lg border bg-[#090A0F] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none ${
                    errors.subject
                      ? 'border-rose-500/60 focus:border-rose-400'
                      : 'border-white/[0.1] focus:border-blue-500'
                  }`}
                />
                {errors.subject && (
                  <p id="contact-subject-error" className="mt-1.5 text-xs text-rose-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Write your message here..."
                  value={values.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`w-full rounded-lg border bg-[#090A0F] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none ${
                    errors.message
                      ? 'border-rose-500/60 focus:border-rose-400'
                      : 'border-white/[0.1] focus:border-blue-500'
                  }`}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1.5 text-xs text-rose-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 sm:gap-4 pt-1">
                <span className="text-xs text-slate-400">
                  Opens your email client via <code className="font-mono text-slate-300">mailto:</code>
                </span>

                <button
                  type="submit"
                  disabled={isPreparing}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 hover:bg-blue-500 disabled:opacity-60 transition-colors duration-150 min-h-[44px] cursor-pointer"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>{isPreparing ? 'Preparing Draft...' : 'Prepare Email Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
