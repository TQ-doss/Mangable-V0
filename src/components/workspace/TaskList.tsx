"use client"

import { useState } from "react"
import { Task, employees, Priority, TaskStatus } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface TaskListProps {
  tasks: Task[]
  projectColor: string
}

const priorityColors: Record<Priority, string> = {
  Low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  Medium: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  Critical: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
}

const statusColors: Record<TaskStatus, string> = {
  Todo: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Review: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  Done: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
}

export default function TaskList({ tasks, projectColor }: TaskListProps) {
  const [filter, setFilter] = useState<TaskStatus | "All">("All")

  const filtered = filter === "All" ? tasks : tasks.filter(t => t.status === filter)
  const statuses: (TaskStatus | "All")[] = ["All", "Todo", "In Progress", "Review", "Done"]

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5 flex-wrap">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "px-2.5 py-1 text-xs rounded-md font-medium transition-colors",
              filter === s
                ? "text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            )}
            style={filter === s ? { backgroundColor: projectColor } : {}}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(task => {
          const assignee = employees.find(e => e.id === task.assigneeId)
          return (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow"
            >
              <div
                className={cn("h-2 w-2 rounded-full shrink-0",
                  task.status === 'Done' ? "bg-emerald-500" :
                  task.status === 'In Progress' ? "bg-blue-500" :
                  task.status === 'Review' ? "bg-amber-500" : "bg-slate-400"
                )}
              />
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium truncate", task.status === 'Done' && "line-through text-muted-foreground")}>
                  {task.title}
                </p>
                <p className="text-xs text-muted-foreground">Due {task.dueDate}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={cn("px-2 py-0.5 text-xs rounded-full font-medium", priorityColors[task.priority])}>
                  {task.priority}
                </span>
                <span className={cn("px-2 py-0.5 text-xs rounded-full font-medium", statusColors[task.status])}>
                  {task.status}
                </span>
                {assignee && (
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: projectColor }}
                    title={assignee.name}
                  >
                    {assignee.avatar}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
