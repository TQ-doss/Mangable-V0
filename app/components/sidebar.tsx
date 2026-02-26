'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Briefcase, FileBarChart, Settings } from "lucide-react"
import { cn } from "@/app/lib/utils"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/workspaces", label: "Workspaces", icon: Briefcase },
  { href: "/report-builder", label: "Report Builder", icon: FileBarChart },
  { href: "/settings", label: "Settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col h-full flex-shrink-0">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">M</div>
          <span className="text-xl font-bold text-white">Mangable</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">HR Analytics Hub</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname === href
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-xs font-medium">AJ</div>
          <div>
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-400">admin@mangable.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
