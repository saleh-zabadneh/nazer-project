import React from 'react';
import { DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

// Extend the jsPDF type to include autoTable
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

interface DataTableExportProps<TData> {
  table: Table<TData>;
}

export function DataTableExport<TData>({ table }: DataTableExportProps<TData>) {
  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    const headers = table
      .getAllColumns()
      .filter((column) => column.getIsVisible())
      .map((column) => column.id);

    const data = table.getRowModel().rows.map((row) =>
      headers.reduce(
        (acc, header) => {
          acc[header] = row.getValue(header);
          return acc;
        },
        {} as Record<string, any>
      )
    );

    switch (format) {
      case 'csv':
        exportCSV(data, headers);
        break;
      case 'excel':
        exportExcel(data, headers);
        break;
      case 'pdf':
        exportPDF(data, headers);
        break;
    }
  };

  const exportCSV = (data: Record<string, any>[], headers: string[]) => {
    const csv = [
      headers.join(','),
      ...data.map((row) =>
        headers.map((header) => JSON.stringify(row[header])).join(',')
      ),
    ].join('\n');

    downloadFile(csv, 'table-data.csv', 'text/csv');
  };

  const exportExcel = (data: Record<string, any>[], headers: string[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'table-data.xlsx');
  };

  const exportPDF = (data: Record<string, any>[], headers: string[]) => {
    const doc = new jsPDF() as jsPDFWithAutoTable;
    doc.autoTable({
      head: [headers],
      body: data.map((row) => headers.map((header) => row[header])),
    });
    doc.save('table-data.pdf');
  };

  const downloadFile = (
    content: string,
    fileName: string,
    mimeType: string
  ) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 ml-auto">
          <DownloadIcon className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('excel')}>
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
