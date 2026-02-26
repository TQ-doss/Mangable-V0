'use client'

import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { workspaces as initialWorkspaces, Workspace } from "@/app/lib/data"
import WorkspaceCard from "@/app/components/workspace-card"
import { Plus, X } from "lucide-react"

export default function WorkspacesPage() {
  const [workspaceList, setWorkspaceList] = useState<Workspace[]>(initialWorkspaces)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  function handleCreate() {
    if (!name.trim()) return
    const newWs: Workspace = {
      id: String(Date.now()),
      name: name.trim(),
      description: description.trim() || "No description provided.",
      progress: 0,
      team: ["ME"],
      openTasks: 0,
      doneTasks: 0,
    }
    setWorkspaceList((prev) => [newWs, ...prev])
    setName("")
    setDescription("")
    setOpen(false)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Workspaces</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your project workspaces and teams.</p>
        </div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              <Plus size={16} /> New Workspace
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-foreground">New Workspace</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="text-muted-foreground hover:text-foreground transition-colors"><X size={18} /></button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="text-sm text-muted-foreground mb-4">Create a new project workspace for your team.</Dialog.Description>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Workspace Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Q1 Hiring Sprint"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the workspace goals..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Dialog.Close asChild>
                    <button className="flex-1 px-4 py-2 text-sm border border-border rounded-lg text-foreground hover:bg-muted transition-colors">Cancel</button>
                  </Dialog.Close>
                  <button
                    onClick={handleCreate}
                    disabled={!name.trim()}
                    className="flex-1 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    Create Workspace
                  </button>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspaceList.map((ws) => (
          <WorkspaceCard key={ws.id} workspace={ws} />
        ))}
      </div>
    </div>
  )
}
