export interface PriceDataItem {
  title: string;
  oldPrice: number;
  price: number;
  planfor: "monthly" | "yearly";
  vatApplicable: boolean;
  priceWithVAT: number;
  businessPrice?: number;
  premiumPrice?: number;
}

export const priceData: PriceDataItem[] = [
  {
    title: "Freelancer package",
    oldPrice: 39,
    price: 39,
    planfor: "monthly",
    vatApplicable: false,
    priceWithVAT: 39, // No VAT for personal pages
  },

  {
    title: "Freelancer package/Year",
    oldPrice: 650,
    price: 390,
    planfor: "yearly",
    vatApplicable: false,
    priceWithVAT: 390, // No VAT for personal pages
  },

  {
    title: "Personnel Search package",
    oldPrice: 99,
    price: 99,
    planfor: "monthly",
    vatApplicable: true,
    priceWithVAT: 99 + 99 * 0.22, // €99 + 22% VAT = €120.78
    businessPrice: 99 + 99 * 0.22, // For businesses
    premiumPrice: 129 + 129 * 0.22, // Premium €129 + 22% VAT = €157.38
  },

  {
    title: "Personnel Search package/Year",
    oldPrice: 1180,
    price: 990,
    planfor: "yearly",
    vatApplicable: true,
    priceWithVAT: 990 + 990 * 0.22, // €990 + 22% VAT = €1,207.80
    businessPrice: 990 + 990 * 0.22, // For businesses
    premiumPrice: 1290 + 1290 * 0.22, // Premium €1290 + 22% VAT = €1,573.80
  },
];

// Helper function to calculate VAT
export const calculateVAT = (price: number, vatRate: number = 0.22): number => {
  return price + price * vatRate;
};

// Helper function to format price display
export const formatPriceDisplay = (
  packageData: PriceDataItem,
  userType: "freelancer" | "business" | "premium" = "freelancer"
): string => {
  if (!packageData.vatApplicable || userType === "freelancer") {
    return `€${packageData.price}`;
  }

  const priceWithVAT = calculateVAT(packageData.price);
  return `€${packageData.price} + VAT (€${priceWithVAT.toFixed(2)} total)`;
};
