import { ElectionsDataTable } from "@/components/features/elections/elections-data-table";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function ElectionsPage() {
  return (
    <div className="container p-4 mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Elections</h1>
        <Link to="/elections/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Election
          </Button>
        </Link>
      </div>
      <ElectionsDataTable />
    </div>
  );
}

export default ElectionsPage;
