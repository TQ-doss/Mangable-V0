export type Department = 'Engineering' | 'Marketing' | 'Sales' | 'HR' | 'Finance' | 'Design';
export type EmployeeStatus = 'Active' | 'On Leave' | 'Remote';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TaskStatus = 'Todo' | 'In Progress' | 'Review' | 'Done';

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: Department;
  role: string;
  salary: number;
  performance: number; // 1-5
  status: EmployeeStatus;
  joinDate: string;
  avatar: string; // initials
}

export interface Task {
  id: string;
  title: string;
  assigneeId: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  tasks: Task[];
  createdAt: string;
}

export const employees: Employee[] = [
  { id: 'e1', name: 'Alice Johnson', email: 'alice@company.com', department: 'Engineering', role: 'Senior Engineer', salary: 120000, performance: 4.8, status: 'Active', joinDate: '2021-03-15', avatar: 'AJ' },
  { id: 'e2', name: 'Bob Martinez', email: 'bob@company.com', department: 'Engineering', role: 'Backend Developer', salary: 95000, performance: 4.2, status: 'Active', joinDate: '2022-01-10', avatar: 'BM' },
  { id: 'e3', name: 'Carol White', email: 'carol@company.com', department: 'Marketing', role: 'Marketing Manager', salary: 88000, performance: 4.5, status: 'Active', joinDate: '2020-07-22', avatar: 'CW' },
  { id: 'e4', name: 'David Lee', email: 'david@company.com', department: 'Sales', role: 'Account Executive', salary: 75000, performance: 3.8, status: 'Active', joinDate: '2022-06-01', avatar: 'DL' },
  { id: 'e5', name: 'Eva Chen', email: 'eva@company.com', department: 'Design', role: 'UI/UX Designer', salary: 92000, performance: 4.7, status: 'Active', joinDate: '2021-11-08', avatar: 'EC' },
  { id: 'e6', name: 'Frank Brown', email: 'frank@company.com', department: 'HR', role: 'HR Business Partner', salary: 78000, performance: 4.0, status: 'Active', joinDate: '2020-04-14', avatar: 'FB' },
  { id: 'e7', name: 'Grace Kim', email: 'grace@company.com', department: 'Finance', role: 'Financial Analyst', salary: 85000, performance: 4.3, status: 'On Leave', joinDate: '2021-09-20', avatar: 'GK' },
  { id: 'e8', name: 'Henry Davis', email: 'henry@company.com', department: 'Engineering', role: 'DevOps Engineer', salary: 110000, performance: 4.6, status: 'Remote', joinDate: '2021-05-03', avatar: 'HD' },
  { id: 'e9', name: 'Isabella Wilson', email: 'isabella@company.com', department: 'Marketing', role: 'Content Strategist', salary: 72000, performance: 3.9, status: 'Active', joinDate: '2023-02-14', avatar: 'IW' },
  { id: 'e10', name: 'James Taylor', email: 'james@company.com', department: 'Sales', role: 'Sales Director', salary: 135000, performance: 4.9, status: 'Active', joinDate: '2019-11-30', avatar: 'JT' },
  { id: 'e11', name: 'Karen Anderson', email: 'karen@company.com', department: 'Design', role: 'Brand Designer', salary: 82000, performance: 4.1, status: 'Active', joinDate: '2022-08-17', avatar: 'KA' },
  { id: 'e12', name: 'Liam Thomas', email: 'liam@company.com', department: 'Engineering', role: 'Frontend Developer', salary: 98000, performance: 4.4, status: 'Remote', joinDate: '2022-03-07', avatar: 'LT' },
  { id: 'e13', name: 'Mia Jackson', email: 'mia@company.com', department: 'Finance', role: 'CFO', salary: 185000, performance: 5.0, status: 'Active', joinDate: '2018-06-01', avatar: 'MJ' },
  { id: 'e14', name: 'Noah Harris', email: 'noah@company.com', department: 'HR', role: 'Recruiter', salary: 65000, performance: 3.7, status: 'Active', joinDate: '2023-05-22', avatar: 'NH' },
  { id: 'e15', name: 'Olivia Martin', email: 'olivia@company.com', department: 'Engineering', role: 'Engineering Manager', salary: 145000, performance: 4.8, status: 'Active', joinDate: '2020-01-15', avatar: 'OM' },
];

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Platform Redesign',
    description: 'Complete overhaul of the main platform UI/UX',
    color: '#6366f1',
    createdAt: '2024-01-15',
    tasks: [
      { id: 't1', title: 'Design new navigation system', assigneeId: 'e5', priority: 'High', status: 'Done', dueDate: '2024-02-01' },
      { id: 't2', title: 'Implement responsive layouts', assigneeId: 'e12', priority: 'High', status: 'In Progress', dueDate: '2024-02-15' },
      { id: 't3', title: 'User testing sessions', assigneeId: 'e5', priority: 'Medium', status: 'Todo', dueDate: '2024-03-01' },
      { id: 't4', title: 'Performance optimization', assigneeId: 'e1', priority: 'Critical', status: 'In Progress', dueDate: '2024-02-20' },
    ]
  },
  {
    id: 'p2',
    name: 'Q1 Marketing Campaign',
    description: 'Launch Q1 digital marketing campaign across all channels',
    color: '#ec4899',
    createdAt: '2024-01-10',
    tasks: [
      { id: 't5', title: 'Content calendar creation', assigneeId: 'e9', priority: 'High', status: 'Done', dueDate: '2024-01-20' },
      { id: 't6', title: 'Social media strategy', assigneeId: 'e3', priority: 'Medium', status: 'Done', dueDate: '2024-01-25' },
      { id: 't7', title: 'Email campaign setup', assigneeId: 'e3', priority: 'Medium', status: 'In Progress', dueDate: '2024-02-10' },
      { id: 't8', title: 'Analytics dashboard', assigneeId: 'e9', priority: 'Low', status: 'Todo', dueDate: '2024-02-28' },
    ]
  },
  {
    id: 'p3',
    name: 'Sales Pipeline Optimization',
    description: 'Streamline and automate the sales pipeline process',
    color: '#10b981',
    createdAt: '2024-01-20',
    tasks: [
      { id: 't9', title: 'CRM data cleanup', assigneeId: 'e4', priority: 'High', status: 'Done', dueDate: '2024-01-30' },
      { id: 't10', title: 'Automation setup', assigneeId: 'e10', priority: 'Critical', status: 'In Progress', dueDate: '2024-02-25' },
      { id: 't11', title: 'Team training materials', assigneeId: 'e10', priority: 'Medium', status: 'Review', dueDate: '2024-03-05' },
    ]
  },
  {
    id: 'p4',
    name: 'Infrastructure Migration',
    description: 'Migrate all services to cloud-native architecture',
    color: '#f59e0b',
    createdAt: '2024-02-01',
    tasks: [
      { id: 't12', title: 'Audit current infrastructure', assigneeId: 'e8', priority: 'Critical', status: 'Done', dueDate: '2024-02-10' },
      { id: 't13', title: 'Set up Kubernetes clusters', assigneeId: 'e8', priority: 'High', status: 'In Progress', dueDate: '2024-03-01' },
      { id: 't14', title: 'Database migration scripts', assigneeId: 'e2', priority: 'High', status: 'Todo', dueDate: '2024-03-10' },
      { id: 't15', title: 'Load testing', assigneeId: 'e1', priority: 'Medium', status: 'Todo', dueDate: '2024-03-20' },
      { id: 't16', title: 'Documentation update', assigneeId: 'e15', priority: 'Low', status: 'Todo', dueDate: '2024-03-25' },
    ]
  },
  {
    id: 'p5',
    name: 'Annual HR Review',
    description: 'Conduct annual performance reviews and update HR policies',
    color: '#8b5cf6',
    createdAt: '2024-02-05',
    tasks: [
      { id: 't17', title: 'Performance review forms', assigneeId: 'e6', priority: 'High', status: 'Done', dueDate: '2024-02-15' },
      { id: 't18', title: 'Manager feedback sessions', assigneeId: 'e6', priority: 'High', status: 'In Progress', dueDate: '2024-02-28' },
      { id: 't19', title: 'Compensation analysis', assigneeId: 'e13', priority: 'Critical', status: 'Review', dueDate: '2024-03-05' },
      { id: 't20', title: 'Policy documentation', assigneeId: 'e14', priority: 'Medium', status: 'Todo', dueDate: '2024-03-15' },
    ]
  },
];

export const hiringTrends = [
  { month: 'Mar', hires: 2, departures: 1 },
  { month: 'Apr', hires: 3, departures: 0 },
  { month: 'May', hires: 1, departures: 2 },
  { month: 'Jun', hires: 4, departures: 1 },
  { month: 'Jul', hires: 2, departures: 0 },
  { month: 'Aug', hires: 3, departures: 1 },
  { month: 'Sep', hires: 5, departures: 2 },
  { month: 'Oct', hires: 2, departures: 1 },
  { month: 'Nov', hires: 3, departures: 0 },
  { month: 'Dec', hires: 1, departures: 1 },
  { month: 'Jan', hires: 4, departures: 2 },
  { month: 'Feb', hires: 3, departures: 1 },
];
