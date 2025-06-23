/** @format */

import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface PricingCardProps {
  title: string;
  oldPrice: number;
  price: number;
  save: number;
}

const PricingCard = ({ title, oldPrice, price, save }: PricingCardProps) => {
  return (
    <div className="w-full h-full">
      <Card className="bg-transparent border-0">
        <CardContent className="">
          <div className="flex items-center gap-2 ">
            <div className="w-4 h-4 rounded-full border-2 border-white"></div>
            <span className="text-white font-semibold">{title}</span>
          </div>

          <ul className="space-y-2 mb-6 text-white text-sm">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              Automatic bot building
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              Team collaboration
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              AI model training
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              Multilingual AI
            </li>
          </ul>

          <div className="w-72 flex justify-between mb-4">
            <div>
              <Button className=" bg-white text-black hover:bg-[#e2e2e2] font-semibold text-sm">
                Buy Now
              </Button>
            </div>
            <div>
              <div className="flex text-3xl font-bold text-white">
                ${price} <span className="text-base pt-3 text-whited">/yr</span>
              </div>

              <div className="flex">
                <div className="text-white/60 text-xs">${oldPrice} </div>
                <div className="text-white/80 text-sm">Save: ${save}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingCard;
