import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Election } from "@/components/features/elections/types";
import { ElectionCard } from "@/components/features/elections/election-card";
import { EditNationalNumberDialog } from "@/components/features/elections/edit-national-number";
import {
  fetchElections,
  updateElectionNationalNumber,
} from "@/components/features/elections/elections-data-table";

const ElectionDetailsPage: React.FC = () => {
  const [selectedElection, setSelectedElection] = useState<Election | null>(
    null
  );
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: elections,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["elections"],
    queryFn: fetchElections,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      nationalNumber,
    }: {
      id: number;
      nationalNumber: string;
    }) => updateElectionNationalNumber(id, nationalNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elections"] });
      toast({
        title: "National number updated",
        description: "The national number has been successfully updated.",
      });
    },
  });

  const handleEdit = (election: Election) => {
    setSelectedElection(election);
  };

  const handleSave = (id: number, nationalNumber: string) => {
    updateMutation.mutate({ id, nationalNumber });
    setSelectedElection(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Election Details</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {elections?.map((election) => (
          <ElectionCard
            key={election.id}
            election={election}
            onEdit={handleEdit}
          />
        ))}
      </div>
      {selectedElection && (
        <EditNationalNumberDialog
          election={selectedElection}
          isOpen={!!selectedElection}
          onClose={() => setSelectedElection(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
export default ElectionDetailsPage;
