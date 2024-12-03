"use client";

import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/components/ui/use-toast";
import { Election } from "./types";

const formSchema = z.object({
  id: z.number(),
  electionType: z.enum([
    "Presidential Election",
    "Parliamentary Election",
    "Local Election",
    "Referendum",
  ]),
  startDate: z.date(),
  endDate: z.date(),
});

interface EditElectionDialogProps {
  election: Election;
  isOpen: boolean;
  onClose: () => void;
}

export function EditElectionDialog({
  election,
  isOpen,
  onClose,
}: EditElectionDialogProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: election.id,
      electionType: election.electionType as z.infer<
        typeof formSchema
      >["electionType"],
      startDate: new Date(election.startDate),
      endDate: new Date(election.endDate),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call to update election
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update the election in the cache
    queryClient.setQueryData<Election[]>(["elections"], (old) =>
      old?.map((e) =>
        e.id === values.id
          ? {
              ...e,
              ...values,
              startDate: values.startDate.toISOString(),
              endDate: values.endDate.toISOString(),
            }
          : e
      )
    );

    toast({
      title: "Election updated",
      description: "The election has been successfully updated.",
    });

    // Invalidate and refetch the elections query
    await queryClient.invalidateQueries({ queryKey: ["elections"] });

    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Election</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="electionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Election Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select election type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Presidential Election">
                        Presidential Election
                      </SelectItem>
                      <SelectItem value="Parliamentary Election">
                        Parliamentary Election
                      </SelectItem>
                      <SelectItem value="Local Election">
                        Local Election
                      </SelectItem>
                      <SelectItem value="Referendum">Referendum</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <DatePicker
                      date={field.value}
                      setDate={(date) => field.onChange(date)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <DatePicker
                      date={field.value}
                      setDate={(date) => field.onChange(date)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Update Election</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
