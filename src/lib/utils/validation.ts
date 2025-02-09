export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone: string) => {
  return /^\+?[1-9]\d{1,14}$/.test(phone);
};

export const isValidPrice = (price: number) => {
  return price > 0 && price < 1000000000;
};

export const isValidYear = (year: number) => {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 1;
};

export const isValidMileage = (mileage: number) => {
  return mileage >= 0 && mileage < 1000000;
};

export const isValidVIN = (vin: string) => {
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
};
