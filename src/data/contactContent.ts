export const contactImages = {
  hero: "/about/banner.png",
} as const;

export const contactHero = {
  title: "Get In Touch",
  subtitle:
    "Questions, feedback, or collaboration inquiries we're here to help and would love to hear from you.",
} as const;

export type ContactInfoItem = {
  id: string;
  label: string;
  value: string;
  icon: "phone" | "email" | "address" | "hours";
};

export const contactInfoItems: ContactInfoItem[] = [
  {
    id: "phone",
    label: "Contact",
    value: "+91 8778359643",
    icon: "phone",
  },
  {
    id: "email",
    label: "E-mail",
    value: "support@manfa.in",
    icon: "email",
  },
  {
    id: "address",
    label: "Address",
    value: "Chennai, Tamil Nadu, India",
    icon: "address",
  },
  {
    id: "hours",
    label: "Business Hours",
    value: "Mon - Sat: 9AM - 6PM",
    icon: "hours",
  },
];

export const contactFormLabels = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  location: "Location",
  message: "Message",
  submit: "Send Message",
} as const;

export const phoneCountryCode = "+91";
