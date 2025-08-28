// src/app/(dashboard)/components/Accountant/InvoiceCreation.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, FileText, Send } from "lucide-react";
import { toast } from "sonner";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  clientName: string;
  clientAddress: string;
  clientVatNumber: string;
  issuerName: string;
  issuerAddress: string;
  issuerVatNumber: string;
  issuerIban: string;
  issuerBankName: string;
  items: InvoiceItem[];
  subtotal: number;
  gsInpsContribution: number;
  total: number;
  applyGsInps: boolean;
  legalPhrase: string;
}

export const InvoiceCreation = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now()}`,
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    clientName: "",
    clientAddress: "",
    clientVatNumber: "",
    issuerName: "",
    issuerAddress: "",
    issuerVatNumber: "",
    issuerIban: "",
    issuerBankName: "",
    items: [{ id: "1", description: "", quantity: 1, unitPrice: 0, total: 0 }],
    subtotal: 0,
    gsInpsContribution: 0,
    total: 0,
    applyGsInps: false,
    legalPhrase:
      "Operazione in regime di vantaggio ai sensi della Legge 190/2014 - IVA non dovuta",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const updateInvoiceData = (field: keyof InvoiceData, value: unknown) => {
    setInvoiceData((prev) => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: unknown) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      }),
    }));
  };

  const removeItem = (id: string) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }));
    }
  };

  // Calculate totals
  React.useEffect(() => {
    const subtotal = invoiceData.items.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const gsInpsContribution = invoiceData.applyGsInps ? subtotal * 0.04 : 0; // 4% GS INPS contribution
    const total = subtotal + gsInpsContribution;

    setInvoiceData((prev) => ({
      ...prev,
      subtotal,
      gsInpsContribution,
      total,
    }));
  }, [invoiceData.items, invoiceData.applyGsInps]);

  const generateAndSendInvoice = async () => {
    setIsGenerating(true);

    try {
      // Simulate PDF generation and email sending
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log invoice data for backend processing
      console.log("Invoice Data for PDF Generation:", {
        ...invoiceData,
        emailRecipient: "commercialista@agenziareduco.it",
        timestamp: new Date().toISOString(),
      });

      toast.success("Invoice Generated Successfully!", {
        description:
          "Invoice PDF has been generated and sent to your accountant at commercialista@agenziareduco.it",
      });

      // Reset form
      setInvoiceData({
        invoiceNumber: `INV-${Date.now()}`,
        invoiceDate: new Date().toISOString().split("T")[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        clientName: "",
        clientAddress: "",
        clientVatNumber: "",
        issuerName: "",
        issuerAddress: "",
        issuerVatNumber: "",
        issuerIban: "",
        issuerBankName: "",
        items: [
          { id: "1", description: "", quantity: 1, unitPrice: 0, total: 0 },
        ],
        subtotal: 0,
        gsInpsContribution: 0,
        total: 0,
        applyGsInps: false,
        legalPhrase:
          "Operazione in regime di vantaggio ai sensi della Legge 190/2014 - IVA non dovuta",
      });
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast.error("Failed to generate invoice", {
        description: "Please try again or contact support",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Create New Invoice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Invoice Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={(e) =>
                  updateInvoiceData("invoiceNumber", e.target.value)
                }
                className="bg-gray-50 border-border"
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={invoiceData.invoiceDate}
                onChange={(e) =>
                  updateInvoiceData("invoiceDate", e.target.value)
                }
                className="border-border"
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => updateInvoiceData("dueDate", e.target.value)}
                className="border-border"
              />
            </div>
          </div>

          <Separator />

          {/* Client Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Client Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientName">Company Name *</Label>
                <Input
                  id="clientName"
                  value={invoiceData.clientName}
                  onChange={(e) =>
                    updateInvoiceData("clientName", e.target.value)
                  }
                  placeholder="Enter client company name"
                  className="border-border"
                  required
                />
              </div>
              <div>
                <Label htmlFor="clientVatNumber">VAT Number *</Label>
                <Input
                  id="clientVatNumber"
                  value={invoiceData.clientVatNumber}
                  onChange={(e) =>
                    updateInvoiceData("clientVatNumber", e.target.value)
                  }
                  placeholder="Enter client VAT number"
                  className="border-border"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="clientAddress">Address *</Label>
              <Textarea
                id="clientAddress"
                value={invoiceData.clientAddress}
                onChange={(e) =>
                  updateInvoiceData("clientAddress", e.target.value)
                }
                placeholder="Enter client address"
                className="border-border"
                required
              />
            </div>
          </div>

          <Separator />

          {/* Issuer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Your Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issuerName">Company Name *</Label>
                <Input
                  id="issuerName"
                  value={invoiceData.issuerName}
                  onChange={(e) =>
                    updateInvoiceData("issuerName", e.target.value)
                  }
                  placeholder="Enter your company name"
                  className="border-border"
                  required
                />
              </div>
              <div>
                <Label htmlFor="issuerVatNumber">Your VAT Number *</Label>
                <Input
                  id="issuerVatNumber"
                  value={invoiceData.issuerVatNumber}
                  onChange={(e) =>
                    updateInvoiceData("issuerVatNumber", e.target.value)
                  }
                  placeholder="Enter your VAT number"
                  className="border-border"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="issuerAddress">Your Address *</Label>
              <Textarea
                id="issuerAddress"
                value={invoiceData.issuerAddress}
                onChange={(e) =>
                  updateInvoiceData("issuerAddress", e.target.value)
                }
                placeholder="Enter your company address"
                className="border-border"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issuerIban">IBAN *</Label>
                <Input
                  id="issuerIban"
                  value={invoiceData.issuerIban}
                  onChange={(e) =>
                    updateInvoiceData("issuerIban", e.target.value)
                  }
                  placeholder="Enter your IBAN"
                  className="border-border"
                  required
                />
              </div>
              <div>
                <Label htmlFor="issuerBankName">Bank Name *</Label>
                <Input
                  id="issuerBankName"
                  value={invoiceData.issuerBankName}
                  onChange={(e) =>
                    updateInvoiceData("issuerBankName", e.target.value)
                  }
                  placeholder="Enter your bank name"
                  className="border-border"
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Services/Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Services Provided
              </h3>
              <Button onClick={addItem} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {invoiceData.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 items-end p-4 border border-border rounded-lg"
                >
                  <div className="col-span-12 md:col-span-5">
                    <Label>Service Description *</Label>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      placeholder="Describe the service provided"
                      className="border-border"
                      required
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "quantity",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="border-border"
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <Label>Unit Price (€)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "unitPrice",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="border-border"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <Label>Total (€)</Label>
                    <Input
                      value={`€${item.total.toFixed(2)}`}
                      className="bg-gray-50 border-border"
                      readOnly
                    />
                  </div>
                  <div className="col-span-1">
                    {invoiceData.items.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-error hover:text-error hover:bg-error/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* GS INPS Contribution Checkbox */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="applyGsInps"
                checked={invoiceData.applyGsInps}
                onCheckedChange={(checked) =>
                  updateInvoiceData("applyGsInps", checked)
                }
              />
              <Label
                htmlFor="applyGsInps"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-3"
              >
                Apply GS INPS contribution 4%
              </Label>
            </div>
          </div>

          {/* Invoice Totals */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Invoice Summary
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">
                  €{invoiceData.subtotal.toFixed(2)}
                </span>
              </div>
              {invoiceData.applyGsInps && (
                <div className="flex justify-between">
                  <span>GS INPS Contribution (4%):</span>
                  <span className="font-medium">
                    €{invoiceData.gsInpsContribution.toFixed(2)}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">
                  €{invoiceData.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Legal Phrase */}
          <div>
            <Label htmlFor="legalPhrase">Legal VAT/Stamp Duty Phrase</Label>
            <Textarea
              id="legalPhrase"
              value={invoiceData.legalPhrase}
              onChange={(e) => updateInvoiceData("legalPhrase", e.target.value)}
              className="border-border"
              rows={2}
            />
          </div>

          {/* Generate Invoice Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={generateAndSendInvoice}
              disabled={
                isGenerating ||
                !invoiceData.clientName ||
                !invoiceData.issuerName
              }
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Generate & Send to Accountant
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
