export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};

export const formatMileage = (mileage: number) => {
  return `${formatNumber(mileage)} mi`;
};

export const formatLocation = (location: string) => {
  return location
    .split(",")
    .map((part) => part.trim())
    .join(", ");
};
