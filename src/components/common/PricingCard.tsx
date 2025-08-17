/** @format */
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
  onUpdate?: (data: PricingData) => void;
}

export interface PricingData {
  title: string;
  oldPrice: number;
  price: number;
  planfor: string;
}

const PricingCard = ({
  title,
  oldPrice,
  price,
  planfor,
  onUpdate,
}: PricingCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pricingData, setPricingData] = useState<PricingData>({
    title,
    oldPrice,
    price,
    planfor,
  });

  const handleEdit = () => {
    setIsDialogOpen(true);
  };

  const handleUpdateData = (updatedData: PricingData) => {
    setPricingData(updatedData);
    onUpdate?.(updatedData);
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className='w-full rounded-2xl h-full dark:bg-transparent'>
        <Card className='bg-primary dark:bg-[#081524] border-0 p-0 text-foreground'>
          <CardContent className='pt-3'>
            <div className='flex items-center gap-2 '>
              <div className='w-4 h-4 rounded-full border-2 border-white'></div>
              <span className='text-white text-base md:text-xl font-semibold'>
                {pricingData.title}
              </span>
              <div className='ml-auto'>
                <Button onClick={handleEdit}>Edit</Button>
              </div>
            </div>

            <div className='pl-6'>
              <ul className='space-y-2 mb-6 text-white text-xs md:text-sm'>
                <li className='flex items-center gap-2'>
                  <div className='w-1.5 h-1.5 rounded-full bg-white'></div>
                  Automatic bot building
                </li>
                <li className='flex items-center gap-2'>
                  <div className='w-1.5 h-1.5 rounded-full bg-white'></div>
                  Team collaboration
                </li>
                <li className='flex items-center gap-2'>
                  <div className='w-1.5 h-1.5 rounded-full bg-white'></div>
                  AI model training
                </li>
                <li className='flex items-center gap-2'>
                  <div className='w-1.5 h-1.5 rounded-full bg-white'></div>
                  Multilingual AI
                </li>
              </ul>
            </div>

            <div className='w-full flex justify-between items-end mb-4'>
              <div>
                <Button className=' bg-white text-black hover:bg-[#e2e2e2] font-semibold text-xs md:text-sm'>
                  Buy Now
                </Button>
              </div>
              <div>
                <div className='flex text-xl md:text-3xl font-bold text-white'>
                  ${pricingData.price}{" "}
                  <span className='text-xs font-normal pt-4 text-whited'>
                    /{pricingData.planfor}
                  </span>
                </div>

                <div className='flex space-x-3 items-end'>
                  <div className='text-white line-through text-xs'>
                    ${pricingData.oldPrice}{" "}
                  </div>
                  <div className='text-black bg-white px-3 py-0.5 rounded-2xl text-xs'>
                    Save: ${pricingData.oldPrice - pricingData.price}
                  </div>
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


{/* <div className="w-full rounded-2xl h-full bg-[linear-gradient(45deg,#02DBD6_0%,#080635_50%,#02DBD6_100%)]">
        <Card className="bg-transparent border-0"></Card> */}