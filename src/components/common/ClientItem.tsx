import { Phone } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback } from "../ui/avatar"

export function ClientItem({
  name,
  id,
  phone,
  avatar,
  color,
}: {
  name: string
  id: string
  phone: string
  avatar: string
  color: string
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-[#08022e]">
      <div className="flex items-center gap-3">
        <Avatar className={`w-10 h-10 ${color}`}>
          <AvatarFallback className="text-white font-semibold">{avatar}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-[#a1a1a1]">ID: {id}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1 text-sm text-[#a1a1a1] mb-1">
          <Phone className="w-3 h-3" />
          {phone}
        </div>
        <Button variant="ghost" size="sm" className="text-[#02dbd6] hover:bg-[#141440] p-0 h-auto">
          See details →
        </Button>
      </div>
    </div>
  )
}