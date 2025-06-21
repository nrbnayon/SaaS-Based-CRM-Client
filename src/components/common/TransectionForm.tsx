import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { Calendar } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import FileUpload from '../ui/file-upload'


export const TransectionForm = () => {
   const handleFileSelect = (file: File) => {
    console.log('Selected file:', file);
    // Handle the selected file here
    // You can upload it to your server, process it, etc.
  };
  return (
    <div>
        <Card className="bg-transparent">
                <CardHeader>
                  <CardTitle className="text-lg md:text-2xl">Add Income Details</CardTitle>
                  <CardDescription className="text-[#a1a1a1] text-xs md:text-sm">
                    Let&apos;s take a moment to add your income so we can better understand your financial situation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm md:text-base font-medium mb-2">Income Source</label>
                      <Select>
                        <SelectTrigger className="bg-transparenttext-sm md:text-base border-border w-full ">
                          <SelectValue placeholder="Select a source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salary">Salary</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm md:text-base font-medium mb-2">Contact</label>
                      <Input placeholder="0024654584" className="bg-transparenttext-sm md:text-base border-border " />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm md:text-base font-medium mb-2">Client Name / Company</label>
                      <Input placeholder="Enter client or company name" className="bg-transparenttext-sm md:text-base border-border " />
                    </div>
                    <div>
                      <label className="block text-sm md:text-base font-medium mb-2">Received Date</label>
                      <div className="relative">
                        <Input  readOnly className="bg-transparenttext-sm md:text-base border-border  pr-10" />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a1a1a1]" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='grid grid-cols-2 gap-4'>
                        <div >
                            <label className="block text-sm md:text-base font-medium mb-2">Amount</label>
                            <Input placeholder="00.00" className="bg-transparenttext-sm md:text-base border-border " />
                            </div>
                            <div>
                            <label className="block text-sm md:text-base font-medium mb-2">Payment Method</label>
                            <Select>
                                <SelectTrigger className="bg-transparenttext-sm md:text-base border-border w-full ">
                                <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="card">Card</SelectItem>
                                <SelectItem value="transfer">Transfer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                      <label className="block text-sm md:text-base font-medium mb-2">Income Categories</label>
                      <Select>
                        <SelectTrigger className="bg-transparenttext-sm md:text-base border-border  w-full">
                          <SelectValue placeholder="Select one" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary Income</SelectItem>
                          <SelectItem value="secondary">Secondary Income</SelectItem>
                          <SelectItem value="passive">Passive Income</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-sm md:text-base font-medium mb-2">Upload Proof (optional)</label>
                        <div className=''>
                            <FileUpload
                                        onFileSelect={handleFileSelect}
                                        maxFileSizeMB={50}
                                        acceptedFileTypes={['.pdf', '.jpg', '.png', '.doc', '.docx']}
                                        />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm md:text-base font-medium mb-2">Notes</label>
                        <Textarea
                                    placeholder="Add any additional details about this income..."
                                    className="bg-transparenttext-sm md:text-base border-border h-20 md:h-28"
                                    />
                    </div>
                  </div>
                </CardContent>
              </Card>
    </div>
  )
}
