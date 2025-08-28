"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import EditPricingDialog from "./EditPricingDialog";

interface PricingCardProps {
  title: string;
  oldPrice: number;
  price: number;
  planfor: string;
  packageType?: string;
  vatApplicable?: boolean;
  priceWithVAT?: number;
  businessPrice?: number;
  premiumPrice?: number;
  features?: string[];
  userType?: "freelancer" | "business" | "premium";
  onUpdate?: (data: PricingData) => void;
}

export interface PricingData {
  title: string;
  oldPrice: number;
  price: number;
  planfor: string;
  packageType?: string;
  vatApplicable?: boolean;
  priceWithVAT?: number;
  businessPrice?: number;
  premiumPrice?: number;
  userType?: "freelancer" | "business" | "premium";
}

const PricingCard = ({
  title,
  oldPrice,
  price,
  planfor,
  packageType,
  vatApplicable = false,
  priceWithVAT,
  businessPrice,
  premiumPrice,
  features,
  userType = "freelancer",
  onUpdate,
}: PricingCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pricingData, setPricingData] = useState<PricingData>({
    title,
    oldPrice,
    price,
    planfor,
    packageType,
    vatApplicable,
    priceWithVAT,
    businessPrice,
    premiumPrice,
    userType,
  });

  const handleEdit = () => {
    setIsDialogOpen(true);
  };

  const handleUpdateData = (updatedData: PricingData) => {
    setPricingData(updatedData);
    onUpdate?.(updatedData);
    setIsDialogOpen(false);
  };

  // Calculate display price based on user type and VAT
  const getDisplayPrice = () => {
    if (!vatApplicable || userType === "freelancer") {
      return price;
    }

    switch (userType) {
      case "business":
        return businessPrice || priceWithVAT || price;
      case "premium":
        return premiumPrice || priceWithVAT || price;
      default:
        return price;
    }
  };

  const getBasePrice = () => {
    if (userType === "premium" && premiumPrice) {
      return Math.round(premiumPrice / 1.22); // Remove VAT to show base
    }
    return price;
  };

  const getSavingsAmount = () => {
    if (userType === "premium" && premiumPrice) {
      const basePremium = Math.round(premiumPrice / 1.22);
      return oldPrice > basePremium ? oldPrice - basePremium : 0;
    }
    return oldPrice > price ? oldPrice - price : 0;
  };

  const displayPrice = getDisplayPrice();
  const basePrice = getBasePrice();
  const savings = getSavingsAmount();

  return (
    <>
      <div
        className="w-full rounded-2xl h-full "
        style={{
          background:
            "linear-gradient(135deg, #378986 0%, #081524 50%, #00394a 100%)",
        }}
      >
        <Card
          className="border-0 p-0 text-foreground"
          style={{
            background:
              "linear-gradient(135deg, #378986 0%, #081524 50%, #00394a 100%)",
          }}
        >
          <CardContent className="pt-3">
            <div className="flex items-center gap-2 ">
              <div className="w-4 h-4 rounded-full border-2 border-white"></div>
              <span className="text-white text-base md:text-xl font-semibold">
                {pricingData.title}
                {userType === "premium" && (
                  <span className="ml-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs">
                    Premium
                  </span>
                )}
              </span>
              <div className="ml-auto">
                <Button onClick={handleEdit}>Edit</Button>
              </div>
            </div>

            <div className="pl-6">
              <ul className="space-y-2 mb-6 text-white text-xs md:text-sm">
                {features ? (
                  features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      {feature}
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      Financial Management
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      AI Chat Assistant
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      Aptitude Tests
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      Analytics & Reports
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="w-full flex justify-between items-end mb-4">
              <div>
                <Button className=" bg-white text-black hover:bg-[#e2e2e2] font-semibold text-xs md:text-sm">
                  Buy Now
                </Button>
              </div>
              <div>
                <div className="flex text-xl md:text-3xl font-bold text-white">
                  €{displayPrice.toFixed(2)}{" "}
                  <span className="text-xs font-normal pt-4 text-whited">
                    /{pricingData.planfor}
                  </span>
                </div>

                <div className="flex space-x-3 items-end flex-wrap">
                  {savings > 0 && (
                    <>
                      <div className="text-white line-through text-xs">
                        €{oldPrice}{" "}
                      </div>
                      <div className="text-black bg-white px-3 py-0.5 rounded-2xl text-xs">
                        Save: €{savings}
                      </div>
                    </>
                  )}

                  {/* VAT Information */}
                  {vatApplicable && userType !== "freelancer" ? (
                    <div className="text-white text-xs">
                      <div>€{basePrice} + 22% VAT</div>
                      <div className="text-green-300">
                        (€{displayPrice.toFixed(2)} total)
                      </div>
                    </div>
                  ) : !vatApplicable ? (
                    <div className="text-white text-xs">VAT not applicable</div>
                  ) : (
                    <div className="text-white text-xs">
                      Freelancer use - No VAT
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <EditPricingDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        data={pricingData}
        onUpdate={handleUpdateData}
      />
    </>
  );
};

export default PricingCard;
