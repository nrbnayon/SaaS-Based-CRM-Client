/** @format */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Carousel from "@/components/ui/carousel";
import { BadgeCheck } from "lucide-react";
import React from "react";

const UpgradePage = () => {
  const priceData = [
    {
      title: "Monthly",
      oldPrice: 100,
      price: 55,
      save: 45,
    },
    {
      title: "Half Year",
      oldPrice: 300,
      price: 255,
      save: 45,
    },
    {
      title: "Yearly",
      oldPrice: 600,
      price: 555,
      save: 45,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 space-x-4">
        {/* Current Plan */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-black dark:text-white text-lg md:text-xl">
                  Current Plan
                </CardTitle>
                <div className="flex space-x-2">
                  <BadgeCheck className="h-7 w-7" />
                  <h1 className="text-black dark:text-white text-lg md:text-xl font-bold">
                    Basic
                  </h1>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between text-muted-custom text-xs md:text-base">
                <div className="flex flex-col  ">
                  <h3 className="text-lg md:text-2xl font-semibold text-black dark:text-white ">
                    TechNova Solutions
                  </h3>
                  <p>Phone: +880 1636-828200</p>
                  <p>E-mail: mahdeershid@gmail.com</p>
                  <p>Country: Bangladesh</p>
                </div>
                <div>
                  <p>Invoice: HU-fjw-92382</p>
                  <p>Invoice Date: 12/09/2024</p>
                  <p>Invoice Amount: $55</p>
                  <p>Billing ID: 7325729579</p>
                </div>
              </div>

              <div className="flex items-center justify-between  border border-border rounded-2xl p-2 md:p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-[#141440]">
                    VISA
                  </div>
                  <span className="text-muted-custom text-xs md:text-base">
                    3545-1236-1344-3373
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-bold text-foreground">
                    $55
                    <span className="text-foreground font-medium text-sm md:text-base">
                      /mo
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Plan */}
        <div className="h-[310px] mx-0 md:mx-38 lg:mx-0">
          <div className=" h-full w-full overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Upgrade Plan
              </h2>
            </div>
            <Carousel slides={priceData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
