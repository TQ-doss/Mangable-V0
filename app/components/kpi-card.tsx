import { cn } from "@/app/lib/utils"
import { LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
}

export default function KpiCard({ title, value, subtitle, icon: Icon, trend, trendUp }: KpiCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1 text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          {trend && (
            <p className={cn("text-xs mt-2 font-medium", trendUp ? "text-green-500" : "text-red-500")}>
              {trendUp ? "▲" : "▼"} {trend}
            </p>
          )}
        </div>
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon size={20} className="text-primary" />
        </div>
      </div>
    </div>
  )
}
