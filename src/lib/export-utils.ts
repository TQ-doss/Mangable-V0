import ExcelJS from 'exceljs';
import type PptxGenJSType from 'pptxgenjs';
import { employees } from './mock-data';

export async function exportEmployeesToExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Employees');

  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 22 },
    { header: 'Email', key: 'email', width: 28 },
    { header: 'Department', key: 'department', width: 18 },
    { header: 'Role', key: 'role', width: 24 },
    { header: 'Salary', key: 'salary', width: 14 },
    { header: 'Performance Score', key: 'performance', width: 20 },
    { header: 'Status', key: 'status', width: 12 },
    { header: 'Join Date', key: 'joinDate', width: 14 },
  ];

  // Style header row
  worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  worksheet.getRow(1).fill = {
    type: 'pattern', pattern: 'solid',
    fgColor: { argb: 'FF6366F1' },
  };

  employees.forEach(emp => {
    worksheet.addRow({
      id: emp.id,
      name: emp.name,
      email: emp.email,
      department: emp.department,
      role: emp.role,
      salary: emp.salary,
      performance: emp.performance,
      status: emp.status,
      joinDate: emp.joinDate,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'employees-export.xlsx';
  a.click();
  URL.revokeObjectURL(url);
}

export async function exportDashboardToPowerPoint() {
  const PptxGenJS = (await import('pptxgenjs')).default;
  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_WIDE';
  pptx.title = 'HR Dashboard Report';

  // Slide 1: Title
  const slide1 = pptx.addSlide();
  slide1.background = { color: '1e1b4b' };
  slide1.addText('HR & Workforce Analytics', {
    x: 1, y: 2, w: 10, h: 1.5,
    fontSize: 40, bold: true, color: 'ffffff', align: 'center',
  });
  slide1.addText(`Generated on ${new Date().toLocaleDateString()}`, {
    x: 1, y: 3.8, w: 10, h: 0.5,
    fontSize: 16, color: 'a5b4fc', align: 'center',
  });

  // Slide 2: KPI Overview
  const slide2 = pptx.addSlide();
  slide2.background = { color: 'f8fafc' };
  slide2.addText('Key Performance Indicators', {
    x: 0.5, y: 0.3, w: 12, h: 0.6,
    fontSize: 24, bold: true, color: '1e293b',
  });

  const kpis = [
    { label: 'Total Employees', value: '15', color: '6366f1' },
    { label: 'Active Projects', value: '5', color: '10b981' },
    { label: 'Open Positions', value: '3', color: 'f59e0b' },
    { label: 'Avg Performance', value: '4.3/5', color: 'ec4899' },
  ];

  kpis.forEach((kpi, i) => {
    const x = 0.3 + i * 3.2;
    slide2.addShape('rect', {
      x, y: 1.2, w: 2.9, h: 1.8,
      fill: { color: kpi.color },
      line: { color: kpi.color },
    });
    slide2.addText(kpi.value, {
      x, y: 1.4, w: 2.9, h: 0.9,
      fontSize: 32, bold: true, color: 'ffffff', align: 'center',
    });
    slide2.addText(kpi.label, {
      x, y: 2.4, w: 2.9, h: 0.4,
      fontSize: 12, color: 'ffffff', align: 'center',
    });
  });

  // Slide 3: Department Headcount
  const slide3 = pptx.addSlide();
  slide3.background = { color: 'f8fafc' };
  slide3.addText('Headcount by Department', {
    x: 0.5, y: 0.3, w: 12, h: 0.6,
    fontSize: 24, bold: true, color: '1e293b',
  });

  const deptData = [
    { name: 'Engineering', count: 5 },
    { name: 'Marketing', count: 2 },
    { name: 'Sales', count: 2 },
    { name: 'Design', count: 2 },
    { name: 'Finance', count: 2 },
    { name: 'HR', count: 2 },
  ];

  slide3.addChart('bar', [{
    name: 'Headcount',
    labels: deptData.map(d => d.name),
    values: deptData.map(d => d.count),
  }], {
    x: 1, y: 1.2, w: 11, h: 4.5,
    barDir: 'col',
    chartColors: ['6366f1'],
    showValue: true,
    valAxisMaxVal: 8,
  });

  // Slide 4: Employee List
  const slide4 = pptx.addSlide();
  slide4.background = { color: 'f8fafc' };
  slide4.addText('Employee Directory', {
    x: 0.5, y: 0.3, w: 12, h: 0.6,
    fontSize: 24, bold: true, color: '1e293b',
  });

  const tableData: PptxGenJSType.TableRow[] = [
    [{ text: 'Name', options: { bold: true, color: 'ffffff', fill: { color: '6366f1' } } },
     { text: 'Department', options: { bold: true, color: 'ffffff', fill: { color: '6366f1' } } },
     { text: 'Role', options: { bold: true, color: 'ffffff', fill: { color: '6366f1' } } },
     { text: 'Performance', options: { bold: true, color: 'ffffff', fill: { color: '6366f1' } } }],
    ...employees.slice(0, 10).map(e => [
      { text: e.name },
      { text: e.department },
      { text: e.role },
      { text: e.performance.toString() },
    ]),
  ];

  slide4.addTable(tableData, {
    x: 0.5, y: 1.1, w: 12.3, h: 4.8,
    fontSize: 11,
    border: { pt: 1, color: 'e2e8f0' },
    align: 'left',
  });

  pptx.writeFile({ fileName: 'hr-dashboard-report.pptx' });
}
