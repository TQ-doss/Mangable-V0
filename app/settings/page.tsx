'use client'

import { useState } from "react"
import ThemeSwitcher from "@/app/components/theme-switcher"
import { Save, User } from "lucide-react"

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: "Admin User",
    email: "admin@mangable.com",
    title: "HR Director",
    department: "Human Resources",
  })

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your preferences and profile.</p>
      </div>

      {/* Theme */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="text-base font-semibold text-foreground mb-1">Appearance</h2>
        <p className="text-sm text-muted-foreground mb-4">Choose your preferred color theme.</p>
        <ThemeSwitcher />
      </div>

      {/* Profile */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <User size={18} className="text-primary" />
          <h2 className="text-base font-semibold text-foreground">Profile</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: "name", label: "Full Name" },
            { key: "email", label: "Email Address", type: "email" },
            { key: "title", label: "Job Title" },
            { key: "department", label: "Department" },
          ].map(({ key, label, type }) => (
            <div key={key}>
              <label className="text-sm font-medium text-foreground block mb-1.5">{label}</label>
              <input
                type={type || "text"}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}
        </div>
        <div className="mt-5">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all"
          >
            <Save size={14} />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}
