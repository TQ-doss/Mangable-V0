import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface KPICardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
  iconColor: string
  iconBg: string
}

export default function KPICard({
  title, value, change, changeType = "neutral",
  icon: Icon, iconColor, iconBg
}: KPICardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            {change && (
              <p className={cn("text-xs mt-2 font-medium", {
                "text-emerald-600 dark:text-emerald-400": changeType === "positive",
                "text-red-600 dark:text-red-400": changeType === "negative",
                "text-muted-foreground": changeType === "neutral",
              })}>
                {change}
              </p>
            )}
          </div>
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", iconBg)}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
