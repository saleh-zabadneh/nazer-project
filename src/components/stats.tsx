import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Define the structure for each stat item
export interface StatItem {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  change?: number;
  link?: string;
}

// Props for the Stat component
interface StatProps {
  stat: StatItem;
  className?: string;
}

// Helper function to render the change indicator
const ChangeIndicator: React.FC<{ change: number }> = ({ change }) => {
  if (change > 0) {
    return <ArrowUpIcon className="w-4 h-4 text-green-500" />;
  } else if (change < 0) {
    return <ArrowDownIcon className="w-4 h-4 text-red-500" />;
  }
  return <MinusIcon className="w-4 h-4 text-gray-500" />;
};

// Individual Stat component
export const Stat: React.FC<StatProps> = ({ stat, className }) => {
  const content = (
    <>
      <CardHeader
        className={cn(
          "flex flex-row items-center justify-between pb-2 space-y-0",
          className
        )}
      >
        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
        {stat.icon}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            {/* 2xl */}
            <div className="text-xl font-bold">{stat.value}</div>
            {stat.description && (
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            )}
            {stat.change !== undefined && (
              <div className="flex items-center space-x-2 text-sm">
                <ChangeIndicator change={stat.change} />
                <span
                  className={
                    stat.change > 0
                      ? "text-green-500"
                      : stat.change < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {Math.abs(stat.change)}%
                </span>
              </div>
            )}
          </div>
          {stat.link && (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </CardContent>
    </>
  );

  return (
    <Card
      className={
        stat.link ? "cursor-pointer hover:shadow-md transition-shadow" : ""
      }
    >
      {stat.link ? (
        <Link to={stat.link} className="block h-full">
          {content}
        </Link>
      ) : (
        content
      )}
    </Card>
  );
};
