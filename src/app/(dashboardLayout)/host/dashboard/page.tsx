
import { StatCard } from "@/components/modules/Analytics/StatCard";
import HostFeatures from "@/components/modules/Home/HostFeatures";
import { getAnalytics } from "@/services/analytics/analytics.service";
import { HostAnalyticsData } from "@/types/meta.interface";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Wallet,
  Star,
  Award,
  MessageSquare,
} from "lucide-react";

const HostDashboardPage = async () => {
  const response = await getAnalytics();
  const analytics = response.data as HostAnalyticsData;

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Welcome, {analytics.hostName}!</h1>
        <p className="text-xs text-muted-foreground">Your hosting dashboard</p>
      </div>

      <div className="grid gap-3 grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3">
        <StatCard
          title="Rating"
          value={`${analytics.hostRating.toFixed(1)} ⭐`}
          icon={Star}
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
        />
        <StatCard
          title="Rating Count"
          value={analytics.hostRatingCount}
          icon={MessageSquare}
          description="Total reviews"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Your Income"
          value={`৳${analytics.hostIncome.toLocaleString()}`}
          icon={Wallet}
          color="bg-gradient-to-br from-teal-500 to-teal-600"
        />
        <StatCard
          title="Upcoming Events"
          value={analytics.totalEvents}
          icon={Calendar}
          color="bg-gradient-to-br from-indigo-500 to-indigo-600"
        />
        <StatCard
          title="Completed"
          value={analytics.totalCompletedEvents}
          icon={CheckCircle2}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Pending"
          value={analytics.totalPendingEvents}
          icon={Clock}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
        <StatCard
          title="Rejected"
          value={analytics.totalRejectedEvents}
          icon={XCircle}
          color="bg-gradient-to-br from-red-500 to-red-600"
        />
        <StatCard
          title="Total Revenue"
          value={`৳${analytics.totalPaymentsIncome.toLocaleString()}`}
          icon={DollarSign}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Success Rate"
          value={
            analytics.totalEvents > 0
              ? `${((analytics.totalCompletedEvents / analytics.totalEvents) * 100).toFixed(1)}%`
              : "0%"
          }
          icon={Award}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      <div>
        <div className="text-center mb-12 mt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#45aaa2] mb-4">
            Host Features
          </h1>
          <p className="text-md md:text-lg max-w-2xl mx-auto">
            Tools and insights for event hosts to manage, analyze, and grow their events on the platform.
          </p>
        </div>
        <HostFeatures />
      </div>
    </div>
  );
};

export default HostDashboardPage;