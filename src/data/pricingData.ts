// src/data/pricingData.ts
export interface PricingPlan {
  id: string;
  title: string;
  basePrice: number;
  vatIncluded: boolean;
  vatRate: number;
  monthlyPrice: number;
  yearlyPrice: number;
  monthlyPriceWithVat?: number;
  yearlyPriceWithVat?: number;
  planfor: string;
  targetAudience: string;
  features: string[];
  packageType: "flat-rate" | "business" | "premium";
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "flat-rate",
    title: "Flat Rate Package",
    basePrice: 39,
    vatIncluded: true,
    vatRate: 22,
    monthlyPrice: 39,
    yearlyPrice: 390,
    planfor: "month",
    targetAudience: "Freelancers (Forfettari)",
    packageType: "flat-rate",
    features: [
      "Simplified Invoice Creation",
      "Invoice Overview Dashboard",
      "Upload PDF Bank Statements",
      "Direct Support with Accountant",
      "Financial Plan Access",
      "AI Chat Assistant",
      "Aptitude Tests",
    ],
  },
  {
    id: "business",
    title: "Business Package",
    basePrice: 99,
    vatIncluded: false,
    vatRate: 22,
    monthlyPrice: 99,
    yearlyPrice: 990,
    monthlyPriceWithVat: 120.78,
    yearlyPriceWithVat: 1207.8,
    planfor: "month",
    targetAudience: "Companies",
    packageType: "business",
    features: [
      "Personnel Recruitment System",
      "Job Profile Management",
      "Candidate Search & Matching",
      "HR Ticket Management",
      "Financial Plan Access",
      "AI Chat Assistant",
      "Aptitude Tests",
      "All Business Package Features",
    ],
  },
  {
    id: "premium",
    title: "Premium Business Package",
    basePrice: 129,
    vatIncluded: false,
    vatRate: 22,
    monthlyPrice: 129,
    yearlyPrice: 1290,
    monthlyPriceWithVat: 157.38,
    yearlyPriceWithVat: 1573.8,
    planfor: "month",
    targetAudience: "Enterprise Companies",
    packageType: "premium",
    features: [
      "All Business Package Features",
      "Premium Personnel Services",
      "Priority Support",
      "Advanced Analytics",
    ],
  },
];

export const priceData = [
  {
    title: "Flat Rate Package",
    oldPrice: 69,
    price: 39,
    planfor: "month",
    packageType: "flat-rate",
    vatIncluded: true,
    features: ["Invoice Creation", "Bank Statements", "Direct Support"],
  },
  {
    title: "Business Package",
    oldPrice: 119,
    price: 120.78,
    planfor: "month",
    packageType: "business",
    vatIncluded: false,
    features: ["Personnel Recruitment", "All Financial Features", "AI Chat"],
  },
  {
    title: "Flat Rate Package/Year",
    oldPrice: 690,
    price: 390,
    planfor: "yearly",
    packageType: "flat-rate",
    vatIncluded: true,
    features: ["Invoice Creation", "Bank Statements", "Direct Support"],
  },
  {
    title: "Business Package/Year",
    oldPrice: 1327.8,
    price: 1207.8,
    planfor: "yearly",
    packageType: "business",
    vatIncluded: false,
    features: ["Personnel Recruitment", "All Financial Features", "AI Chat"],
  },
  {
    title: "Premium Business Package",
    oldPrice: 177.38,
    price: 157.38,
    planfor: "month",
    packageType: "premium",
    vatIncluded: false,
    features: [
      "All Business Features",
      "Premium Support",
      "Advanced Analytics",
    ],
  },
  {
    title: "Premium Business Package/Year",
    oldPrice: 1773.8,
    price: 1573.8,
    planfor: "yearly",
    packageType: "premium",
    vatIncluded: false,
    features: [
      "All Business Features",
      "Premium Support",
      "Advanced Analytics",
    ],
  },
];

// Helper functions
export const calculateVAT = (amount: number, vatRate: number = 22): number => {
  return Math.round(((amount * vatRate) / 100) * 100) / 100;
};

export const calculateTotalWithVAT = (
  amount: number,
  vatRate: number = 22
): number => {
  return Math.round(amount * (1 + vatRate / 100) * 100) / 100;
};

export const getPricingByPackage = (
  packageType: "flat-rate" | "business" | "premium"
) => {
  return pricingPlans.find((plan) => plan.packageType === packageType);
};
