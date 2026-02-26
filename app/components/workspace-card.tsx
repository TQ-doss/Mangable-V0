'use client'

import { Workspace } from "@/app/lib/data"
import { CheckSquare, Clock } from "lucide-react"

interface WorkspaceCardProps {
  workspace: Workspace
}

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-foreground">{workspace.name}</h3>
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
          {workspace.progress}%
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{workspace.description}</p>
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{workspace.progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${workspace.progress}%` }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {workspace.team.map((initials, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full bg-gray-600 text-white text-xs flex items-center justify-center border-2 border-card font-medium"
            >
              {initials}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {workspace.openTasks} open
          </span>
          <span className="flex items-center gap-1">
            <CheckSquare size={12} /> {workspace.doneTasks} done
          </span>
        </div>
      </div>
    </div>
  )
}
