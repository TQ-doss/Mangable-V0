"use client"

import { Button } from "@/components/ui/button"
import { FileSpreadsheet } from "lucide-react"
import { exportEmployeesToExcel } from "@/lib/export-utils"
import { useState } from "react"

export default function ExportButton() {
  const [loading, setLoading] = useState(false)
  const handleExport = async () => {
    setLoading(true)
    try { await exportEmployeesToExcel() } finally { setLoading(false) }
  }
  return (
    <Button variant="outline" size="sm" onClick={handleExport} disabled={loading}>
      <FileSpreadsheet className="h-4 w-4 mr-2" />
      {loading ? "Exporting..." : "Export Excel"}
    </Button>
  )
}
