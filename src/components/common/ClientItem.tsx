import { ChevronRight, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

export function ClientItem({
  name,
  id,
  phone,
  avatar,
}: {
  name: string;
  id: string;
  phone: string;
  avatar: string;
}) {
  return (
    <div className='flex flex-col bg-muted dark:bg-[#03032D]  space-y-2 md:space-y-6 p-3 rounded-2xl'>
      <div className='flex items-center gap-3'>
        <Avatar className={`w-10 h-10 `}>
          <AvatarImage src={avatar} alt={name} className='object-cover' />
          <AvatarFallback className='text-white font-semibold'>
            {name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className='font-medium text-base md:text-xl'>{name}</h4>
          <p className='text-sm text-muted-custom'>ID: {id}</p>
        </div>
      </div>
      <Separator />
      <div className='flex justify-between items-center pl-2'>
        <div className='flex items-center gap-1 text-base text-gray-400 mb-1'>
          <Phone className='w-4 h-4 font-bold mr-1 dark:text-white' />
          {phone}
        </div>
        <Button
          variant='ghost'
          size='sm'
          className='cursor-pointer hover:bg-transparent p-0 h-auto'
        >
          See details
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
