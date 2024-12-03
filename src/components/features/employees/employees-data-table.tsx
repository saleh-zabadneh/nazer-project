"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ReusableDataTable } from "@/components/data-table/reusable-data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Employee } from "./types";
import { fetchEmployees, deleteEmployee } from "./api";
import { EditEmployeeDialog } from "./edit-employee-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export function EmployeesDataTable() {
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        title: "Employee deleted",
        description: "The employee has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the employee.",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<Employee>[] = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ID" />
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "nationalNumber",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="National Number" />
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Role" />
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const employee = row.original;
          return (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingEmployee(employee)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(employee.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          );
        },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Actions" />
        ),
      },
    ],
    []
  );

  return (
    <>
      <ReusableDataTable
        columns={columns}
        queryKey={["employees"]}
        fetchData={fetchEmployees}
        searchableColumns={[
          { id: "name", title: "Name" },
          { id: "nationalNumber", title: "National Number" },
          { id: "email", title: "Email" },
        ]}
        filterableColumns={[
          {
            id: "role",
            title: "Role",
            options: [
              { label: "Admin", value: "Admin" },
              { label: "Manager", value: "Manager" },
              { label: "Staff", value: "Staff" },
            ],
          },
        ]}
        defaultSort={{ id: "id", desc: false }}
        enableRowSelection
        enableColumnVisibility
        enablePagination
        enableExport
      />
      {editingEmployee && (
        <EditEmployeeDialog
          employee={editingEmployee}
          isOpen={!!editingEmployee}
          onClose={() => setEditingEmployee(null)}
        />
      )}
    </>
  );
}
