'use client'

import { useState } from "react"
import ReportSections, { Section, initialSections } from "@/app/components/report-sections"
import { FileDown, RefreshCw, FileText } from "lucide-react"
import { employees, headcountByDept } from "@/app/lib/data"

export default function ReportBuilderPage() {
  const [sections, setSections] = useState<Section[]>(initialSections)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  async function handleGenerate() {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 1200))
    setGenerating(false)
    setGenerated(true)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Report Builder</h1>
        <p className="text-muted-foreground text-sm mt-1">Drag to reorder sections, then generate your custom report.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sections panel */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-base font-semibold text-foreground mb-1">Report Sections</h2>
          <p className="text-xs text-muted-foreground mb-4">Drag to reorder sections in your report.</p>
          <ReportSections onSectionsChange={setSections} />
          <div className="flex gap-2 mt-5">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <RefreshCw size={14} className={generating ? "animate-spin" : ""} />
              {generating ? "Generating..." : "Generate Report"}
            </button>
            <button
              disabled={!generated}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border text-foreground rounded-lg hover:bg-muted disabled:opacity-50 transition-colors"
            >
              <FileDown size={14} />
              Export
            </button>
          </div>
        </div>

        {/* Preview panel */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Live Preview</h2>
          {generated ? (
            <div className="space-y-4 text-sm">
              {sections.map((section, i) => (
                <div key={section.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">{i + 1}</span>
                    <h3 className="font-semibold text-foreground">{section.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-xs mb-2">{section.description}</p>
                  {section.id === "headcount" && (
                    <div className="mt-2 space-y-1">
                      {headcountByDept.map(d => (
                        <div key={d.dept} className="flex items-center gap-2">
                          <span className="text-xs w-24 text-muted-foreground">{d.dept}</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${(d.count / 4) * 100}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground w-4">{d.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.id === "exec" && (
                    <p className="text-xs text-muted-foreground">Total workforce: {employees.length} employees across {new Set(employees.map(e => e.department)).size} departments. Average performance score: {Math.round(employees.reduce((s, e) => s + e.performance, 0) / employees.length)}%.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <FileText size={40} className="mb-3 opacity-30" />
              <p className="text-sm">Click &quot;Generate Report&quot; to preview your report</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
