/** @format */

import React from "react";
import DashboardHeader from "../../components/dashboard-header";
import { priceData } from "@/data/priceData";
import PricingCard from "@/components/common/PricingCard";

const Pricing = () => {
  return (
    <div>
      <DashboardHeader title='Pricing' />
      <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {priceData.map((plan, idx) => (
          <PricingCard
            key={idx}
            title={plan.title}
            oldPrice={plan.oldPrice}
            price={plan.price}
            planfor={plan.planfor}
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
