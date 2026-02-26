"use client"

import { useState, useEffect } from "react"
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"
import { Users, FolderKanban, TrendingUp, Star, FileSpreadsheet, Presentation } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import KPICard from "@/components/hr/KPICard"
import Header from "@/components/layout/Header"
import { employees, projects, hiringTrends } from "@/lib/mock-data"
import { exportEmployeesToExcel, exportDashboardToPowerPoint } from "@/lib/export-utils"

const DEPT_COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6']

export default function DashboardPage() {
  const [exporting, setExporting] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const deptCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const deptData = Object.entries(deptCounts).map(([name, count]) => ({ name, count }))

  const perfDist = [
    { name: '5.0 ⭐', value: employees.filter(e => e.performance >= 4.8).length },
    { name: '4.0-4.7', value: employees.filter(e => e.performance >= 4.0 && e.performance < 4.8).length },
    { name: '3.5-3.9', value: employees.filter(e => e.performance >= 3.5 && e.performance < 4.0).length },
    { name: 'Below 3.5', value: employees.filter(e => e.performance < 3.5).length },
  ]

  const avgPerformance = (employees.reduce((sum, e) => sum + e.performance, 0) / employees.length).toFixed(1)
  const activeProjects = projects.length
  const openTasks = projects.flatMap(p => p.tasks).filter(t => t.status !== 'Done').length

  const handleExcelExport = async () => {
    setExporting('excel')
    try { exportEmployeesToExcel() } finally { setExporting(null) }
  }

  const handlePPTExport = async () => {
    setExporting('ppt')
    try { await exportDashboardToPowerPoint() } finally { setExporting(null) }
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="HR Analytics Dashboard" description="Executive overview of workforce and projects" />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="flex gap-3 justify-end">
          <Button variant="outline" size="sm" onClick={handleExcelExport} disabled={exporting === 'excel'}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            {exporting === 'excel' ? 'Exporting...' : 'Export Excel'}
          </Button>
          <Button variant="outline" size="sm" onClick={handlePPTExport} disabled={exporting === 'ppt'}>
            <Presentation className="h-4 w-4 mr-2" />
            {exporting === 'ppt' ? 'Exporting...' : 'Export PowerPoint'}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Employees"
            value={employees.length}
            change="+2 this month"
            changeType="positive"
            icon={Users}
            iconColor="text-indigo-600"
            iconBg="bg-indigo-100 dark:bg-indigo-950"
          />
          <KPICard
            title="Active Projects"
            value={activeProjects}
            change="5 in progress"
            changeType="neutral"
            icon={FolderKanban}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-100 dark:bg-emerald-950"
          />
          <KPICard
            title="Open Tasks"
            value={openTasks}
            change="Across all projects"
            changeType="neutral"
            icon={TrendingUp}
            iconColor="text-amber-600"
            iconBg="bg-amber-100 dark:bg-amber-950"
          />
          <KPICard
            title="Avg Performance"
            value={`${avgPerformance}/5`}
            change="+0.2 vs last quarter"
            changeType="positive"
            icon={Star}
            iconColor="text-pink-600"
            iconBg="bg-pink-100 dark:bg-pink-950"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Hiring Trends</CardTitle>
              <CardDescription>Monthly hires and departures over the past 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              {mounted && (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={hiringTrends} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorDepartures" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                  <Legend />
                  <Area type="monotone" dataKey="hires" stroke="#6366f1" strokeWidth={2} fill="url(#colorHires)" name="Hires" />
                  <Area type="monotone" dataKey="departures" stroke="#ec4899" strokeWidth={2} fill="url(#colorDepartures)" name="Departures" />
                </AreaChart>
              </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Distribution</CardTitle>
              <CardDescription>Employee performance scores breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              {mounted && (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={perfDist}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {perfDist.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={DEPT_COLORS[index % DEPT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="circle" iconSize={8} />
                </PieChart>
              </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Headcount by Department</CardTitle>
            <CardDescription>Current employee distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            {mounted && (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={deptData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                <Bar dataKey="count" name="Employees" radius={[4, 4, 0, 0]}>
                  {deptData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={DEPT_COLORS[index % DEPT_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
