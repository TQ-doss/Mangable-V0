"use client"

import { useState } from "react"
import { Employee } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface EmployeeTableProps {
  employees: Employee[]
}

const statusVariant: Record<string, "success" | "warning" | "info"> = {
  'Active': 'success',
  'On Leave': 'warning',
  'Remote': 'info',
}

export default function EmployeeTable({ employees }: EmployeeTableProps) {
  const [search, setSearch] = useState("")
  const [deptFilter, setDeptFilter] = useState<string>("All")

  const departments = ["All", ...Array.from(new Set(employees.map(e => e.department)))]

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase())
    const matchDept = deptFilter === "All" || e.department === deptFilter
    return matchSearch && matchDept
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                deptFilter === dept
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Employee</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Department</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Salary</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Performance</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Join Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(emp => (
              <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                      {emp.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{emp.name}</p>
                      <p className="text-xs text-muted-foreground">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{emp.department}</td>
                <td className="px-4 py-3">{emp.role}</td>
                <td className="px-4 py-3 font-medium">${emp.salary.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(emp.performance / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs">{emp.performance}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant[emp.status]}>{emp.status}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{emp.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No employees found</div>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{filtered.length} of {employees.length} employees shown</p>
    </div>
  )
}
