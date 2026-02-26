# HR & Workspace Hub

A modern, executive-ready HR management and workspace collaboration platform built with Next.js 14.

## Features

- **HR Analytics Dashboard** — KPI cards, hiring trends chart, department headcount bar chart, performance distribution pie chart
- **Employee Directory** — Searchable/filterable table with 15 mock employees, performance scores, status badges
- **Project Workspaces** — Workspace cards with progress tracking, task lists, create new workspace modal
- **Report Builder** — Drag-and-drop report section builder
- **Settings** — Light/dark/system theme toggle and profile settings
- **Export** — One-click Excel export (xlsx) and PowerPoint export (pptxgenjs)

## Tech Stack

- **Next.js 14** with TypeScript, App Router, `src/` directory
- **Tailwind CSS** with CSS variables for theming
- **shadcn-style UI components** (Radix UI primitives)
- **Recharts** for interactive charts
- **next-themes** for dark/light mode
- **@dnd-kit** for drag-and-drop
- **lucide-react** for icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

You can start editing the dashboard by modifying `src/app/page.tsx`.

## Pages

| Route | Description |
|-------|-------------|
| `/` | HR Analytics Dashboard |
| `/employees` | Employee Directory |
| `/workspaces` | Project Workspaces |
| `/report-builder` | Report Builder |
| `/settings` | Settings |

## Build

```bash
npm run build
```
