import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: string;
}

export const StatCard = ({
    title,
    value,
    icon: Icon,
    description,
    trend,
    color = "bg-gradient-to-br from-gray-50 to-gray-100",
}: StatCardProps) => {
    return (
        <Card className={`hover:shadow-lg transition-all hover:scale-101 ${color} border-none`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3">
                <CardTitle className="text-sm lg:text-md font-medium text-white/90">{title}</CardTitle>
                <Icon className="h-5 w-5 text-white/80" />
            </CardHeader>
            <CardContent className="pb-3">
                <div className="text-xl font-bold text-white">{value}</div>
                {description && (
                    <p className="text-[10px] text-white/70 mt-0.5">{description}</p>
                )}
                {trend && (
                    <p
                        className={`text-[10px] mt-0.5 text-white/80`}
                    >
                        {trend.isPositive ? "+" : ""}
                        {trend.value}%
                    </p>
                )}
            </CardContent>
        </Card>
    );
};
