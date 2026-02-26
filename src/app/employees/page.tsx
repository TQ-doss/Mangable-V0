import Header from "@/components/layout/Header"
import EmployeeTable from "@/components/hr/EmployeeTable"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { employees } from "@/lib/mock-data"
import { UserPlus } from "lucide-react"
import ExportButton from "@/components/hr/ExportButton"

export default function EmployeesPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Employee Directory" description="Manage and view all employees" />
      <div className="flex-1 overflow-auto p-6 space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{employees.length} total employees</p>
          <div className="flex gap-2">
            <ExportButton />
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>
        <Card>
          <CardContent className="p-4">
            <EmployeeTable employees={employees} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
