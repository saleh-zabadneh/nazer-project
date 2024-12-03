import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Election } from "./types";

interface ElectionCardProps {
  election: Election;
  onEdit: (election: Election) => void;
}

export const ElectionCard: React.FC<ElectionCardProps> = ({
  election,
  onEdit,
}) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{election.electionType}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Start Date: {new Date(election.startDate).toLocaleDateString()}</p>
        <p>End Date: {new Date(election.endDate).toLocaleDateString()}</p>
        <p>Status: {election.ended ? "Ended" : "Ongoing"}</p>
        <p>National Number: {election.nationalNumber}</p>
        <Button className="mt-4" onClick={() => onEdit(election)}>
          Edit National Number
        </Button>
      </CardContent>
    </Card>
  );
};
