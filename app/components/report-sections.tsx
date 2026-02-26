'use client'

import { useState } from "react"
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, FileText } from "lucide-react"
import { cn } from "@/app/lib/utils"

interface Section {
  id: string
  title: string
  description: string
}

const initialSections: Section[] = [
  { id: "exec", title: "Executive Summary", description: "High-level overview of HR metrics and key insights" },
  { id: "headcount", title: "Headcount Analysis", description: "Total employees, growth trends, and department breakdown" },
  { id: "performance", title: "Performance Metrics", description: "Employee performance scores, distributions, and highlights" },
  { id: "hiring", title: "Hiring Trends", description: "Recruitment activity, time-to-hire, and pipeline analysis" },
  { id: "dept", title: "Department Breakdown", description: "Staffing levels and metrics per department" },
]

function SortableSection({ section }: { section: Section }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center gap-3 p-3 bg-card border border-border rounded-lg cursor-default",
        isDragging ? "opacity-50 shadow-lg" : "hover:bg-muted/50"
      )}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
        <GripVertical size={16} />
      </button>
      <FileText size={16} className="text-primary flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{section.title}</p>
        <p className="text-xs text-muted-foreground truncate">{section.description}</p>
      </div>
    </div>
  )
}

export default function ReportSections({ onSectionsChange }: { onSectionsChange?: (sections: Section[]) => void }) {
  const [sections, setSections] = useState<Section[]>(initialSections)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        const newItems = arrayMove(items, oldIndex, newIndex)
        onSectionsChange?.(newItems)
        return newItems
      })
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sections} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {sections.map((section) => (
            <SortableSection key={section.id} section={section} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

export { initialSections }
export type { Section }
