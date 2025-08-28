"use client";
import React, { useState } from "react";
import DashboardHeader from "../../components/dashboard-header";
import { priceData } from "@/data/priceData";
import PricingCard from "@/components/common/PricingCard";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const [userType, setUserType] = useState<
    "freelancer" | "business" | "premium"
  >("freelancer");

  // Create expanded pricing data with different tiers
  const getExpandedPriceData = () => {
    interface ExpandedPriceData {
      title: string;
      oldPrice: number;
      price: number;
      planfor: "monthly" | "yearly";
      vatApplicable: boolean;
      priceWithVAT: number;
      businessPrice?: number;
      premiumPrice?: number;
      userType: "freelancer" | "business" | "premium";
    }

    const expandedData: ExpandedPriceData[] = [];

    priceData.forEach((plan) => {
      // Always add freelancer/base version
      expandedData.push({
        ...plan,
        userType: "freelancer" as const,
      });

      // Add business version if VAT applicable
      if (plan.vatApplicable) {
        expandedData.push({
          ...plan,
          title: plan.title.replace("package", "Business package"),
          userType: "business" as const,
        });

        // Add premium version
        expandedData.push({
          ...plan,
          title: plan.title.replace("package", "Premium package"),
          userType: "premium" as const,
        });
      }
    });

    return expandedData;
  };

  const expandedPriceData = getExpandedPriceData();

  return (
    <div>
      <DashboardHeader title="Pricing" />

      {/* User Type Selector */}
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">
            Choose your account type:
          </h3>
          <div className="flex gap-3 flex-wrap">
            <Button
              variant={userType === "freelancer" ? "default" : "outline"}
              onClick={() => setUserType("freelancer")}
            >
              Freelancer
            </Button>
            <Button
              variant={userType === "business" ? "default" : "outline"}
              onClick={() => setUserType("business")}
            >
              Business Use
            </Button>
            <Button
              variant={userType === "premium" ? "default" : "outline"}
              onClick={() => setUserType("premium")}
            >
              Premium
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {userType === "freelancer" &&
              "Freelancer packages - No VAT required"}
            {userType === "business" &&
              "Business & accountant pages - 22% VAT applies"}
            {userType === "premium" &&
              "Premium features with enhanced limits - 22% VAT applies"}
          </p>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {expandedPriceData
          .filter((plan) => plan.userType === userType)
          .map((plan, idx) => (
            <PricingCard
              key={`${plan.title}-${plan.userType}-${idx}`}
              title={plan.title}
              oldPrice={plan.oldPrice}
              price={plan.price}
              planfor={plan.planfor}
              vatApplicable={plan.vatApplicable}
              priceWithVAT={plan.priceWithVAT}
              businessPrice={plan.businessPrice}
              premiumPrice={plan.premiumPrice}
              userType={plan.userType}
            />
          ))}
      </div>

      {/* VAT Information Panel */}
      <div className="p-4 mt-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">VAT Information</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Freelancer packages: No VAT required</li>
            <li>• Business & Premium accounts: 22% VAT applies</li>
            <li>• VAT is calculated automatically at checkout</li>
            <li>• Prices shown include all applicable taxes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
