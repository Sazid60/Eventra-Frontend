import { BarChart3, Calendar, DollarSign } from 'lucide-react';
import React from 'react';

const HostFeatures = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">

                <div className="rounded-xl shadow-lg p-6 hover:shadow-xl border transition-transform duration-300 hover:scale-101">
                    <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
                        <Calendar className="w-6 h-6 text-[#45aaa2]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                        Event Management
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-md">
                        Create, Schedule, edit, and manage multiple events efficiently from one dashboard
                    </p>
                </div>

                <div className="rounded-xl shadow-lg p-6 hover:shadow-xl border transition-transform duration-300 hover:scale-101">
                    <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
                        <DollarSign className="w-6 h-6 text-[#45aaa2]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                        Track Earnings
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-md">
                        Monitor your event earnings, payouts, and financial reports in one place
                    </p>
                </div>

                <div className="rounded-xl shadow-lg p-6 hover:shadow-xl border transition-transform duration-300 hover:scale-101">
                    <div className="w-12 h-12 bg-[#45aaa2]/10 rounded-lg flex items-center justify-center mb-4">
                        <BarChart3 className="w-6 h-6 text-[#45aaa2]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                        Optimized Analytics
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-md">
                        Access real-time analytics on event performance, ratings, and attendee insights
                    </p>
                </div>
            </div>
        </div>

    );
};

export default HostFeatures;