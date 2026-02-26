import EmployeeTable from "@/app/components/employee-table"

export default function EmployeesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Employee Directory</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage and view all employees across departments.</p>
      </div>
      <EmployeeTable />
    </div>
  )
}
