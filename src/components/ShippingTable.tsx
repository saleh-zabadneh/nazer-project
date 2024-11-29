"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Save, Plus, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";

const initialColumns = [
  "الرقم",
  "نوع البضاعة",
  "الكمية",
  "الوحدة",
  "الوزن القائم",
  "الوزن الصافي",
  "السعر الافرادي",
  "عدد الطرود",
  "نوعها",
  "ملاحظات",
];

const initialRows = Array(10).fill({});

export default function ShippingTable() {
  const [columns, setColumns] = useState(initialColumns);
  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues: { items: initialRows },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [newColumnName, setNewColumnName] = useState("");
  const inputRefs = useRef<{ [key: string]: HTMLInputElement }>({});
  const tableRef = useRef<HTMLTableElement>(null);

  const addRow = useCallback(() => {
    append({});
  }, [append]);

  const addColumn = useCallback(() => {
    if (newColumnName && !columns.includes(newColumnName)) {
      setColumns([...columns, newColumnName]);
      fields.forEach((_, index) => {
        setValue(`items.${index}.${newColumnName}`, "");
      });
      setNewColumnName("");
    }
  }, [columns, fields, newColumnName, setValue]);

  const removeColumn = useCallback(
    (columnToRemove: string) => {
      setColumns(columns.filter((col) => col !== columnToRemove));
      fields.forEach((_, index) => {
        const { [columnToRemove]: removed, ...rest } =
          control._formValues.items[index];
        setValue(`items.${index}`, rest);
      });
    },
    [columns, fields, control._formValues.items, setValue]
  );

  useEffect(() => {
    if (focusedField) {
      inputRefs.current[focusedField]?.focus();
    }
  }, [focusedField]);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [fields]);

  const onSubmit = (data: any) => {
    console.log(data);
    toast({ title: "Success", description: "Data saved successfully." });
  };

  const handleKeyDown = useCallback(
    (
      e: React.KeyboardEvent<HTMLInputElement>,
      rowIndex: number,
      colIndex: number
    ) => {
      if (e.key === "Enter" || e.key === "ArrowRight") {
        e.preventDefault();
        const nextField = `items.${rowIndex}.${columns[colIndex + 1]}`;
        if (colIndex < columns.length - 1) {
          setFocusedField(nextField);
        } else if (rowIndex === fields.length - 1) {
          addRow();
          setFocusedField(`items.${rowIndex + 1}.${columns[0]}`);
        } else {
          setFocusedField(`items.${rowIndex + 1}.${columns[0]}`);
        }
      } else if (e.key === "ArrowLeft" && colIndex > 0) {
        e.preventDefault();
        setFocusedField(`items.${rowIndex}.${columns[colIndex - 1]}`);
      } else if (e.key === "ArrowUp" && rowIndex > 0) {
        e.preventDefault();
        setFocusedField(`items.${rowIndex - 1}.${columns[colIndex]}`);
      } else if (e.key === "ArrowDown" && rowIndex < fields.length - 1) {
        e.preventDefault();
        setFocusedField(`items.${rowIndex + 1}.${columns[colIndex]}`);
      }
    },
    [fields.length, addRow, columns]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex space-x-2 mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Column
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Column</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogClose asChild>
              <Button type="button" onClick={addColumn}>
                Add Column
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Delete Column</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {columns.map((column) => (
              <DropdownMenuItem
                key={column}
                onSelect={() => removeColumn(column)}
              >
                {column}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border border-border overflow-hidden">
        <ScrollArea className="h-[calc(100vh-310px)]">
          <div className="w-[250px] sm:w-[1200px] min-w-full">
            <Table ref={tableRef} className="border-collapse">
              <TableHeader>
                <TableRow className="bg-muted">
                  {columns.map((column) => (
                    <TableHead
                      key={column}
                      className="px-2 py-1 text-center font-bold text-primary border-r last:border-r-0 border-border"
                    >
                      {column}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, rowIndex) => (
                  <TableRow
                    key={field.id}
                    className={
                      rowIndex % 2 === 0 ? "bg-background" : "bg-muted/50"
                    }
                  >
                    {columns.map((column, colIndex) => (
                      <TableCell
                        key={`${field.id}-${column}`}
                        className="p-0 border-r last:border-r-0 border-border"
                      >
                        <Input
                          {...register(`items.${rowIndex}.${column}`)}
                          className="border-0 focus:ring-0 text-center h-8 rounded-none bg-transparent"
                          onKeyDown={(e) =>
                            handleKeyDown(e, rowIndex, colIndex)
                          }
                          ref={(el) => {
                            inputRefs.current[`items.${rowIndex}.${column}`] =
                              el as HTMLInputElement;
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      {/* <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div> */}
    </form>
  );
}
