'use client'

import { useState } from "react"
import { employees, Employee } from "@/app/lib/data"
import { Search } from "lucide-react"
import { cn } from "@/app/lib/utils"

const departments = ["All", "Engineering", "Marketing", "HR", "Design", "Sales", "Finance"]

const statusColors: Record<Employee["status"], string> = {
  Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "On Leave": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Terminated: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export default function EmployeeTable() {
  const [search, setSearch] = useState("")
  const [dept, setDept] = useState("All")

  const filtered = employees.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase())
    const matchDept = dept === "All" || e.department === dept
    return matchSearch && matchDept
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>
      <div className="border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Department</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Performance</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp, i) => (
              <tr key={emp.id} className={cn("border-t border-border hover:bg-muted/50 transition-colors", i % 2 === 0 ? "" : "bg-muted/20")}>
                <td className="px-4 py-3 font-medium text-foreground">{emp.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{emp.department}</td>
                <td className="px-4 py-3 text-muted-foreground">{emp.role}</td>
                <td className="px-4 py-3">
                  <span className={cn("px-2 py-1 rounded-full text-xs font-medium", statusColors[emp.status])}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", emp.performance >= 90 ? "bg-green-500" : emp.performance >= 75 ? "bg-blue-500" : "bg-yellow-500")}
                        style={{ width: `${emp.performance}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{emp.performance}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No employees found</div>
        )}
      </div>
    </div>
  )
}
