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
import { Election } from "./types";

const formSchema = z.object({
  nationalNumber: z.string().length(10, "National number must be 10 digits"),
});

interface EditNationalNumberDialogProps {
  election: Election;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, nationalNumber: string) => void;
}

export const EditNationalNumberDialog: React.FC<
  EditNationalNumberDialogProps
> = ({ election, isOpen, onClose, onSave }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nationalNumber: election.nationalNumber,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(election.id, values.nationalNumber);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit National Number</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <p>
              Election Date: {new Date(election.startDate).toLocaleDateString()}{" "}
              - {new Date(election.endDate).toLocaleDateString()}
            </p>
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
