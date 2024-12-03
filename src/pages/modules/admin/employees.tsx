import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EmployeesDataTable } from "@/components/features/employees/employees-data-table";

export default function EmployeesPage() {
  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Link to="/employees/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </Link>
      </div>
      <EmployeesDataTable />
    </div>
  );
}
