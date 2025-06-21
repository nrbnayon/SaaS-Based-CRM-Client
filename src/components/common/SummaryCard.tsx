"use client"

import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { cn } from "@/lib/utils"

export function SummaryCard({
  title,
  subtitle,
  buttonText,
  buttonColor,
  iconColor,
  cardBg = "#A3C3FA",
  cardBg2 = "#D3E3FD",
  textColor = "text-white",
}: {
  title: string
  subtitle: string
  buttonText: string
  buttonColor: string
  iconColor: string
  cardBg?: string
  cardBg2?: string
  textColor?: string
}) {
  return (
    <Card
      className={cn('bg-accent')}
      style={{
        background: `linear-gradient(45deg, ${cardBg} 0%, white 50%, ${cardBg2} 100%)`,
        // Dark mode gradient
        ...({ '@media (prefers-color-scheme: dark)': { background: 'linear-gradient(45deg, #000000 0%, #1a1a1a 50%, #333333 100%)' } }),
      }}
    >
      <CardContent className="p-6">
        <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>{title}</h3>
        <p
          className={`text-sm mb-4 ${
            textColor === "text-white" ? "text-[#a1a1a1] dark:text-gray-400" : "text-[#838383]"
          }`}
        >
          {subtitle}
        </p>
        <Button className={`w-full ${buttonColor} hover:opacity-90`}>
          <Plus className={`w-4 h-4 mr-2 ${iconColor}`} />
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}