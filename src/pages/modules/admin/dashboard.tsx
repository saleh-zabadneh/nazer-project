import { useQuery } from "@tanstack/react-query";
import { Users, Vote } from "lucide-react";
import { Candidate } from "@/lib/fake-data";
import { Stat, StatItem } from "@/components/stats";
import { PresidentialElectionsChart } from "@/components/features/admin-dashboard/presidential-elections-chart";
import {
  fetchCandidates,
  fetchTotalUsers,
  fetchTotalVotes,
} from "@/lib/dashboard";

function DashboardPage() {
  const { data: totalUsers } = useQuery({
    queryKey: ["totalUsers"],
    queryFn: fetchTotalUsers,
  });

  const { data: totalVotes } = useQuery({
    queryKey: ["totalVotes"],
    queryFn: fetchTotalVotes,
  });

  const { data: candidates } = useQuery({
    queryKey: ["candidates"],
    queryFn: fetchCandidates,
  });

  const usersStat: StatItem = {
    title: "Total Users",
    value: totalUsers?.toLocaleString() ?? "...",
    icon: <Users className="w-4 h-4 text-blue-500" />,
    change: 5.25,
  };

  const votesStat: StatItem = {
    title: "Total Votes",
    value: totalVotes?.toLocaleString() ?? "...",
    icon: <Vote className="w-4 h-4 text-green-500" />,
    change: 2.5,
  };

  return (
    <div className="container p-4 mx-auto space-y-8">
      <h1 className="px-4 text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
        <Stat stat={usersStat} />
        <Stat stat={votesStat} />
      </div>
      <div className="p-4 rounded-lg bg-card">
        <h2 className="mb-4 text-2xl font-semibold">Presidential Elections</h2>
        {candidates && candidates.length > 0 && (
          <PresidentialElectionsChart data={candidates} />
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
