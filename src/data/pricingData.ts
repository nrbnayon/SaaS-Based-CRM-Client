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
      "Aptitude Tests"
    ]
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
    yearlyPriceWithVat: 1207.80,
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
export const priceData = [
    ]
    title: "Flat Rate Package",
    oldPrice: 69,
    price: 39,
    planfor: "month",
    packageType: "flat-rate",
    vatIncluded: true,
    features: ["Invoice Creation", "Bank Statements", "Direct Support"]
    basePrice: 129,
    vatIncluded: false,
    title: "Business Package",
    monthlyPrice: 129,
    price: 120.78,
    planfor: "month",
    packageType: "business", 
    vatIncluded: false,
    features: ["Personnel Recruitment", "All Financial Features", "AI Chat"]
    yearlyPriceWithVat: 1573.80,
    planfor: "month", 
    title: "Flat Rate Package/Year",
    oldPrice: 690,
    price: 390,
      "All Business Package Features",
    packageType: "flat-rate",
    vatIncluded: true
      "Premium Personnel Services",
      "Priority Support",
    title: "Business Package/Year", 
    oldPrice: 1207.80,
    price: 1207.80,
    ]
    packageType: "business",
    vatIncluded: false
  },
  {
    title: "Premium Business Package",
    oldPrice: 157.38,
    price: 157.38,
    planfor: "month",
    packageType: "premium",
    vatIncluded: false,
    features: ["All Business Features", "Premium Support", "Advanced Analytics"]
  },
  {
    title: "Premium Business Package/Year",
    oldPrice: 1573.80,
    price: 1573.80,
    planfor: "yearly", 
    packageType: "premium",
    vatIncluded: false
  }
];

// Updated price data for carousel compatibility
export const priceData = pricingPlans.map(plan => ({
  title: plan.title,
  oldPrice: plan.packageType === "flat-rate" ? 69 : plan.basePrice + 20,
  price: plan.vatIncluded ? plan.monthlyPrice : (plan.monthlyPriceWithVat || plan.monthlyPrice),
  planfor: plan.planfor,
  packageType: plan.packageType,
  vatIncluded: plan.vatIncluded,
  features: plan.features
}));

// Helper functions
export const calculateVAT = (amount: number, vatRate: number = 22): number => {
  return Math.round((amount * vatRate / 100) * 100) / 100;
};

export const calculateTotalWithVAT = (amount: number, vatRate: number = 22): number => {
  return Math.round((amount * (1 + vatRate / 100)) * 100) / 100;
};

export const getPricingByPackage = (packageType: "flat-rate" | "business" | "premium") => {
  return pricingPlans.find(plan => plan.packageType === packageType);
};