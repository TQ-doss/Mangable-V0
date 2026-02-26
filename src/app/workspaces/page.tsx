"use client"

import { useState } from "react"
import Header from "@/components/layout/Header"
import WorkspaceCard from "@/components/workspace/WorkspaceCard"
import TaskList from "@/components/workspace/TaskList"
import { projects, Project } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, ArrowLeft } from "lucide-react"

export default function WorkspacesPage() {
  const [allProjects, setAllProjects] = useState<Project[]>(projects)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState("")
  const [newDesc, setNewDesc] = useState("")

  const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#f43f5e']

  const handleCreate = () => {
    if (!newName.trim()) return
    const newProject: Project = {
      id: `p${Date.now()}`,
      name: newName,
      description: newDesc,
      color: colors[allProjects.length % colors.length],
      tasks: [],
      createdAt: new Date().toISOString().split('T')[0],
    }
    setAllProjects(prev => [...prev, newProject])
    setNewName("")
    setNewDesc("")
    setShowCreate(false)
  }

  if (selectedProject) {
    return (
      <div className="flex flex-col h-full">
        <Header
          title={selectedProject.name}
          description={selectedProject.description}
        />
        <div className="flex-1 overflow-auto p-6">
          <Button variant="ghost" size="sm" onClick={() => setSelectedProject(null)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Workspaces
          </Button>
          <TaskList tasks={selectedProject.tasks} projectColor={selectedProject.color} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="Workspaces" description="Manage projects and team tasks" />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{allProjects.length} workspaces</p>
          <Button size="sm" onClick={() => setShowCreate(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Workspace
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {allProjects.map(project => (
            <WorkspaceCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Workspace</DialogTitle>
            <DialogDescription>Set up a new project workspace for your team</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace Name</Label>
              <Input
                id="name"
                placeholder="e.g. Q2 Product Launch"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Input
                id="desc"
                placeholder="Brief description of the project"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!newName.trim()}>Create Workspace</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
