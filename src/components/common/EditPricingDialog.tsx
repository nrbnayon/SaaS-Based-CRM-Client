/** @format */

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export interface PricingData {
  title: string;
  oldPrice: number;
  price: number;
  planfor: string;
}

interface PricingErrors {
  title?: string;
  oldPrice?: string;
  price?: string;
  planfor?: string;
}

interface EditPricingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: PricingData;
  onUpdate: (data: PricingData) => void;
}

const EditPricingDialog = ({
  isOpen,
  onClose,
  data,
  onUpdate,
}: EditPricingDialogProps) => {
  const [formData, setFormData] = useState<PricingData>(data);
  const [errors, setErrors] = useState<PricingErrors>({});

  // Update form data when dialog opens with new data
  useEffect(() => {
    if (isOpen) {
      setFormData(data);
      setErrors({});
    }
  }, [isOpen, data]);

  const handleInputChange = (
    field: keyof PricingData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: PricingErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.planfor.trim()) {
      newErrors.planfor = "Plan duration is required";
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (formData.oldPrice <= 0) {
      newErrors.oldPrice = "Old price must be greater than 0";
    }

    if (formData.price > formData.oldPrice) {
      newErrors.price = "Current price must be less than old price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate(formData);
    }
  };

  const handleCancel = () => {
    setFormData(data); // Reset to original data
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]  dark:bg-[#081524]'>
        <DialogHeader>
          <DialogTitle>Edit Pricing Plan</DialogTitle>
          <DialogDescription>
            Update the pricing details for your plan. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='title' className='text-left'>
              Title
            </Label>
            <div className='col-span-3'>
              <Input
                id='title'
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
              )}
            </div>
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='oldPrice' className='text-left'>
              Old Price
            </Label>
            <div className='col-span-3'>
              <Input
                id='oldPrice'
                type='number'
                value={formData.oldPrice}
                onChange={(e) =>
                  handleInputChange("oldPrice", parseFloat(e.target.value) || 0)
                }
                className={errors.oldPrice ? "border-red-500" : ""}
              />
              {errors.oldPrice && (
                <p className='text-red-500 text-sm mt-1'>{errors.oldPrice}</p>
              )}
            </div>
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='price' className=' text-left'>
              Current Price
            </Label>
            <div className='col-span-3'>
              <Input
                id='price'
                type='number'
                value={formData.price}
                onChange={(e) =>
                  handleInputChange("price", parseFloat(e.target.value) || 0)
                }
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className='text-red-500 text-sm mt-1'>{errors.price}</p>
              )}
            </div>
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='planfor' className='text-left'>
              Plan Duration
            </Label>
            <div className='col-span-3'>
              <Input
                id='planfor'
                value={formData.planfor}
                onChange={(e) => handleInputChange("planfor", e.target.value)}
                placeholder='e.g., month, year'
                className={errors.planfor ? "border-red-500" : ""}
              />
              {errors.planfor && (
                <p className='text-red-500 text-sm mt-1'>{errors.planfor}</p>
              )}
            </div>
          </div>

          {formData.oldPrice > 0 &&
            formData.price > 0 &&
            formData.price < formData.oldPrice && (
              <div className='bg-green-50 p-3 rounded-md'>
                <p className='text-sm text-green-700'>
                  <strong>Savings:</strong> $
                  {formData.oldPrice - formData.price}
                </p>
              </div>
            )}
        </div>

        <DialogFooter>
          <Button type='button' variant='outline' onClick={handleCancel}>
            Cancel
          </Button>
          <Button type='button' onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPricingDialog;
