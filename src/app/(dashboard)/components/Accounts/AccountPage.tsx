/** @format */

// src\app\(dashboard)\accounts\page.tsx
"use client";

import { ClientItem } from "@/components/common/ClientItem";

import { TransactionForm } from "@/components/common/TransactionForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import { BookImage, Plus, Search } from "lucide-react";
import Image from "next/image";
// import img from "next/img";
import React, { useState, useRef } from "react";

// Client data array
const initialClientsData = [
  {
    name: "Starbucks",
    id: "CL-1001",
    phone: "541515695",
    avatar: "https://logo.clearbit.com/starbucks.com",
  },
  {
    name: "General Electric",
    id: "CL-1002",
    phone: "541515696",
    avatar: "https://logo.clearbit.com/ge.com",
  },
  {
    name: "Pizza Hut",
    id: "CL-1003",
    phone: "541515697",
    avatar: "https://logo.clearbit.com/pizzahut.com",
  },
  {
    name: "Gillette",
    id: "CL-1004",
    phone: "541515698",
    avatar: "https://logo.clearbit.com/gillette.com",
  },
  {
    name: "McDonald's",
    id: "CL-1005",
    phone: "541515699",
    avatar: "https://logo.clearbit.com/mcdonalds.com",
  },
  {
    name: "Nike",
    id: "CL-1006",
    phone: "541515700",
    avatar: "https://logo.clearbit.com/nike.com",
  },
  {
    name: "Apple Inc",
    id: "CL-1007",
    phone: "541515701",
    avatar: "https://logo.clearbit.com/apple.com",
  },
  {
    name: "Google",
    id: "CL-1008",
    phone: "541515702",
    avatar: "https://logo.clearbit.com/google.com",
  },
  {
    name: "Microsoft",
    id: "CL-1009",
    phone: "541515703",
    avatar: "https://logo.clearbit.com/microsoft.com",
  },
  {
    name: "Amazon",
    id: "CL-1010",
    phone: "541515704",
    avatar: "https://logo.clearbit.com/amazon.com",
  },
  {
    name: "Facebook",
    id: "CL-1011",
    phone: "541515705",
    avatar: "https://logo.clearbit.com/facebook.com",
  },
  {
    name: "Tesla",
    id: "CL-1012",
    phone: "541515706",
    avatar: "https://logo.clearbit.com/tesla.com",
  },
  {
    name: "Netflix",
    id: "CL-1013",
    phone: "541515707",
    avatar: "https://logo.clearbit.com/netflix.com",
  },
  {
    name: "Spotify",
    id: "CL-1014",
    phone: "541515708",
    avatar: "https://logo.clearbit.com/spotify.com",
  },
  {
    name: "Uber",
    id: "CL-1015",
    phone: "541515709",
    avatar: "https://logo.clearbit.com/uber.com",
  },
];

export const AccountPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Income");
  const [clientsData, setClientsData] = useState(initialClientsData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter clients based on search term
  const filteredClients = clientsData.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle summary card button clicks
  const handleSummaryCardClick = (tabValue: string) => {
    setActiveTab(tabValue);
    // Scroll to transactions section
    const transactionsSection = document.getElementById("transactions-section");
    if (transactionsSection) {
      transactionsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    phone: "",
    email: "",
    address: "",
    avatar: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setFormData({
          ...formData,
          avatar: imageUrl,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle BookImage icon click
  const handleBookImageClick = () => {
    fileInputRef.current?.click();
  };

  // Generate unique client ID
  const generateClientId = () => {
    const existingIds = clientsData.map((client) =>
      parseInt(client.id.replace("CL-", ""))
    );
    const maxId = Math.max(...existingIds);
    return `CL-${(maxId + 1).toString().padStart(4, "0")}`;
  };

  // Handle save client
  const handleSaveClient = () => {
    // Validate required fields
    if (!formData.name || !formData.phone) {
      console.log("Please fill in at least the client name and phone number.");
      return;
    }

    // Create new client object
    const newClient = {
      name: formData.name,
      id: formData.id || generateClientId(),
      phone: formData.phone,
      avatar:
        formData.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          formData.name
        )}&background=random`,
    };

    // Add to clients data
    setClientsData((prevClients) => [...prevClients, newClient]);

    // Reset form
    setFormData({
      name: "",
      id: "",
      phone: "",
      email: "",
      address: "",
      avatar: "",
    });

    // Close dialog
    setIsDialogOpen(false);

    // Show success message
    console.log("Client saved successfully!");
  };

  return (
    <div className='p-4 space-y-4 md:space-y-10'>
      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8'>
        <Card
          className={cn(
            " bg-[linear-gradient(45deg,#A3C3FA_0%,white_50%,#D3E3FD_100%)] dark:bg-[linear-gradient(45deg,#081524_100%,#081524_100%,#081524_100%)]"
          )}
        >
          <CardContent className=''>
            <h3 className={`text-sm md:text-base  font-semibold mb-2 `}>
              Income
            </h3>
            <p className={`text-xs md:text-sm text-muted-custom  mb-4 `}>
              Add your Expense transaction&apos;s details
            </p>
            <Button
              onClick={() => handleSummaryCardClick("Income")}
              className={`p-5 w-full text-xs md:text-base bg-transparent text-foreground dark:text-success hover:bg-transparent dark:bg-secondary dark:hover:bg-secondary/80 cursor-pointer border border-success dark:border-none`}
            >
              <Plus
                className={`w-4 h-4 mr-2 text-foreground dark:text-success border-2 border-foreground dark:border-success rounded-sm `}
              />
              Income
            </Button>
          </CardContent>
        </Card>

        <Card
          className={cn(
            " bg-[linear-gradient(45deg,#FFDEDD_0%,#FFF9F9_45%,#FFD1CF_100%)] dark:bg-[linear-gradient(45deg,#081524_100%,#081524_100%,#081524_100%)]"
          )}
        >
          <CardContent className=''>
            <h3 className={`text-sm md:text-base  font-semibold mb-2 `}>
              Expense
            </h3>
            <p className={`text-xs md:text-sm text-muted-custom  mb-4 `}>
              Add your Expense transaction&apos;s details
            </p>
            <Button
              onClick={() => handleSummaryCardClick("Expense")}
              className={`p-5 w-full text-xs md:text-base bg-transparent text-error hover:bg-transparent dark:bg-secondary dark:hover:bg-secondary/80 cursor-pointer border border-error dark:border-none`}
            >
              <Plus
                className={`w-4 h-4 mr-2 text-error border-2 border-error rounded-sm `}
              />
              Expense
            </Button>
          </CardContent>
        </Card>

        <Card
          className={cn(
            " bg-[linear-gradient(45deg,#BEFFFD_0%,white_45%,#D7FFFE_100%)] dark:bg-[linear-gradient(45deg,#081524_100%,#081524_100%,#081524_100%)]"
          )}
        >
          <CardContent className=''>
            <h3 className={`text-sm md:text-base  font-semibold mb-2 `}>
              Savings
            </h3>
            <p className={`text-xs md:text-sm text-muted-custom  mb-4 `}>
              Add your Expense transaction&apos;s details
            </p>
            <Button
              onClick={() => handleSummaryCardClick("Savings")}
              className={`p-5 w-full text-xs md:text-base bg-transparent text-cyan hover:bg-transparent dark:bg-secondary dark:hover:bg-secondary/80 cursor-pointer border border-cyan dark:border-none`}
            >
              <Plus
                className={`w-4 h-4 mr-2 text-cyan border-2 border-cyan rounded-sm `}
              />
              Savings
            </Button>
          </CardContent>
        </Card>

        <Card
          className={cn(
            " bg-[linear-gradient(45deg,#F2F2F2_0%,#F2F2F2_45%,#F2F2F2_100%)] dark:bg-[linear-gradient(45deg,#081524_100%,#081524_100%,#081524_100%)]"
          )}
        >
          <CardContent className=''>
            <h3 className={`text-sm md:text-base  font-semibold mb-2 `}>
              Fixed Client
            </h3>
            <p className={`text-xs md:text-sm text-muted-custom  mb-4 `}>
              Add your Client details
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className={`p-5 w-full text-xs md:text-base text-white dark:text-black bg-[#505050] hover:bg-[#505050]/80 dark:hover:bg-cyan dark:bg-white cursor-pointer border border-primary`}
                >
                  <Plus
                    className={`w-4 h-4 mr-2 border-2 border-white dark:border-black rounded-sm `}
                  />
                  Client
                </Button>
              </DialogTrigger>
              <DialogContent className=''>
                <div className='   bg-transparent rounded-3xl  '>
                  <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
                    <div>
                      <DialogTitle className='text-2xl font-bold'>
                        Save Client
                      </DialogTitle>
                      <p className='text-sm text-muted-custom'>
                        Save client details
                      </p>
                    </div>
                    <div className='relative'>
                      <Search className='absolute top-2.5 left-3 text-muted-custom' />
                      <input
                        type='text'
                        placeholder='Search'
                        className='pl-10 pr-4 py-2 border rounded-full text-sm'
                      />
                    </div>
                  </div>

                  {/* Hidden file input */}
                  <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept='image/*'
                    style={{ display: "none" }}
                  />

                  {/* Client Name */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1'>
                      Client Name
                    </label>
                    <div className='flex gap-3'>
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Enter client name'
                        className='w-full p-2 pr-10 border rounded-xl text-sm'
                      />
                      <div
                        className='border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors'
                        onClick={handleBookImageClick}
                      >
                        <BookImage className='m-2 text-muted-custom' />
                      </div>
                    </div>

                    {/* Image preview */}
                    {formData.avatar && (
                      <div className='mt-2 relative inline-block'>
                        <Image
                          src={formData.avatar}
                          alt='Client avatar preview'
                          className='w-16 h-16 rounded-lg object-cover border'
                          width={64}
                          height={64}
                        />
                        <button
                          type='button'
                          onClick={() =>
                            setFormData({ ...formData, avatar: "" })
                          }
                          className='absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition-colors'
                          title='Remove image'
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Company ID */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1'>
                      Company ID
                    </label>
                    <input
                      type='text'
                      name='id'
                      value={formData.id}
                      onChange={handleChange}
                      placeholder='Enter company ID (optional - will auto-generate)'
                      className='w-full p-2 border rounded-xl text-sm'
                    />
                  </div>

                  {/* Contact */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1'>
                      Contact
                    </label>
                    <input
                      type='text'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder='Enter phone number'
                      className='w-full p-2 border rounded-xl text-sm'
                    />
                  </div>

                  {/* Email */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1'>
                      Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='Enter email address'
                      className='w-full p-2 border rounded-xl text-sm'
                    />
                  </div>

                  {/* Address */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1'>
                      Address
                    </label>
                    <input
                      type='text'
                      name='address'
                      value={formData.address}
                      onChange={handleChange}
                      placeholder='Enter client address'
                      className='w-full p-2 border rounded-xl text-sm'
                    />
                  </div>

                  {/* Save Button */}
                  <div className='mt-6'>
                    <Button
                      onClick={handleSaveClient}
                      className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl'
                    >
                      Save Client
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <div id='transactions-section'>
        <div className='mb-6'>
          <h2 className='text-lg md:text-xl text-foreground font-bold mb-2'>
            Transactions
          </h2>
          <p className='text-muted-custom  text-xs md:text-base'>
            Add your income transaction&apos;s details
          </p>
        </div>

        {/* Transactions Section */}
        <div className='grid grid-cols-3 gap-6   '>
          <div className='col-span-3 lg:col-span-2 bg-gray-50 dark:bg-[#081524]  border rounded-2xl p-1 md:p-4'>
            <Tabs
              className='bg-transparent overflow-auto mb-3'
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className='gap-3 md:gap-6 bg-transparent h-12 overflow-auto'>
                <TabsTrigger
                  value='Income'
                  className='text-base md:text-xl cursor-pointer border-2 bg-gray-200 dark:bg-border data-[state=active]:bg-transparent dark:data-[state=active]:border-[#34C724] data-[state=active]:border-[#34C724] dark:data-[state=active]:text-[#34C724] data-[state=active]:text-[#34C724]'
                >
                  Income
                </TabsTrigger>
                <TabsTrigger
                  value='Expense'
                  className='text-base md:text-xl cursor-pointer border-2 bg-gray-200 dark:bg-border data-[state=active]:bg-transparent dark:data-[state=active]:border-error data-[state=active]:border-error dark:data-[state=active]:text-error data-[state=active]:text-error'
                >
                  Expense
                </TabsTrigger>
                <TabsTrigger
                  value='Savings'
                  className='text-base md:text-xl cursor-pointer border-2 bg-gray-200 dark:bg-border data-[state=active]:bg-transparent dark:data-[state=active]:border-cyan data-[state=active]:border-cyan dark:data-[state=active]:text-cyan data-[state=active]:text-cyan'
                >
                  Savings
                </TabsTrigger>
              </TabsList>

              <TabsContent value='Income'>
                <TransactionForm type='Income' />
              </TabsContent>
              <TabsContent value='Expense'>
                <TransactionForm type='Expense' />
              </TabsContent>
              <TabsContent value='Savings'>
                <TransactionForm type='Savings' />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Saved Clients */}
          <div className='col-span-3 lg:col-span-1'>
            <Card className='bg-[#FBFBFB] dark:bg-[#081524]'>
              <CardHeader className='flex justify-between'>
                <div className='space-y-3'>
                  <CardTitle className='text-lg md:text-xl text-foreground font-bold mb-2'>
                    Saved Client
                  </CardTitle>
                  <CardDescription className='text-muted-custom  text-xs md:text-base'>
                    Save client details
                  </CardDescription>
                </div>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a1a1a1]' />
                  <Input
                    placeholder='Search...'
                    className='bg-transparent pl-10'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>

              <CardContent className='space-y-1 md:space-y-4 md:max-h-[660px] overflow-y-auto scrollbar-custom'>
                {filteredClients.map((client, index) => (
                  <ClientItem
                    key={index}
                    name={client.name}
                    id={client.id}
                    phone={client.phone}
                    avatar={client.avatar}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
