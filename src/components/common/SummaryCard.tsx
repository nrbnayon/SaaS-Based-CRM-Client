"use client"

import { Button } from "../ui/button"

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"

export function SummaryCard() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically call an API to save the income
      };
  return (
    <div>
        <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="income-amount" className="text-right">
                          Amount
                        </Label>
                        <Input
                          id="income-amount"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="col-span-3"
                          
                          
                         required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="income-category" className="text-right">
                          Category
                        </Label>
                        <Select
                          value='Select'
                          
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="salary">Salary</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="investment">
                              Investment
                            </SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="income-description"
                          className="text-right"
                        >
                          Description
                        </Label>
                        <Textarea
                          id="income-description"
                          placeholder="Enter description..."
                          className="col-span-3"
                          value="income-description"
                          
                          
                        />
                      </div>
                    </div>
                    <div>
                      <Button
                        type="submit"
                        className="bg-success hover:bg-success/90"
                      >
                        Add 
                      </Button>
                    </div>
                  </form>
    </div>
  )
}