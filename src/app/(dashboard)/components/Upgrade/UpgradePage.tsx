/** @format */

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const UpgradePage = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Upgrade Plan</h2>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-[#bbbbbb] hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-[#bbbbbb] hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-[#4787f5] to-[#26337a] border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full border-2 border-white"></div>
                <span className="text-white font-semibold">Standard</span>
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

              <div className="text-right mb-4">
                <div className="text-3xl font-bold text-white">$155</div>
                <div className="text-white/80 text-sm">/yr</div>
                <div className="text-white/60 text-xs">$295 Save: $140</div>
              </div>

              <Button className="w-full bg-white text-[#4787f5] hover:bg-[#e2e2e2] font-semibold">
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
