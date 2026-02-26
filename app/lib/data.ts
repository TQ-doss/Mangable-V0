export interface Employee {
  id: string
  name: string
  department: string
  role: string
  status: "Active" | "On Leave" | "Terminated"
  performance: number // 0-100
  hireDate: string
}

export interface Workspace {
  id: string
  name: string
  description: string
  progress: number
  team: string[] // initials
  openTasks: number
  doneTasks: number
}

export const employees: Employee[] = [
  { id: "1", name: "Alice Johnson", department: "Engineering", role: "Senior Engineer", status: "Active", performance: 92, hireDate: "2021-03-15" },
  { id: "2", name: "Bob Martinez", department: "Marketing", role: "Marketing Manager", status: "Active", performance: 78, hireDate: "2020-07-22" },
  { id: "3", name: "Carol White", department: "HR", role: "HR Specialist", status: "On Leave", performance: 85, hireDate: "2019-11-01" },
  { id: "4", name: "David Lee", department: "Engineering", role: "Frontend Developer", status: "Active", performance: 88, hireDate: "2022-01-10" },
  { id: "5", name: "Eva Chen", department: "Design", role: "UX Designer", status: "Active", performance: 95, hireDate: "2021-08-05" },
  { id: "6", name: "Frank Brown", department: "Sales", role: "Sales Rep", status: "Active", performance: 72, hireDate: "2020-04-18" },
  { id: "7", name: "Grace Kim", department: "Engineering", role: "Backend Developer", status: "Active", performance: 90, hireDate: "2021-06-28" },
  { id: "8", name: "Henry Davis", department: "Finance", role: "Financial Analyst", status: "Terminated", performance: 65, hireDate: "2018-09-12" },
  { id: "9", name: "Iris Taylor", department: "Marketing", role: "Content Strategist", status: "Active", performance: 82, hireDate: "2022-03-20" },
  { id: "10", name: "Jack Wilson", department: "Sales", role: "Sales Manager", status: "Active", performance: 87, hireDate: "2019-05-30" },
  { id: "11", name: "Karen Moore", department: "HR", role: "HR Manager", status: "Active", performance: 91, hireDate: "2017-12-01" },
  { id: "12", name: "Liam Anderson", department: "Design", role: "Graphic Designer", status: "On Leave", performance: 76, hireDate: "2022-07-14" },
  { id: "13", name: "Mia Thomas", department: "Engineering", role: "DevOps Engineer", status: "Active", performance: 89, hireDate: "2021-02-22" },
  { id: "14", name: "Noah Jackson", department: "Finance", role: "CFO", status: "Active", performance: 94, hireDate: "2016-08-08" },
  { id: "15", name: "Olivia Harris", department: "Design", role: "Product Designer", status: "Active", performance: 86, hireDate: "2022-10-03" },
]

export const workspaces: Workspace[] = [
  { id: "1", name: "Q4 Hiring Sprint", description: "Recruit 10 engineers for Q4 expansion", progress: 65, team: ["AJ", "KM", "CB"], openTasks: 8, doneTasks: 14 },
  { id: "2", name: "Brand Refresh", description: "Update company brand guidelines and assets", progress: 40, team: ["EC", "LA", "OH"], openTasks: 12, doneTasks: 7 },
  { id: "3", name: "Performance Review Cycle", description: "Annual performance reviews for all departments", progress: 80, team: ["CW", "KM"], openTasks: 4, doneTasks: 18 },
  { id: "4", name: "Sales Dashboard", description: "Build real-time sales metrics dashboard", progress: 55, team: ["DL", "GM", "MT"], openTasks: 9, doneTasks: 11 },
  { id: "5", name: "Employee Onboarding", description: "Revamp onboarding process and materials", progress: 90, team: ["KM", "CW", "AJ"], openTasks: 2, doneTasks: 21 },
  { id: "6", name: "Finance Audit Prep", description: "Prepare documents for annual financial audit", progress: 30, team: ["HD", "NJ"], openTasks: 15, doneTasks: 5 },
]

export const hiringTrends = [
  { month: "Jan", hires: 3 },
  { month: "Feb", hires: 5 },
  { month: "Mar", hires: 2 },
  { month: "Apr", hires: 8 },
  { month: "May", hires: 6 },
  { month: "Jun", hires: 4 },
]

export const performanceDistribution = [
  { name: "Excellent (90+)", value: 5 },
  { name: "Good (75-89)", value: 7 },
  { name: "Needs Improvement (<75)", value: 3 },
]

export const headcountByDept = [
  { dept: "Engineering", count: 4 },
  { dept: "Marketing", count: 2 },
  { dept: "HR", count: 2 },
  { dept: "Design", count: 3 },
  { dept: "Sales", count: 2 },
  { dept: "Finance", count: 2 },
]
