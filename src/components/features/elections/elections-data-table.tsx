"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ReusableDataTable } from "@/components/data-table/reusable-data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { faker } from "@faker-js/faker";
import { EditElectionDialog } from "./edit-election-dialog";
import { Election } from "./types";
import { Link } from "react-router-dom";

export const generateFakeElections = (count: number): Election[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    electionType: faker.helpers.arrayElement([
      "Presidential Election",
      "Parliamentary Election",
      "Local Election",
      "Referendum",
    ]),
    startDate: faker.date.past().toISOString(),
    endDate: faker.date.future().toISOString(),
    ended: faker.datatype.boolean(),
    nationalNumber: faker.string.numeric(10),
  }));
};

export const fetchElections = async (): Promise<Election[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return generateFakeElections(10);
};

export const updateElectionNationalNumber = async (
  id: number,
  nationalNumber: string
): Promise<Election> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  const election = generateFakeElections(1)[0];
  return { ...election, id, nationalNumber };
};

export function ElectionsDataTable() {
  const [editingElection, setEditingElection] = useState<Election | null>(null);

  const columns: ColumnDef<Election>[] = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ID" />
        ),
      },
      {
        accessorKey: "electionType",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Election Type" />
        ),
      },
      {
        accessorKey: "startDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Start Date" />
        ),
        cell: ({ row }) => {
          const date = new Date(row.getValue("startDate"));
          return date.toLocaleDateString();
        },
      },
      {
        accessorKey: "endDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="End Date" />
        ),
        cell: ({ row }) => {
          const date = new Date(row.getValue("endDate"));
          return date.toLocaleDateString();
        },
      },
      {
        accessorKey: "ended",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Ended" />
        ),
        cell: ({ row }) => {
          const ended = row.getValue("ended") as boolean;
          return (
            <Badge variant={ended ? "destructive" : "default"}>
              {ended ? "Yes" : "No"}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const election = row.original;
          return (
            <div className="flex space-x-2">
              {election.ended ? (
                <Link to={`/elections/${election.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Result
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingElection(election)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
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
        queryKey={["elections"]}
        fetchData={fetchElections}
        searchableColumns={[
          { id: "id", title: "ID" },
          { id: "electionType", title: "Election Type" },
        ]}
        filterableColumns={[
          {
            id: "ended",
            title: "Ended",
            options: [
              { label: "Yes", value: "true" },
              { label: "No", value: "false" },
            ],
          },
          {
            id: "electionType",
            title: "Election Type",
            options: [
              {
                label: "Presidential Election",
                value: "Presidential Election",
              },
              {
                label: "Parliamentary Election",
                value: "Parliamentary Election",
              },
              { label: "Local Election", value: "Local Election" },
              { label: "Referendum", value: "Referendum" },
            ],
          },
        ]}
        defaultSort={{ id: "id", desc: false }}
        enableRowSelection
        enableColumnVisibility
        enablePagination
        enableExport
      />
      {editingElection && (
        <EditElectionDialog
          election={editingElection}
          isOpen={!!editingElection}
          onClose={() => setEditingElection(null)}
        />
      )}
    </>
  );
}
