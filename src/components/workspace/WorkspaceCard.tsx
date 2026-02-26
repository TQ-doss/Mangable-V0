"use client"

import { Project, employees } from "@/lib/mock-data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock } from "lucide-react"

interface WorkspaceCardProps {
  project: Project
  onClick: () => void
}

export default function WorkspaceCard({ project, onClick }: WorkspaceCardProps) {
  const totalTasks = project.tasks.length
  const doneTasks = project.tasks.filter(t => t.status === 'Done').length
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

  const assignees = Array.from(new Set(project.tasks.map(t => t.assigneeId)))
    .map(id => employees.find(e => e.id === id))
    .filter(Boolean)
    .slice(0, 4)

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 border-l-4"
      style={{ borderLeftColor: project.color }}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-base">{project.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
          </div>
          <Badge variant="outline" className="text-xs shrink-0 ml-2">
            {project.tasks.filter(t => t.status !== 'Done').length} open
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>{doneTasks} of {totalTasks} tasks complete</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {assignees.map(emp => (
              <div
                key={emp!.id}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background text-xs font-bold text-white"
                style={{ backgroundColor: project.color }}
                title={emp!.name}
              >
                {emp!.avatar}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              {doneTasks}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-500" />
              {totalTasks - doneTasks}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
