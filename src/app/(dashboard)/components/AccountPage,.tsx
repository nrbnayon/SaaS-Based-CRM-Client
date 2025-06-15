// src\app\(dashboard)\accounts\page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon, SquarePlus, TrendingUp } from "lucide-react";
// import img from "next/img";
import React from "react";

// Data for financial cards
const financialCards = [
  {
    title: "Expense",
    amount: "$12,153.00",
    period: "Monthly",
    increaseText: "Increase your Expanse",
    increasePercent: "15%",
    timePeriod: "7 days",
    trendPercent: "22%",
    borderColor: "border-error",
    accentColor: "text-error",
  },
  {
    title: "Income",
    amount: "$12,153.00",
    period: "Monthly",
    increaseText: "Increase your income",
    increasePercent: "15%",
    timePeriod: "7 days",
    trendPercent: "22%",
    borderColor: "border-success",
    accentColor: "text-success",
  },
  {
    title: "Savings",
    amount: "$12,153.00",
    period: "Monthly",
    increaseText: "Increase your income",
    increasePercent: "15%",
    timePeriod: "7 days",
    trendPercent: "22%",
    borderColor: "border-cyan",
    accentColor: "text-cyan",
  },
];

// Data for months
const months = [
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
];

// Data for income chart bars (heights in pixels)
const incomeBarHeights = [77, 11, 50, 93, 66, 33, 84, 49, 66, 27, 41, 50];

// Data for expense chart bars (heights in pixels)
const expenseBarHeights = [42, 35, 19, 60, 31, 19, 35, 22, 29, 11, 31, 54];

export const AccountPage = () => {
  return (
    <div className='flex w-full items-center gap-6'>
      <div className='flex flex-col items-start gap-6 flex-1'>
        <div className='flex items-center gap-6 w-full flex-1'>
          {/* Expense Card */}
          <Card
            className={`flex flex-col bg-secondary dark:bg-background items-center border-t-8 gap-2 p-2 flex-1 rounded-[20px] ${financialCards[0].borderColor}`}
          >
            <CardHeader className='flex flex-row items-center justify-between px-2 py-1 w-full'>
              <CardTitle className='font-medium text-white text-base'>
                {financialCards[0].title}
              </CardTitle>
              <Select defaultValue={financialCards[0].period.toLowerCase()}>
                <SelectTrigger className='inline-flex items-center justify-center gap-1.5 px-1 py-2 h-auto w-auto bg-transparent border-none'>
                  <SelectValue
                    placeholder={financialCards[0].period}
                    className='font-normal text-[#a7a7a7] text-xs'
                  />
                  <ChevronDownIcon className='h-4 w-4 text-[#a7a7a7]' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='daily'>Daily</SelectItem>
                  <SelectItem value='weekly'>Weekly</SelectItem>
                  <SelectItem value='monthly'>Monthly</SelectItem>
                  <SelectItem value='yearly'>Yearly</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className='flex flex-col items-start gap-1 w-full p-0'>
              <div className='flex items-center gap-2 px-2 py-0 w-full'>
                <div className='font-bold text-white text-[32px] leading-[48px]'>
                  {financialCards[0].amount}
                </div>
              </div>
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-2 px-2 py-1 w-52'>
                  <div className='flex-1 font-normal text-white text-sm leading-[21px]'>
                    {financialCards[0].increaseText}{" "}
                    <span className='font-semibold text-error'>
                      {financialCards[0].increasePercent}
                    </span>{" "}
                    last{" "}
                    <span className='font-semibold text-error'>
                      {financialCards[0].timePeriod}
                    </span>
                  </div>
                </div>
                <div className='inline-flex items-center justify-center gap-2 p-1 rounded-lg'>
                  <TrendingUp className='text-error' />
                  <div className='text-error font-semibold text-sm leading-[21px]'>
                    {financialCards[0].trendPercent}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Income Card */}
          <Card
            className={`flex flex-col items-center bg-secondary dark:bg-background gap-2 p-2 border-t-8 flex-1 rounded-[20px] ${financialCards[1].borderColor}`}
          >
            <CardHeader className='flex flex-row items-center justify-between px-2 py-1 w-full'>
              <CardTitle className='font-medium text-white text-base'>
                {financialCards[1].title}
              </CardTitle>
              <Select defaultValue={financialCards[1].period.toLowerCase()}>
                <SelectTrigger className='inline-flex items-center justify-center gap-1.5 px-1 py-2 h-auto w-auto bg-transparent border-none'>
                  <SelectValue
                    placeholder={financialCards[1].period}
                    className='font-normal text-[#a7a7a7] text-xs'
                  />
                  <ChevronDownIcon className='h-4 w-4 text-[#a7a7a7]' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='daily'>Daily</SelectItem>
                  <SelectItem value='weekly'>Weekly</SelectItem>
                  <SelectItem value='monthly'>Monthly</SelectItem>
                  <SelectItem value='yearly'>Yearly</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className='flex flex-col items-start gap-1 w-full p-0'>
              <div className='flex items-center gap-2 px-2 py-0 w-full'>
                <div className='font-bold text-white text-[32px] leading-[48px]'>
                  {financialCards[1].amount}
                </div>
              </div>
              <div className='flex items-center justify-between w-full'>
                <div className='inline-flex items-center justify-center gap-2 px-2 py-1'>
                  <div className='w-[167px] font-normal text-white text-sm leading-[21px]'>
                    {financialCards[1].increaseText}{" "}
                    <span className='font-semibold text-success'>
                      {financialCards[1].increasePercent}
                    </span>{" "}
                    last{" "}
                    <span className='font-semibold text-success'>
                      {financialCards[1].timePeriod}
                    </span>
                  </div>
                </div>
                <div className='inline-flex items-center justify-center gap-2 p-1 rounded-lg'>
                  <TrendingUp className='text-success' />
                  <div className='text-success font-semibold text-sm leading-[21px]'>
                    {financialCards[1].trendPercent}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='flex items-center gap-6 w-full flex-1'>
          {/* Savings Card */}
          <Card
            className={`flex flex-col items-center bg-secondary dark:bg-background gap-2 border-t-8 p-2 flex-1 rounded-[20px] ${financialCards[2].borderColor}`}
          >
            <CardHeader className='flex flex-row items-center justify-between px-2 py-1 w-full'>
              <CardTitle className='font-medium text-white text-base'>
                {financialCards[2].title}
              </CardTitle>
              <Select defaultValue={financialCards[2].period.toLowerCase()}>
                <SelectTrigger className='inline-flex items-center justify-center gap-1.5 px-1 py-2 h-auto w-auto bg-transparent border-none'>
                  <SelectValue
                    placeholder={financialCards[2].period}
                    className='font-normal text-[#a7a7a7] text-xs'
                  />
                  <ChevronDownIcon className='h-4 w-4 text-[#a7a7a7]' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='daily'>Daily</SelectItem>
                  <SelectItem value='weekly'>Weekly</SelectItem>
                  <SelectItem value='monthly'>Monthly</SelectItem>
                  <SelectItem value='yearly'>Yearly</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className='flex flex-col items-start gap-1 w-full p-0'>
              <div className='flex items-center gap-2 px-2 py-0 w-full'>
                <div className='font-bold text-white text-[32px] leading-[48px]'>
                  {financialCards[2].amount}
                </div>
              </div>
              <div className='flex items-center justify-between w-full'>
                <div className='inline-flex items-center justify-center gap-2 px-2 py-1'>
                  <div className='w-[167px] font-normal text-cyan text-sm leading-[21px]'>
                    {financialCards[2].increaseText}{" "}
                    <span className='font-semibold text-white'>
                      {financialCards[2].increasePercent}
                    </span>{" "}
                    last{" "}
                    <span className='font-semibold text-white'>
                      {financialCards[2].timePeriod}
                    </span>
                  </div>
                </div>
                <div className='inline-flex items-center justify-center gap-2 p-1 rounded-lg'>
                  <TrendingUp className='text-cyan' />
                  <div className='text-cyan font-semibold text-sm leading-[21px]'>
                    {financialCards[2].trendPercent}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Accounts Card */}
          <Card className='flex flex-col bg-secondary dark:bg-background items-center gap-6 pt-2 border-t-8 pb-4 px-2 flex-1 rounded-[20px] border-white'>
            <CardHeader className='flex-col items-start justify-center gap-1 px-2 py-1 w-full'>
              <CardTitle className='font-medium text-white text-base leading-[20.8px]'>
                Add Accounts
              </CardTitle>
              <p className='font-normal text-muted-custom text-xs leading-[15.6px]'>
                You can add your daily income and expanse
              </p>
            </CardHeader>
            <CardContent className='flex items-center gap-3 p-2 flex-1 w-full'>
              <Button
                variant='default'
                className='flex items-center justify-center gap-2 px-4 py-3 flex-1 bg-white rounded-xl'
              >
                <SquarePlus className='text-[#34C724]' />
                <span className='font-semibold text-[#34C724] text-base'>
                  Income
                </span>
              </Button>
              <Button
                variant='default'
                className='flex items-center justify-center gap-2 px-4 py-3 flex-1 bg-white rounded-xl'
              >
                <SquarePlus className='text-error' />
                <span className='font-semibold text-error text-base'>
                  Expanse
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Card */}
      {/* //light Radial Gradient #4787F5-#FFFFFF-#FF9233 dark:bg-#141440 dark-primary, */}
      <Card className='flex flex-col h-96 items-start dark:bg-dark-primary justify-between p-2 flex-1 rounded-[20px]'>
        <CardHeader className='flex flex-row items-center justify-between p-2 w-full'>
          <CardTitle className='inline-flex items-center justify-center gap-2 font-medium text-white text-base'>
            Analytics
          </CardTitle>
          <Select defaultValue='yearly'>
            <SelectTrigger className='inline-flex items-center justify-center gap-1.5 px-3 py-2 h-auto bg-transparent rounded-lg border-[0.5px] border-solid border-[#505050]'>
              <SelectValue
                placeholder='Yearly'
                className='font-normal text-muted-custom text-xs'
              />
              <ChevronDownIcon className='h-4 w-4 text-muted-custom' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='daily'>Daily</SelectItem>
              <SelectItem value='weekly'>Weekly</SelectItem>
              <SelectItem value='monthly'>Monthly</SelectItem>
              <SelectItem value='yearly'>Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className='flex items-start justify-center gap-6 p-4 w-full'>
          <div className='inline-flex flex-col h-[243px] items-start justify-between'>
            <div className='font-normal text-muted-custom text-xs'>50K</div>
            <div className='font-normal text-muted-custom text-xs'>0</div>
            <div className='font-normal text-muted-custom text-xs text-right'>
              50K
            </div>
          </div>
          <div className='flex flex-col items-start gap-2.5 flex-1'>
            {/* Income Chart Bars */}
            <div className='flex items-end justify-between w-full'>
              {incomeBarHeights.map((height, index) => (
                <div
                  key={`income-${index}`}
                  className={`w-8 h-[${height}px] ${
                    index === 3 || index === 0 || index === 6
                      ? "bg-success"
                      : "bg-chart-4"
                  } rounded-[8px_8px_0px_0px]`}
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>

            {/* Month Labels */}
            <div className='flex items-end justify-between w-full'>
              {months.map((month, index) => (
                <div
                  key={`month-${index}`}
                  className='w-8 font-normal text-[#ababab] text-sm text-center'
                >
                  {month}
                </div>
              ))}
            </div>

            {/* Expense Chart Bars (rotated) */}
            <div className='flex items-end justify-between w-full -rotate-180'>
              {expenseBarHeights.map((height, index) => (
                <div
                  key={`expense-${index}`}
                  className={`w-8 h-[${height}px] ${
                    index === 3 || index === 11
                      ? "bg-[#ffad66]"
                      : "bg-[#80564b]"
                  } rounded-[8px_8px_0px_0px]`}
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
