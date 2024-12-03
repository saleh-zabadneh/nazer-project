"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Employee } from "./types";
import { updateEmployee } from "./api";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  nationalNumber: z.string().length(10, "National number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Admin", "Manager", "Staff"]),
});

interface EditEmployeeDialogProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
}

export function EditEmployeeDialog({
  employee,
  isOpen,
  onClose,
}: EditEmployeeDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: employee.name,
      nationalNumber: employee.nationalNumber,
      email: employee.email,
      role: employee.role as "Admin" | "Manager" | "Staff",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateEmployee({ ...employee, ...values });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        title: "Employee updated",
        description: "The employee has been successfully updated.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the employee.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationalNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full p-2 border rounded">
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update Employee</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
