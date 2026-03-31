import { useState } from "react";
import config from "@/config/config.json";
const svgPaths = {
  p1ae7f500:
    "M22.8026 17.4008V6.60078C22.8026 5.60478 21.9986 4.80078 21.0026 4.80078H4.19063C3.19463 4.80078 2.39062 5.60478 2.39062 6.60078V17.4008C2.39062 18.3968 3.19463 19.2008 4.19063 19.2008H21.0026C21.9986 19.2008 22.8026 18.3968 22.8026 17.4008ZM21.2306 6.46878C21.6266 6.86478 21.4106 7.27278 21.1946 7.47678L16.3226 11.9408L21.0026 16.8128C21.1466 16.9808 21.2426 17.2448 21.0746 17.4248C20.9186 17.6168 20.5586 17.6048 20.4026 17.4848L15.1586 13.0088L12.5906 15.3488L10.0346 13.0088L4.79063 17.4848C4.63463 17.6048 4.27463 17.6168 4.11863 17.4248C3.95063 17.2448 4.04663 16.9808 4.19063 16.8128L8.87062 11.9408L3.99862 7.47678C3.78262 7.27278 3.56662 6.86478 3.96262 6.46878C4.35863 6.07278 4.76663 6.26478 5.10263 6.55278L12.5906 12.6008L20.0906 6.55278C20.4266 6.26478 20.8346 6.07278 21.2306 6.46878V6.46878Z",
  p2a99b940:
    "M20.4873 17.1402L16.4223 13.4442C16.2301 13.2696 15.9776 13.1764 15.7181 13.1845C15.4585 13.1925 15.2123 13.3011 15.0313 13.4872L12.6383 15.9482C12.0623 15.8382 10.9043 15.4772 9.71228 14.2882C8.52028 13.0952 8.15928 11.9342 8.05228 11.3622L10.5113 8.96824C10.6977 8.78737 10.8064 8.54106 10.8144 8.28145C10.8225 8.02183 10.7292 7.76928 10.5543 7.57724L6.85928 3.51324C6.68432 3.3206 6.44116 3.20374 6.18143 3.1875C5.92171 3.17125 5.66588 3.2569 5.46828 3.42624L3.29828 5.28724C3.12539 5.46075 3.0222 5.69169 3.00828 5.93624C2.99328 6.18624 2.70728 12.1082 7.29928 16.7022C11.3053 20.7072 16.3233 21.0002 17.7053 21.0002C17.9073 21.0002 18.0313 20.9942 18.0643 20.9922C18.3088 20.9786 18.5396 20.8749 18.7123 20.7012L20.5723 18.5302C20.7423 18.3333 20.8286 18.0776 20.8127 17.8179C20.7968 17.5582 20.68 17.315 20.4873 17.1402V17.1402Z",
  p7995000:
    "M12 1.5C9.81276 1.50258 7.71583 2.3726 6.16922 3.91922C4.6226 5.46584 3.75258 7.56276 3.75 9.75C3.74738 11.5374 4.33124 13.2763 5.412 14.7C5.412 14.7 5.637 14.9963 5.67375 15.039L12 22.5L18.3292 15.0353C18.3622 14.9955 18.588 14.7 18.588 14.7L18.5887 14.6978C19.669 13.2747 20.2526 11.5366 20.25 9.75C20.2474 7.56276 19.3774 5.46584 17.8308 3.91922C16.2842 2.3726 14.1872 1.50258 12 1.5V1.5ZM12 12.75C11.4067 12.75 10.8266 12.5741 10.3333 12.2444C9.83994 11.9148 9.45542 11.4462 9.22836 10.8981C9.0013 10.3499 8.94189 9.74667 9.05764 9.16473C9.1734 8.58279 9.45912 8.04824 9.87868 7.62868C10.2982 7.20912 10.8328 6.9234 11.4147 6.80764C11.9967 6.69189 12.5999 6.7513 13.148 6.97836C13.6962 7.20542 14.1648 7.58994 14.4944 8.08329C14.8241 8.57664 15 9.15666 15 9.75C14.999 10.5453 14.6826 11.3078 14.1202 11.8702C13.5578 12.4326 12.7953 12.749 12 12.75V12.75Z",
};

function PhoneIcon() {
  return (
    <div className="relative shrink-0 size-6">
      <svg className="absolute block size-full" fill="none" viewBox="0 0 24 24">
        <path d={svgPaths.p2a99b940} fill="var(--color-text)" />
      </svg>
    </div>
  );
}

function EmailIcon() {
  return (
    <div className="relative shrink-0 size-6">
      <svg className="absolute block size-full" fill="none" viewBox="0 0 24 24">
        <path d={svgPaths.p1ae7f500} fill="var(--color-text)" />
      </svg>
    </div>
  );
}

function LocationIcon() {
  return (
    <div className="relative shrink-0 size-6">
      <svg className="absolute block size-full" fill="none" viewBox="0 0 24 24">
        <path d={svgPaths.p7995000} fill="var(--color-text)" />
      </svg>
    </div>
  );
}

function ContactInfoPanel({ contact_info }: { contact_info: any }) {
  return (
    <div className="relative bg-card rounded-3xl p-10 flex flex-col justify-between overflow-hidden lg:col-span-2">
      {/* Gradient glow effect */}
      <div className="absolute -top-30 left-[20%] -translate-x-1/2 w-94.25 h-95.25 pointer-events-none">
        <svg className="block w-full h-full" fill="none" viewBox="0 0 577 581">
          <g filter="url(#filter0_f_contact)">
            <ellipse
              cx="288.5"
              cy="290.5"
              fill="url(#paint0_linear_contact)"
              fillOpacity="0.12"
              rx="188.5"
              ry="190.5"
            />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="581"
              id="filter0_f_contact"
              width="577"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_contact"
                stdDeviation="50"
              />
            </filter>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_contact"
              x1="100"
              x2="477"
              y1="481"
              y2="481"
            >
              <stop stopColor="var(--color-primary)" />
              <stop offset="1" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Border overlay */}
      <div className="absolute inset-0 rounded-3xl border border-border/6 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col gap-4 relative z-10">
        <h1 className="text-text text-h3 font-semibold">Contact Information</h1>
        <p className="text-gray text-base leading-6 font-normal">
          {contact_info.subtitle}
        </p>
      </div>

      {/* Contact Details */}
      <div className="flex flex-col gap-6 relative z-10 mt-12">
        {/* Phone */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <PhoneIcon />
            <span className="text-text text-lg font-medium">Phone</span>
          </div>
          <p className="text-gray text-base leading-6 font-normal">
            {contact_info.phone}
          </p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <EmailIcon />
            <span className="text-text text-lg font-medium">Email</span>
          </div>
          <p className="text-gray text-base leading-6 font-normal">
            {contact_info.email}
          </p>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <LocationIcon />
            <span className="text-text text-lg font-medium">Address</span>
          </div>
          <p className="text-gray text-base leading-6 font-normal w-58.25">
            {contact_info.address}
          </p>
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

function InputField({
  placeholder,
  type = "text",
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="relative flex-1 min-w-0 rounded-full bg-white/6 backdrop-blur-[22px] border border-border/6 transition-all focus-within:border-border/20 focus-within:bg-white/9">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full bg-transparent px-8 py-4 text-base leading-6 text-text placeholder:text-gray outline-none font-normal border-none rounded-full"
      />
    </div>
  );
}

interface TextAreaFieldProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function TextAreaField({ placeholder, value, onChange }: TextAreaFieldProps) {
  return (
    <div className="relative w-full rounded-3xl bg-light/6 backdrop-blur-[22px] border border-border/6 transition-all focus-within:border-border/20  flex-1 min-h-35">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full h-full  bg-transparent px-8 py-5 text-base leading-6 text-text placeholder:text-gray outline-none resize-none font-normal border-none rounded-3xl"
      />
    </div>
  );
}

function FormPanel() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [submitted, _setSubmitted] = useState(false);

  return (
    <div className="relative bg-card/70 rounded-3xl lg:col-span-3">
      {/* Border overlay */}
      <div className="absolute inset-0 rounded-3xl border border-border/6 pointer-events-none" />

      <form
        // onSubmit={handleSubmit}
        className="flex flex-col gap-10 px-8 py-10 h-full"
        action={config.params.contact_form_action}
        method="POST"
      >
        {/* Input fields */}
        <div className="flex flex-col gap-5 flex-1">
          {/* Row 1: Name + Email */}
          <div className="flex gap-4 items-stretch flex-col sm:flex-row">
            <InputField
              placeholder="Name"
              value={formData.name}
              onChange={(v) => setFormData({ ...formData, name: v })}
            />
            <InputField
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(v) => setFormData({ ...formData, email: v })}
            />
          </div>

          {/* Row 2: Phone + Subject */}
          <div className="flex gap-4 items-stretch flex-col sm:flex-row">
            <InputField
              placeholder="Phone"
              type="tel"
              value={formData.phone}
              onChange={(v) => setFormData({ ...formData, phone: v })}
            />
            <InputField
              placeholder="Subject"
              value={formData.subject}
              onChange={(v) => setFormData({ ...formData, subject: v })}
            />
          </div>

          {/* Message */}
          <TextAreaField
            placeholder="Write your message..."
            value={formData.message}
            onChange={(v) => setFormData({ ...formData, message: v })}
          />
        </div>

        {/* Bottom section */}
        <div className="flex flex-col gap-6">
          {/* reCAPTCHA */}
          <label className="flex gap-2 items-start">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className="shrink-0 mt-0.5 w-6 h-6 rounded-md border border-border/6 bg-card flex items-center justify-center transition-colors hover:border-border/20"
              aria-label="I agree to the terms"
            >
              {agreed && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7L5.5 10.5L12 3.5"
                    stroke="var(--color-text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <p className="text-gray text-base leading-6 font-normal flex-1">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </p>
          </label>

          {/* Send button */}
          <button
            type="submit"
            className="btn btn-primary px-6 py-3.5 text-base leading-6 font-medium disabled:opacity-50 cursor-pointer"
            disabled={!agreed}
          >
            {submitted ? "Message Sent!" : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function ContactForm({ contact_info }: { contact_info: any }) {
  return (
    <div className="grid lg:grid-cols-5 gap-2.5 text-left">
      <ContactInfoPanel contact_info={contact_info} />
      <FormPanel />
    </div>
  );
}
