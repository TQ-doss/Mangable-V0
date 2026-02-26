'use client'

import { useState } from "react"
import KpiCard from "./components/kpi-card"
import { HiringTrendsChart, PerformancePieChart, HeadcountBarChart } from "./components/charts"
import { employees } from "./lib/data"
import { Users, Briefcase, CheckSquare, TrendingUp, Download, FileSpreadsheet } from "lucide-react"

async function exportToExcel() {
  const ExcelJS = (await import("exceljs")).default
  const workbook = new ExcelJS.Workbook()
  workbook.creator = "Mangable HR"
  workbook.created = new Date()

  const sheet = workbook.addWorksheet("Employees")
  sheet.columns = [
    { header: "Name", key: "name", width: 25 },
    { header: "Department", key: "department", width: 18 },
    { header: "Role", key: "role", width: 25 },
    { header: "Status", key: "status", width: 14 },
    { header: "Performance", key: "performance", width: 14 },
    { header: "Hire Date", key: "hireDate", width: 14 },
  ]

  // Style header row
  const headerRow = sheet.getRow(1)
  headerRow.eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF3B82F6" } }
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } }
    cell.alignment = { vertical: "middle", horizontal: "center" }
  })
  headerRow.height = 24

  employees.forEach((emp) => {
    sheet.addRow({ name: emp.name, department: emp.department, role: emp.role, status: emp.status, performance: `${emp.performance}%`, hireDate: emp.hireDate })
  })

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "mangable-employees.xlsx"
  a.click()
  URL.revokeObjectURL(url)
}

async function exportToPptx() {
  const PptxGenJS = (await import("pptxgenjs")).default
  const pptx = new PptxGenJS()
  pptx.layout = "LAYOUT_WIDE"

  // Slide 1: Title
  const slide1 = pptx.addSlide()
  slide1.background = { color: "1e293b" }
  slide1.addText("Mangable HR Analytics", { x: 1, y: 1.5, w: 10, h: 1.2, fontSize: 40, bold: true, color: "FFFFFF", align: "center" })
  slide1.addText(`Generated ${new Date().toLocaleDateString()}`, { x: 1, y: 3, w: 10, h: 0.5, fontSize: 18, color: "94a3b8", align: "center" })

  // Slide 2: KPIs
  const slide2 = pptx.addSlide()
  slide2.addText("Key Metrics", { x: 0.5, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: "1e293b" })
  const kpis = [
    { label: "Total Employees", value: String(employees.length) },
    { label: "Active", value: String(employees.filter(e => e.status === "Active").length) },
    { label: "Avg Performance", value: `${Math.round(employees.reduce((s, e) => s + e.performance, 0) / employees.length)}%` },
    { label: "Departments", value: String(new Set(employees.map(e => e.department)).size) },
  ]
  kpis.forEach((kpi, i) => {
    const x = 0.5 + i * 3
    slide2.addShape(pptx.ShapeType.rect, { x, y: 1.2, w: 2.7, h: 1.8, fill: { color: "EFF6FF" }, line: { color: "BFDBFE", width: 1 } })
    slide2.addText(kpi.value, { x, y: 1.4, w: 2.7, h: 0.8, fontSize: 32, bold: true, color: "1d4ed8", align: "center" })
    slide2.addText(kpi.label, { x, y: 2.3, w: 2.7, h: 0.5, fontSize: 12, color: "64748b", align: "center" })
  })

  // Slide 3: Employee Table
  const slide3 = pptx.addSlide()
  slide3.addText("Employee Directory", { x: 0.5, y: 0.3, w: 12, h: 0.7, fontSize: 28, bold: true, color: "1e293b" })
  const tableData = [
    [{ text: "Name", options: { bold: true, fill: "3b82f6", color: "FFFFFF" } },
     { text: "Department", options: { bold: true, fill: "3b82f6", color: "FFFFFF" } },
     { text: "Role", options: { bold: true, fill: "3b82f6", color: "FFFFFF" } },
     { text: "Status", options: { bold: true, fill: "3b82f6", color: "FFFFFF" } },
     { text: "Performance", options: { bold: true, fill: "3b82f6", color: "FFFFFF" } }],
    ...employees.slice(0, 10).map(e => [
      { text: e.name }, { text: e.department }, { text: e.role }, { text: e.status }, { text: `${e.performance}%` }
    ])
  ]
  slide3.addTable(tableData as Parameters<typeof slide3.addTable>[0], { x: 0.5, y: 1.2, w: 12, fontSize: 10 })

  await pptx.writeFile({ fileName: "mangable-report.pptx" })
}

export default function DashboardPage() {
  const [exporting, setExporting] = useState<"excel" | "pptx" | null>(null)
  const activeEmployees = employees.filter(e => e.status === "Active").length
  const avgPerf = Math.round(employees.reduce((s, e) => s + e.performance, 0) / employees.length)

  async function handleExcelExport() {
    setExporting("excel")
    try { await exportToExcel() } finally { setExporting(null) }
  }

  async function handlePptxExport() {
    setExporting("pptx")
    try { await exportToPptx() } finally { setExporting(null) }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExcelExport}
            disabled={exporting !== null}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            <FileSpreadsheet size={16} />
            {exporting === "excel" ? "Exporting..." : "Export Excel"}
          </button>
          <button
            onClick={handlePptxExport}
            disabled={exporting !== null}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            <Download size={16} />
            {exporting === "pptx" ? "Exporting..." : "Export PowerPoint"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Headcount" value={employees.length} subtitle="All employees" icon={Users} trend="2 this month" trendUp />
        <KpiCard title="Active Projects" value={6} subtitle="Across all teams" icon={Briefcase} trend="1 new" trendUp />
        <KpiCard title="Open Tasks" value={50} subtitle="Pending completion" icon={CheckSquare} trend="3 overdue" trendUp={false} />
        <KpiCard title="Avg Performance" value={`${avgPerf}%`} subtitle={`${activeEmployees} active employees`} icon={TrendingUp} trend="2% vs last quarter" trendUp />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Hiring Trends (Last 6 Months)</h2>
          <HiringTrendsChart />
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Performance Distribution</h2>
          <PerformancePieChart />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="text-base font-semibold text-foreground mb-4">Headcount by Department</h2>
        <HeadcountBarChart />
      </div>
    </div>
  )
}
