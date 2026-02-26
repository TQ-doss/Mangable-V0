"use client"

import { useState } from "react"
import Header from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Eye, Download, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReportSection {
  id: string
  title: string
  type: "kpi" | "chart" | "table" | "text"
  description: string
  included: boolean
}

const initialSections: ReportSection[] = [
  { id: "s1", title: "Executive Summary", type: "text", description: "Key highlights and overview", included: true },
  { id: "s2", title: "KPI Dashboard", type: "kpi", description: "Total employees, projects, performance metrics", included: true },
  { id: "s3", title: "Hiring Trends Chart", type: "chart", description: "12-month hiring and departure trends", included: true },
  { id: "s4", title: "Department Headcount", type: "chart", description: "Employee distribution by department", included: true },
  { id: "s5", title: "Performance Distribution", type: "chart", description: "Performance score breakdown pie chart", included: false },
  { id: "s6", title: "Employee Directory Table", type: "table", description: "Full employee listing with details", included: true },
  { id: "s7", title: "Project Status Overview", type: "table", description: "All active projects and completion rates", included: false },
  { id: "s8", title: "Compensation Analysis", type: "chart", description: "Salary distribution by department", included: false },
]

function SortableSection({ section, onToggle }: { section: ReportSection; onToggle: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }

  const typeColors: Record<string, string> = {
    kpi: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    chart: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    table: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    text: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg border bg-card transition-all",
        section.included ? 'border-primary/30' : 'opacity-60'
      )}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
        <GripVertical className="h-5 w-5" />
      </button>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm">{section.title}</p>
          <span className={cn("px-2 py-0.5 text-xs rounded-full font-medium", typeColors[section.type])}>
            {section.type}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
      </div>
      <button
        onClick={onToggle}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          section.included
            ? 'bg-primary/10 text-primary hover:bg-primary/20'
            : 'bg-muted text-muted-foreground hover:bg-muted/70'
        )}
      >
        {section.included ? <Eye className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </button>
    </div>
  )
}

export default function ReportBuilderPage() {
  const [sections, setSections] = useState<ReportSection[]>(initialSections)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active.id !== over?.id) {
      setSections(items => {
        const oldIndex = items.findIndex(i => i.id === active.id)
        const newIndex = items.findIndex(i => i.id === over!.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const toggleSection = (id: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, included: !s.included } : s))
  }

  const includedCount = sections.filter(s => s.included).length

  return (
    <div className="flex flex-col h-full">
      <Header title="Report Builder" description="Customize and export your HR reports" />
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Report Sections</h2>
                <p className="text-sm text-muted-foreground">Drag to reorder, click eye to include/exclude</p>
              </div>
              <Badge variant="outline">{includedCount} sections included</Badge>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={sections} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {sections.map(section => (
                    <SortableSection
                      key={section.id}
                      section={section}
                      onToggle={() => toggleSection(section.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold">Report Preview</h2>
            <Card className="border-2 border-dashed">
              <CardHeader>
                <CardTitle className="text-base">HR Analytics Report</CardTitle>
                <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {sections.filter(s => s.included).map((section, i) => (
                  <div key={section.id} className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground text-xs w-5">{i + 1}.</span>
                    <span>{section.title}</span>
                  </div>
                ))}
                {includedCount === 0 && (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    No sections selected
                  </p>
                )}
              </CardContent>
            </Card>

            <Button className="w-full" disabled={includedCount === 0}>
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" className="w-full">
              Preview Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
