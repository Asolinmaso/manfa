export type AccountUser = {
  name: string;
  email: string;
  contact: string;
  defaultAddress: string;
  initials: string;
};

export type SavedAddress = {
  id: string;
  label: string;
  isDefault: boolean;
  fullAddress: string;
};

export const accountUser: AccountUser = {
  name: "Aarti Deshmukh",
  email: "Aarti@gmail.com",
  contact: "+91 9876543210",
  defaultAddress: "12, Rose Garden Lane, Pune - 411045",
  initials: "AD",
};

export const savedAddresses: SavedAddress[] = [
  {
    id: "home-1",
    label: "Home",
    isDefault: true,
    fullAddress:
      "560, 5th cross, 2nd block, Kormangala, Bangalore, Karnataka, India - 560034",
  },
];
